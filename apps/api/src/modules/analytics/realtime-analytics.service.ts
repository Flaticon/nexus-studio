import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserActivity, UserActivityDocument } from './schemas/user-activity.schema';
import { AnalyticsMetric, AnalyticsMetricDocument } from './schemas/analytics-metric.schema';

export interface RealTimeMetric {
  name: string;
  value: number;
  change: number;
  changePercentage: number;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

interface ActiveUser {
  userId: string;
  sessionId: string;
  currentPage: string;
  lastActivity: Date;
  totalTime: number;
  actions: number;
}

@Injectable()
export class RealtimeAnalyticsService {
  private readonly logger = new Logger(RealtimeAnalyticsService.name);
  private metricsCache = new Map<string, any>();
  private readonly CACHE_TTL = 30000; // 30 seconds

  constructor(
    @InjectModel(UserActivity.name) private userActivityModel: Model<UserActivityDocument>,
    @InjectModel(AnalyticsMetric.name) private analyticsMetricModel: Model<AnalyticsMetricDocument>,
  ) {
    // Initialize real-time monitoring
    this.startRealTimeMonitoring();
  }

  async getCurrentMetrics(): Promise<{
    activeUsers: RealTimeMetric;
    revenue: RealTimeMetric;
    conversions: RealTimeMetric;
    pageViews: RealTimeMetric;
    avgSessionDuration: RealTimeMetric;
    errorRate: RealTimeMetric;
    summary: any;
  }> {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const previousHour = new Date(oneHourAgo.getTime() - 60 * 60 * 1000);

    const [
      activeUsersMetric,
      revenueMetric,
      conversionsMetric,
      pageViewsMetric,
      sessionDurationMetric,
      errorRateMetric
    ] = await Promise.all([
      this.getActiveUsersMetric(now, oneHourAgo, previousHour),
      this.getRevenueMetric(now, oneHourAgo, previousHour),
      this.getConversionsMetric(now, oneHourAgo, previousHour),
      this.getPageViewsMetric(now, oneHourAgo, previousHour),
      this.getSessionDurationMetric(now, oneHourAgo, previousHour),
      this.getErrorRateMetric(now, oneHourAgo, previousHour)
    ]);

    const summary = await this.generateRealTimeSummary();

    return {
      activeUsers: activeUsersMetric,
      revenue: revenueMetric,
      conversions: conversionsMetric,
      pageViews: pageViewsMetric,
      avgSessionDuration: sessionDurationMetric,
      errorRate: errorRateMetric,
      summary
    };
  }

  async getActiveUsers(): Promise<ActiveUser[]> {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    const activeUsersPipeline = [
      {
        $match: {
          timestamp: { $gte: thirtyMinutesAgo }
        }
      },
      {
        $group: {
          _id: {
            userId: '$userId',
            sessionId: '$sessionId'
          },
          lastActivity: { $max: '$timestamp' },
          totalTime: { $sum: { $ifNull: ['$duration', 0] } },
          actions: { $sum: 1 },
          pages: { $addToSet: '$resource' },
          currentPage: { $last: '$resource' }
        }
      },
      {
        $match: {
          lastActivity: { $gte: new Date(Date.now() - 10 * 60 * 1000) } // Active in last 10 minutes
        }
      },
      { $sort: { lastActivity: -1 as const } },
      { $limit: 100 }
    ];

    const activeUsers = await this.userActivityModel.aggregate(activeUsersPipeline);

    return activeUsers.map(user => ({
      userId: user._id.userId,
      sessionId: user._id.sessionId,
      currentPage: user.currentPage,
      lastActivity: user.lastActivity,
      totalTime: user.totalTime,
      actions: user.actions
    }));
  }

  async getTopPages(timeWindow: number = 60): Promise<Array<{
    page: string;
    views: number;
    uniqueUsers: number;
    avgDuration: number;
    bounceRate: number;
  }>> {
    const windowStart = new Date(Date.now() - timeWindow * 60 * 1000);

    const topPagesPipeline = [
      {
        $match: {
          timestamp: { $gte: windowStart },
          action: 'page_view'
        }
      },
      {
        $group: {
          _id: '$resource',
          views: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' },
          totalDuration: { $sum: { $ifNull: ['$duration', 0] } },
          sessions: { $addToSet: '$sessionId' }
        }
      },
      {
        $project: {
          page: '$_id',
          views: 1,
          uniqueUsers: { $size: '$uniqueUsers' },
          avgDuration: {
            $cond: {
              if: { $gt: ['$views', 0] },
              then: { $divide: ['$totalDuration', '$views'] },
              else: 0
            }
          },
          sessions: { $size: '$sessions' }
        }
      },
      { $sort: { views: -1 as const } },
      { $limit: 10 }
    ];

    const topPages = await this.userActivityModel.aggregate(topPagesPipeline);

    // Calculate bounce rate (simplified)
    return topPages.map(page => ({
      ...page,
      bounceRate: this.calculateBounceRate(page.views, page.sessions)
    }));
  }

