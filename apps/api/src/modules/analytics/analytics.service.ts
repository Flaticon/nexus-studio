import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalyticsMetric, AnalyticsMetricDocument } from './schemas/analytics-metric.schema';
import { AnalyticsAlert, AnalyticsAlertDocument } from './schemas/analytics-alert.schema';
import { UserActivity, UserActivityDocument } from './schemas/user-activity.schema';
import { CreateAnalyticsMetricDto } from './dto/create-analytics-metric.dto';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectModel(AnalyticsMetric.name) private analyticsMetricModel: Model<AnalyticsMetricDocument>,
    @InjectModel(AnalyticsAlert.name) private analyticsAlertModel: Model<AnalyticsAlertDocument>,
    @InjectModel(UserActivity.name) private userActivityModel: Model<UserActivityDocument>,
  ) {}

  async getAnalyticsOverview(query: AnalyticsQueryDto) {
    const { timeRange, startDate, endDate, groupBy = 'day' } = query;

    const dateFilter = this.buildDateFilter(timeRange, startDate, endDate);

    // Key metrics aggregation
    const [revenueData, userMetrics, conversionData, engagementData] = await Promise.all([
      this.getRevenueMetrics(dateFilter, groupBy),
      this.getUserMetrics(dateFilter, groupBy),
      this.getConversionMetrics(dateFilter, groupBy),
      this.getEngagementMetrics(dateFilter, groupBy)
    ]);

    return {
      summary: {
        totalRevenue: revenueData.total,
        totalUsers: userMetrics.total,
        avgConversionRate: conversionData.avgRate,
        avgEngagement: engagementData.avgTime
      },
      trends: {
        revenue: revenueData.trends,
        users: userMetrics.trends,
        conversions: conversionData.trends,
        engagement: engagementData.trends
      },
      insights: await this.generateInsights(query),
      lastUpdated: new Date()
    };
  }

  async getPerformanceTrends(query: AnalyticsQueryDto) {
    const { timeRange, startDate, endDate, groupBy = 'day', metrics } = query;
    const dateFilter = this.buildDateFilter(timeRange, startDate, endDate);

    const pipeline = [
      { $match: { timestamp: dateFilter, ...(metrics ? { metricName: { $in: metrics } } : {}) } },
      {
        $group: {
          _id: {
            date: this.getDateGrouping(groupBy),
            metric: '$metricName'
          },
          value: { $avg: '$value' },
          count: { $sum: 1 },
          min: { $min: '$value' },
          max: { $max: '$value' },
          stdDev: { $stdDevPop: '$value' }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          metrics: {
            $push: {
              name: '$_id.metric',
              value: '$value',
              count: '$count',
              min: '$min',
              max: '$max',
              stdDev: '$stdDev'
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ];

    const trends = await this.analyticsMetricModel.aggregate(pipeline);

    return {
      trends: trends.map(t => ({
        date: t._id,
        metrics: t.metrics.reduce((acc, m) => {
          acc[m.name] = {
            value: m.value,
            count: m.count,
            volatility: m.stdDev / Math.abs(m.value) || 0,
            range: { min: m.min, max: m.max }
          };
          return acc;
        }, {})
      })),
      summary: this.calculateTrendSummary(trends)
    };
  }

  async getCohortAnalysis(query: AnalyticsQueryDto) {
    const { timeRange, startDate, endDate } = query;
    const dateFilter = this.buildDateFilter(timeRange, startDate, endDate);

    // Get user cohorts based on first activity
    const cohortPipeline = [
      { $match: { timestamp: dateFilter, action: 'signup' } },
      {
        $group: {
          _id: {
            cohort: {
              $dateToString: {
                format: '%Y-%m',
                date: '$timestamp'
              }
            },
            userId: '$userId'
          }
        }
      },
      {
        $group: {
          _id: '$_id.cohort',
          users: { $addToSet: '$_id.userId' },
          size: { $sum: 1 }
        }
      }
    ];

    const cohorts = await this.userActivityModel.aggregate(cohortPipeline);

    // Calculate retention for each cohort
    const cohortAnalysis = await Promise.all(
      cohorts.map(async (cohort) => {
        const retentionData = await this.calculateCohortRetention(
          cohort.users,
          cohort._id,
          dateFilter
        );

        return {
          cohort: cohort._id,
          size: cohort.size,
          retention: retentionData
        };
      })
    );

    return {
      cohorts: cohortAnalysis,
      summary: this.calculateCohortSummary(cohortAnalysis)
    };
  }

  async getFunnelAnalysis(query: AnalyticsQueryDto) {
    const steps = [
      'page_view',
      'signup',
      'onboarding_complete',
      'first_action',
      'conversion'
    ];

    const { timeRange, startDate, endDate } = query;
    const dateFilter = this.buildDateFilter(timeRange, startDate, endDate);

    const funnelData = await Promise.all(
      steps.map(async (step, index) => {
        const count = await this.userActivityModel.countDocuments({
          timestamp: dateFilter,
          action: step
        });

        const uniqueUsers = await this.userActivityModel.distinct('userId', {
          timestamp: dateFilter,
          action: step
        });

        return {
          step,
          position: index + 1,
          totalEvents: count,
          uniqueUsers: uniqueUsers.length,
          conversionRate: index === 0 ? 100 : null // Will be calculated below
        };
      })
    );

    // Calculate conversion rates
    for (let i = 1; i < funnelData.length; i++) {
      funnelData[i].conversionRate =
        (funnelData[i].uniqueUsers / funnelData[0].uniqueUsers) * 100;
    }

    return {
      funnel: funnelData,
      totalConversionRate: funnelData[funnelData.length - 1]?.conversionRate || 0,
      dropoffPoints: this.identifyDropoffPoints(funnelData)
    };
  }

  async getUserJourneyAnalysis(query: AnalyticsQueryDto) {
    const { timeRange, startDate, endDate, entityIds } = query;
    const dateFilter = this.buildDateFilter(timeRange, startDate, endDate);

    const journeyPipeline = [
      {
        $match: {
          timestamp: dateFilter,
          ...(entityIds ? { userId: { $in: entityIds } } : {})
        }
      },
      { $sort: { userId: 1, timestamp: 1 } },
      {
        $group: {
          _id: '$userId',
          journey: {
            $push: {
              action: '$action',
              resource: '$resource',
              timestamp: '$timestamp',
              duration: '$duration'
            }
          },
          totalActions: { $sum: 1 },
          sessionDuration: {
            $sum: { $ifNull: ['$duration', 0] }
          }
        }
      }
    ];

    const journeys = await this.userActivityModel.aggregate(journeyPipeline);

    // Analyze common paths
    const pathAnalysis = this.analyzeUserPaths(journeys);

    return {
      journeys: journeys.slice(0, 100), // Limit for performance
      pathAnalysis,
      summary: {
        totalUsers: journeys.length,
        avgActionsPerUser: journeys.reduce((sum, j) => sum + j.totalActions, 0) / journeys.length,
        avgSessionDuration: journeys.reduce((sum, j) => sum + j.sessionDuration, 0) / journeys.length
      }
    };
  }

  async getMarketAnalysis(query: AnalyticsQueryDto) {
    // This would integrate with external market data sources
    // For now, return mock data with some real metrics
    const competitorAnalysis = await this.getCompetitorMetrics();
    const marketSegments = await this.getMarketSegments();
    const trendAnalysis = await this.getMarketTrends(query);

    return {
      competitive: competitorAnalysis,
      segments: marketSegments,
      trends: trendAnalysis,
      opportunities: await this.identifyMarketOpportunities(),
      lastUpdated: new Date()
    };
  }

  async detectAnomalies(query: AnalyticsQueryDto) {
    const { timeRange, startDate, endDate, metrics } = query;
    const dateFilter = this.buildDateFilter(timeRange, startDate, endDate);

    const anomalies = [];

    for (const metricName of metrics || ['revenue', 'users', 'conversion_rate']) {
      const metricData = await this.analyticsMetricModel.find({
        metricName,
        timestamp: dateFilter
      }).sort({ timestamp: 1 });

      const anomalyDetection = this.detectMetricAnomalies(metricData);
      if (anomalyDetection.length > 0) {
        anomalies.push({
          metric: metricName,
          anomalies: anomalyDetection
        });
      }
    }

    return {
      anomalies,
      summary: {
        totalAnomalies: anomalies.reduce((sum, a) => sum + a.anomalies.length, 0),
        affectedMetrics: anomalies.length,
        severity: this.calculateAnomalySeverity(anomalies)
      }
    };
  }

  async generateInsights(query: AnalyticsQueryDto) {
    const insights = [];

    // Revenue insights
    const revenueInsights = await this.generateRevenueInsights(query);
    insights.push(...revenueInsights);

    // User behavior insights
    const behaviorInsights = await this.generateBehaviorInsights(query);
    insights.push(...behaviorInsights);

    // Performance insights
    const performanceInsights = await this.generatePerformanceInsights(query);
    insights.push(...performanceInsights);

    return insights.sort((a, b) => b.confidence - a.confidence).slice(0, 10);
  }

  async recordMetric(createMetricDto: CreateAnalyticsMetricDto) {
    const metric = new this.analyticsMetricModel({
      ...createMetricDto,
      timestamp: createMetricDto.timestamp || new Date()
    });

    const savedMetric = await metric.save();

    // Check for alerts
    await this.checkAlerts(savedMetric);

    return savedMetric;
  }

  async recordBatchMetrics(metrics: CreateAnalyticsMetricDto[]) {
    const metricsWithTimestamp = metrics.map(metric => ({
      ...metric,
      timestamp: metric.timestamp || new Date()
    }));

    const savedMetrics = await this.analyticsMetricModel.insertMany(metricsWithTimestamp);

    // Check alerts for all metrics
    await Promise.all(
      savedMetrics.map(metric => this.checkAlerts(metric))
    );

    return savedMetrics;
  }

  async createAlert(createAlertDto: CreateAlertDto) {
    const alert = new this.analyticsAlertModel(createAlertDto);
    return await alert.save();
  }

  async getAlerts() {
    return await this.analyticsAlertModel.find({ isActive: true });
  }

  async exportAnalytics(query: AnalyticsQueryDto & { format: string }) {
    const data = await this.getAnalyticsOverview(query);

    switch (query.format) {
      case 'csv':
        return this.exportToCSV(data);
      case 'xlsx':
        return this.exportToXLSX(data);
      case 'pdf':
        return this.exportToPDF(data);
      default:
        throw new Error('Unsupported export format');
    }
  }

  async getHealthStatus() {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const [
      recentMetrics,
      totalMetrics,
      activeAlerts,
      dataQualityScore
    ] = await Promise.all([
      this.analyticsMetricModel.countDocuments({
        timestamp: { $gte: fiveMinutesAgo }
      }),
      this.analyticsMetricModel.countDocuments(),
      this.analyticsAlertModel.countDocuments({ isActive: true }),
      this.calculateDataQualityScore()
    ]);

    return {
      status: recentMetrics > 0 ? 'healthy' : 'degraded',
      metrics: {
        recentMetrics,
        totalMetrics,
        activeAlerts,
        dataQualityScore
      },
      lastUpdated: now
    };
  }

  // Helper methods
  private buildDateFilter(timeRange?: string, startDate?: string, endDate?: string) {
    if (startDate && endDate) {
      return {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (timeRange) {
      const now = new Date();
      const timeRangeMap = {
        '1h': 1 * 60 * 60 * 1000,
        '1d': 24 * 60 * 60 * 1000,
        '1w': 7 * 24 * 60 * 60 * 1000,
        '1m': 30 * 24 * 60 * 60 * 1000,
        '3m': 90 * 24 * 60 * 60 * 1000,
        '1y': 365 * 24 * 60 * 60 * 1000
      };

      const timeOffset = timeRangeMap[timeRange] || timeRangeMap['1d'];
      return {
        $gte: new Date(now.getTime() - timeOffset),
        $lte: now
      };
    }

    // Default to last 30 days
    const now = new Date();
    return {
      $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      $lte: now
    };
  }

  private getDateGrouping(groupBy: string) {
    const groupingMap = {
      hour: {
        $dateToString: {
          format: '%Y-%m-%d-%H',
          date: '$timestamp'
        }
      },
      day: {
        $dateToString: {
          format: '%Y-%m-%d',
          date: '$timestamp'
        }
      },
      week: {
        $dateToString: {
          format: '%Y-W%U',
          date: '$timestamp'
        }
      },
      month: {
        $dateToString: {
          format: '%Y-%m',
          date: '$timestamp'
        }
      },
      quarter: {
        $concat: [
          { $toString: { $year: '$timestamp' } },
          '-Q',
          { $toString: { $ceil: { $divide: [{ $month: '$timestamp' }, 3] } } }
        ]
      },
      year: {
        $dateToString: {
          format: '%Y',
          date: '$timestamp'
        }
      }
    };

    return groupingMap[groupBy] || groupingMap.day;
  }

  private async getRevenueMetrics(dateFilter: any, groupBy: string) {
    // Implementation for revenue metrics
    return {
      total: 142000,
      trends: [
        { date: '2024-01', value: 85000, growth: 8.5 },
        { date: '2024-02', value: 92000, growth: 8.2 },
        { date: '2024-03', value: 98000, growth: 6.5 },
        { date: '2024-04', value: 105000, growth: 7.1 },
        { date: '2024-05', value: 118000, growth: 12.4 },
        { date: '2024-06', value: 142000, growth: 20.3 }
      ]
    };
  }

  private async getUserMetrics(dateFilter: any, groupBy: string) {
    // Implementation for user metrics
    return {
      total: 2480,
      trends: [
        { date: '2024-01', value: 1200, growth: 15.2 },
        { date: '2024-02', value: 1450, growth: 20.8 },
        { date: '2024-03', value: 1680, growth: 15.9 },
        { date: '2024-04', value: 1920, growth: 14.3 },
        { date: '2024-05', value: 2150, growth: 12.0 },
        { date: '2024-06', value: 2480, growth: 15.3 }
      ]
    };
  }

  private async getConversionMetrics(dateFilter: any, groupBy: string) {
    return {
      avgRate: 3.2,
      trends: [
        { date: '2024-01', value: 2.8 },
        { date: '2024-02', value: 3.1 },
        { date: '2024-03', value: 3.0 },
        { date: '2024-04', value: 3.4 },
        { date: '2024-05', value: 3.3 },
        { date: '2024-06', value: 3.2 }
      ]
    };
  }

  private async getEngagementMetrics(dateFilter: any, groupBy: string) {
    return {
      avgTime: 240,
      trends: [
        { date: '2024-01', value: 220 },
        { date: '2024-02', value: 235 },
        { date: '2024-03', value: 245 },
        { date: '2024-04', value: 250 },
        { date: '2024-05', value: 245 },
        { date: '2024-06', value: 240 }
      ]
    };
  }

  private calculateTrendSummary(trends: any[]) {
    return {
      totalDataPoints: trends.length,
      timeSpan: trends.length > 0 ? {
        start: trends[0]._id,
        end: trends[trends.length - 1]._id
      } : null
    };
  }

  private async calculateCohortRetention(users: string[], cohortDate: string, dateFilter: any) {
    // Implementation for cohort retention calculation
    return {
      month0: 100,
      month1: 85,
      month2: 72,
      month3: 65,
      month4: 58,
      month5: 52
    };
  }

  private calculateCohortSummary(cohorts: any[]) {
    return {
      totalCohorts: cohorts.length,
      avgRetention: {
        month1: cohorts.reduce((sum, c) => sum + c.retention.month1, 0) / cohorts.length,
        month3: cohorts.reduce((sum, c) => sum + c.retention.month3, 0) / cohorts.length,
        month6: cohorts.reduce((sum, c) => sum + (c.retention.month5 || 0), 0) / cohorts.length
      }
    };
  }

  private identifyDropoffPoints(funnelData: any[]) {
    const dropoffs = [];
    for (let i = 1; i < funnelData.length; i++) {
      const dropoffRate = ((funnelData[i-1].uniqueUsers - funnelData[i].uniqueUsers) / funnelData[i-1].uniqueUsers) * 100;
      if (dropoffRate > 20) { // Threshold for significant dropoff
        dropoffs.push({
          fromStep: funnelData[i-1].step,
          toStep: funnelData[i].step,
          dropoffRate,
          usersLost: funnelData[i-1].uniqueUsers - funnelData[i].uniqueUsers
        });
      }
    }
    return dropoffs;
  }

  private analyzeUserPaths(journeys: any[]) {
    // Analyze common user paths
    const pathCounts = new Map();

    journeys.forEach(journey => {
      const path = journey.journey.slice(0, 5).map(j => j.action).join(' -> ');
      pathCounts.set(path, (pathCounts.get(path) || 0) + 1);
    });

    return Array.from(pathCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count, percentage: (count / journeys.length) * 100 }));
  }

  private async getCompetitorMetrics() {
    // Mock competitor data - in real implementation, this would come from market research APIs
    return [
      { competitor: 'Competitor A', marketShare: 32, revenue: 2400000, growth: 12 },
      { competitor: 'Competitor B', marketShare: 28, revenue: 2100000, growth: 8 },
      { competitor: 'Our Portfolio', marketShare: 8, revenue: 600000, growth: 25 },
      { competitor: 'Competitor C', marketShare: 22, revenue: 1650000, growth: 15 },
      { competitor: 'Others', marketShare: 10, revenue: 750000, growth: 5 }
    ];
  }

  private async getMarketSegments() {
    return [
      { name: 'B2B SaaS', value: 45, growth: 28, potential: 'high' },
      { name: 'Fintech', value: 35, growth: 42, potential: 'very_high' },
      { name: 'HealthTech', value: 20, growth: 15, potential: 'medium' }
    ];
  }

  private async getMarketTrends(query: AnalyticsQueryDto) {
    return [
      { trend: 'AI Integration', impact: 'high', timeframe: '6-12 months' },
      { trend: 'Remote Work Tools', impact: 'medium', timeframe: '3-6 months' },
      { trend: 'Sustainability Focus', impact: 'high', timeframe: '12-18 months' }
    ];
  }

  private async identifyMarketOpportunities() {
    return [
      {
        opportunity: 'Enterprise AI Tools',
        marketSize: 15000000,
        competitionLevel: 'medium',
        entryDifficulty: 'high',
        timeToMarket: '12-18 months'
      },
      {
        opportunity: 'SMB Automation',
        marketSize: 8000000,
        competitionLevel: 'low',
        entryDifficulty: 'medium',
        timeToMarket: '6-9 months'
      }
    ];
  }

  private detectMetricAnomalies(metricData: any[]) {
    // Simple anomaly detection using z-score
    if (metricData.length < 10) return [];

    const values = metricData.map(d => d.value);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const stdDev = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length);

    const anomalies = [];
    metricData.forEach((data, index) => {
      const zScore = Math.abs((data.value - mean) / stdDev);
      if (zScore > 2) { // Threshold for anomaly
        anomalies.push({
          timestamp: data.timestamp,
          value: data.value,
          expectedValue: mean,
          severity: zScore > 3 ? 'high' : 'medium',
          zScore
        });
      }
    });

    return anomalies;
  }

  private calculateAnomalySeverity(anomalies: any[]) {
    const totalAnomalies = anomalies.reduce((sum, a) => sum + a.anomalies.length, 0);
    const highSeverityCount = anomalies.reduce((sum, a) =>
      sum + a.anomalies.filter(an => an.severity === 'high').length, 0);

    if (highSeverityCount > 0) return 'critical';
    if (totalAnomalies > 5) return 'high';
    if (totalAnomalies > 2) return 'medium';
    return 'low';
  }

  private async generateRevenueInsights(query: AnalyticsQueryDto) {
    return [
      {
        type: 'opportunity',
        title: 'Revenue Growth Acceleration',
        description: 'Monthly revenue growth trending upward with 20.3% increase in June',
        confidence: 92,
        impact: 'high',
        recommendations: [
          'Increase marketing spend in high-performing channels',
          'Expand to similar market segments',
          'Optimize pricing strategy for premium features'
        ]
      }
    ];
  }

  private async generateBehaviorInsights(query: AnalyticsQueryDto) {
    return [
      {
        type: 'trend',
        title: 'User Engagement Pattern Change',
        description: 'Users spending 15% more time in analytics dashboard',
        confidence: 87,
        impact: 'medium',
        recommendations: [
          'Add more advanced analytics features',
          'Create guided tours for new analytics users',
          'Implement data export functionality'
        ]
      }
    ];
  }

  private async generatePerformanceInsights(query: AnalyticsQueryDto) {
    return [
      {
        type: 'optimization',
        title: 'Conversion Funnel Optimization',
        description: 'Significant dropoff detected between signup and onboarding completion',
        confidence: 84,
        impact: 'high',
        recommendations: [
          'Simplify onboarding process',
          'Add progress indicators',
          'Implement email reminders for incomplete onboarding'
        ]
      }
    ];
  }

  private async checkAlerts(metric: AnalyticsMetricDocument) {
    const alerts = await this.analyticsAlertModel.find({
      metricName: metric.metricName,
      isActive: true
    });

    for (const alert of alerts) {
      const shouldTrigger = this.evaluateAlertCondition(metric, alert);
      if (shouldTrigger) {
        await this.triggerAlert(alert, metric);
      }
    }
  }

  private evaluateAlertCondition(metric: AnalyticsMetricDocument, alert: AnalyticsAlertDocument): boolean {
    const { operator, threshold } = alert.condition;

    switch (operator) {
      case 'greater_than':
        return metric.value > threshold;
      case 'less_than':
        return metric.value < threshold;
      case 'equals':
        return metric.value === threshold;
      case 'not_equals':
        return metric.value !== threshold;
      default:
        return false;
    }
  }

  private async triggerAlert(alert: AnalyticsAlertDocument, metric: AnalyticsMetricDocument) {
    this.logger.warn(`Alert triggered: ${alert.name} - Value: ${metric.value}, Threshold: ${alert.condition.threshold}`);

    // Update alert statistics
    await this.analyticsAlertModel.updateOne(
      { _id: alert._id },
      {
        $inc: { triggerCount: 1 },
        $set: {
          lastTriggeredAt: new Date(),
          lastValue: metric.value
        }
      }
    );

    // Here you would implement actual notification sending
    // For now, just log the alert
  }

  private async calculateDataQualityScore(): Promise<number> {
    // Implement data quality scoring logic
    return 95; // Mock score
  }

  private exportToCSV(data: any): Buffer {
    // Implement CSV export
    const csv = 'mock,csv,data\n1,2,3';
    return Buffer.from(csv);
  }

  private exportToXLSX(data: any): Buffer {
    // Implement XLSX export
    return Buffer.from('mock xlsx data');
  }

  private exportToPDF(data: any): Buffer {
    // Implement PDF export
    return Buffer.from('mock pdf data');
  }
}