  async getConversionFunnel(timeWindow: number = 60): Promise<Array<{
    step: string;
    users: number;
    conversionRate: number;
    dropoff: number;
  }>> {
    const windowStart = new Date(Date.now() - timeWindow * 60 * 1000);
    const funnelSteps = [
      'page_view',
      'signup',
      'onboarding_start',
      'onboarding_complete',
      'first_action',
      'conversion'
    ];

    const funnelData = await Promise.all(
      funnelSteps.map(async (step, index) => {
        const users = await this.userActivityModel.distinct('userId', {
          timestamp: { $gte: windowStart },
          action: step
        });

        return {
          step,
          users: users.length,
          conversionRate: 0, // Will be calculated below
          dropoff: 0
        };
      })
    );

    // Calculate conversion rates and dropoffs
    const totalUsers = funnelData[0]?.users || 1;
    funnelData.forEach((stepData, index) => {
      stepData.conversionRate = (stepData.users / totalUsers) * 100;
      if (index > 0) {
        const previousUsers = funnelData[index - 1].users;
        stepData.dropoff = previousUsers - stepData.users;
      }
    });

    return funnelData;
  }

  async getErrorAnalytics(timeWindow: number = 60): Promise<{
    totalErrors: number;
    errorRate: number;
    topErrors: Array<{
      error: string;
      count: number;
      affectedUsers: number;
    }>;
    errorTrend: Array<{
      time: string;
      count: number;
    }>;
  }> {
    const windowStart = new Date(Date.now() - timeWindow * 60 * 1000);

    // Get error activities
    const errorsPipeline = [
      {
        $match: {
          timestamp: { $gte: windowStart },
          action: { $regex: /error|fail|exception/i }
        }
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 },
          affectedUsers: { $addToSet: '$userId' }
        }
      },
      {
        $project: {
          error: '$_id',
          count: 1,
          affectedUsers: { $size: '$affectedUsers' }
        }
      },
      { $sort: { count: -1 as const } },
      { $limit: 10 }
    ];

    const [topErrors, totalActivities, totalErrors] = await Promise.all([
      this.userActivityModel.aggregate(errorsPipeline),
      this.userActivityModel.countDocuments({
        timestamp: { $gte: windowStart }
      }),
      this.userActivityModel.countDocuments({
        timestamp: { $gte: windowStart },
        action: { $regex: /error|fail|exception/i }
      })
    ]);

    const errorRate = totalActivities > 0 ? (totalErrors / totalActivities) * 100 : 0;

    // Get error trend (last 10 minutes in 1-minute intervals)
    const errorTrend = await this.getErrorTrend(windowStart);

    return {
      totalErrors,
      errorRate,
      topErrors,
      errorTrend
    };
  }

  async trackUserActivity(activity: {
    userId: string;
    sessionId: string;
    action: string;
    resource: string;
    context?: any;
    data?: any;
    duration?: number;
  }): Promise<void> {
    const userActivity = new this.userActivityModel({
      ...activity,
      timestamp: new Date()
    });

    await userActivity.save();

    // Update real-time cache
    this.updateRealTimeCache(activity);
  }

  async getPerformanceMetrics(): Promise<{
    avgResponseTime: number;
    slowestEndpoints: Array<{
      endpoint: string;
      avgResponseTime: number;
      requestCount: number;
    }>;
    uptimePercentage: number;
  }> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const performancePipeline = [
      {
        $match: {
          timestamp: { $gte: oneHourAgo },
          'performance.responseTime': { $exists: true }
        }
      },
      {
        $group: {
          _id: '$resource',
          avgResponseTime: { $avg: '$performance.responseTime' },
          requestCount: { $sum: 1 },
          maxResponseTime: { $max: '$performance.responseTime' }
        }
      },
      { $sort: { avgResponseTime: -1 as const } },
      { $limit: 10 }
    ];

    const [slowestEndpoints, allRequests] = await Promise.all([
      this.userActivityModel.aggregate(performancePipeline),
      this.userActivityModel.find({
        timestamp: { $gte: oneHourAgo },
        'performance.responseTime': { $exists: true }
      })
    ]);

    const avgResponseTime = allRequests.length > 0
      ? allRequests.reduce((sum, req) => sum + (req.performance?.responseTime || 0), 0) / allRequests.length
      : 0;

    // Calculate uptime (simplified - based on error rate)
    const errorCount = await this.userActivityModel.countDocuments({
      timestamp: { $gte: oneHourAgo },
      action: { $regex: /error|fail|5\d\d/i }
    });

    const totalRequests = allRequests.length;
    const uptimePercentage = totalRequests > 0 ? ((totalRequests - errorCount) / totalRequests) * 100 : 100;

    return {
      avgResponseTime,
      slowestEndpoints,
      uptimePercentage
    };
  }

  private async getActiveUsersMetric(now: Date, oneHourAgo: Date, previousHour: Date): Promise<RealTimeMetric> {
    const [currentActiveUsers, previousActiveUsers] = await Promise.all([
      this.userActivityModel.distinct('userId', {
        timestamp: { $gte: oneHourAgo, $lte: now }
      }),
      this.userActivityModel.distinct('userId', {
        timestamp: { $gte: previousHour, $lte: oneHourAgo }
      })
    ]);

    const current = currentActiveUsers.length;
    const previous = previousActiveUsers.length;
    const change = current - previous;
    const changePercentage = previous > 0 ? (change / previous) * 100 : 0;

    return {
      name: 'Active Users',
      value: current,
      change,
      changePercentage,
      lastUpdated: now,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  }

  private async getRevenueMetric(now: Date, oneHourAgo: Date, previousHour: Date): Promise<RealTimeMetric> {
    const [currentRevenue, previousRevenue] = await Promise.all([
      this.analyticsMetricModel.aggregate([
        {
          $match: {
            metricName: 'revenue',
            timestamp: { $gte: oneHourAgo, $lte: now }
          }
        },
        { $group: { _id: null, total: { $sum: '$value' } } }
      ]),
      this.analyticsMetricModel.aggregate([
        {
          $match: {
            metricName: 'revenue',
            timestamp: { $gte: previousHour, $lte: oneHourAgo }
          }
        },
        { $group: { _id: null, total: { $sum: '$value' } } }
      ])
    ]);

    const current = currentRevenue[0]?.total || 0;
    const previous = previousRevenue[0]?.total || 0;
    const change = current - previous;
    const changePercentage = previous > 0 ? (change / previous) * 100 : 0;

    return {
      name: 'Revenue',
      value: current,
      change,
      changePercentage,
      lastUpdated: now,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  }

  private async getConversionsMetric(now: Date, oneHourAgo: Date, previousHour: Date): Promise<RealTimeMetric> {
    const [currentConversions, previousConversions] = await Promise.all([
      this.userActivityModel.countDocuments({
        timestamp: { $gte: oneHourAgo, $lte: now },
        isConversion: true
      }),
      this.userActivityModel.countDocuments({
        timestamp: { $gte: previousHour, $lte: oneHourAgo },
        isConversion: true
      })
    ]);

    const current = currentConversions;
    const previous = previousConversions;
    const change = current - previous;
    const changePercentage = previous > 0 ? (change / previous) * 100 : 0;

    return {
      name: 'Conversions',
      value: current,
      change,
      changePercentage,
      lastUpdated: now,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  }

  private async getPageViewsMetric(now: Date, oneHourAgo: Date, previousHour: Date): Promise<RealTimeMetric> {
    const [currentPageViews, previousPageViews] = await Promise.all([
      this.userActivityModel.countDocuments({
        timestamp: { $gte: oneHourAgo, $lte: now },
        action: 'page_view'
      }),
      this.userActivityModel.countDocuments({
        timestamp: { $gte: previousHour, $lte: oneHourAgo },
        action: 'page_view'
      })
    ]);

    const current = currentPageViews;
    const previous = previousPageViews;
    const change = current - previous;
    const changePercentage = previous > 0 ? (change / previous) * 100 : 0;

    return {
      name: 'Page Views',
      value: current,
      change,
      changePercentage,
      lastUpdated: now,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  }

  private async getSessionDurationMetric(now: Date, oneHourAgo: Date, previousHour: Date): Promise<RealTimeMetric> {
    const [currentSessions, previousSessions] = await Promise.all([
      this.userActivityModel.aggregate([
        {
          $match: {
            timestamp: { $gte: oneHourAgo, $lte: now },
            duration: { $exists: true }
          }
        },
        { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
      ]),
      this.userActivityModel.aggregate([
        {
          $match: {
            timestamp: { $gte: previousHour, $lte: oneHourAgo },
            duration: { $exists: true }
          }
        },
        { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
      ])
    ]);

    const current = currentSessions[0]?.avgDuration || 0;
    const previous = previousSessions[0]?.avgDuration || 0;
    const change = current - previous;
    const changePercentage = previous > 0 ? (change / previous) * 100 : 0;

    return {
      name: 'Avg Session Duration',
      value: Math.round(current),
      change: Math.round(change),
      changePercentage,
      lastUpdated: now,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  }

  private async getErrorRateMetric(now: Date, oneHourAgo: Date, previousHour: Date): Promise<RealTimeMetric> {
    const [currentData, previousData] = await Promise.all([
      Promise.all([
        this.userActivityModel.countDocuments({
          timestamp: { $gte: oneHourAgo, $lte: now },
          action: { $regex: /error|fail|exception/i }
        }),
        this.userActivityModel.countDocuments({
          timestamp: { $gte: oneHourAgo, $lte: now }
        })
      ]),
      Promise.all([
        this.userActivityModel.countDocuments({
          timestamp: { $gte: previousHour, $lte: oneHourAgo },
          action: { $regex: /error|fail|exception/i }
        }),
        this.userActivityModel.countDocuments({
          timestamp: { $gte: previousHour, $lte: oneHourAgo }
        })
      ])
    ]);

    const currentErrorRate = currentData[1] > 0 ? (currentData[0] / currentData[1]) * 100 : 0;
    const previousErrorRate = previousData[1] > 0 ? (previousData[0] / previousData[1]) * 100 : 0;
    const change = currentErrorRate - previousErrorRate;
    const changePercentage = previousErrorRate > 0 ? (change / previousErrorRate) * 100 : 0;

    return {
      name: 'Error Rate',
      value: Math.round(currentErrorRate * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercentage,
      lastUpdated: now,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  }

  private async generateRealTimeSummary(): Promise<any> {
    const now = new Date();
    const activeUsers = await this.getActiveUsers();
    const topPages = await this.getTopPages(60);
    const conversionFunnel = await this.getConversionFunnel(60);
    const performance = await this.getPerformanceMetrics();

    return {
      totalActiveUsers: activeUsers.length,
      topPage: topPages[0]?.page || 'N/A',
      conversionRate: conversionFunnel[conversionFunnel.length - 1]?.conversionRate || 0,
      avgResponseTime: performance.avgResponseTime,
      systemHealth: performance.uptimePercentage > 95 ? 'excellent' :
                   performance.uptimePercentage > 90 ? 'good' :
                   performance.uptimePercentage > 80 ? 'fair' : 'poor',
      lastUpdated: now
    };
  }

  private async getErrorTrend(windowStart: Date): Promise<Array<{ time: string; count: number }>> {
    const intervals = 10; // 10 minute intervals
    const intervalSize = 60 * 1000; // 1 minute

    const trend: Array<{ time: string; count: number }> = [];
    for (let i = 0; i < intervals; i++) {
      const intervalStart = new Date(windowStart.getTime() + i * intervalSize);
      const intervalEnd = new Date(intervalStart.getTime() + intervalSize);

      const errorCount = await this.userActivityModel.countDocuments({
        timestamp: { $gte: intervalStart, $lt: intervalEnd },
        action: { $regex: /error|fail|exception/i }
      });

      trend.push({
        time: intervalStart.toISOString(),
        count: errorCount
      });
    }

    return trend;
  }

  private calculateBounceRate(views: number, sessions: number): number {
    // Simplified bounce rate calculation
    // In reality, you'd need to track single-page sessions
    return sessions > 0 ? Math.max(0, ((sessions - views) / sessions) * 100) : 0;
  }

  private updateRealTimeCache(activity: any): void {
    const cacheKey = `realtime_${activity.action}`;
    const cached = this.metricsCache.get(cacheKey) || { count: 0, lastUpdate: Date.now() };

    cached.count += 1;
    cached.lastUpdate = Date.now();

    this.metricsCache.set(cacheKey, cached);
  }

  private startRealTimeMonitoring(): void {
    // Clean up cache periodically
    setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.metricsCache.entries()) {
        if (now - value.lastUpdate > this.CACHE_TTL) {
          this.metricsCache.delete(key);
        }
      }
    }, this.CACHE_TTL);

    this.logger.log('Real-time analytics monitoring started');
  }
}