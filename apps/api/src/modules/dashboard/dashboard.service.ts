// apps/api/src/modules/dashboard/dashboard.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { 
  DashboardMetrics, 
  DashboardMetricsDocument 
} from './schemas/dashboard-metrics.schema';
import { 
  Alert, 
  AlertDocument,
  AlertType,
  AlertCategory
} from './schemas/alert.schema';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
import { ExecutiveSummaryDto } from './dto/executive-summary.dto';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    @InjectModel(DashboardMetrics.name)
    private metricsModel: Model<DashboardMetricsDocument>,
    @InjectModel(Alert.name)
    private alertModel: Model<AlertDocument>,
  ) {}

  // ✅ MÉTODO: Obtener métricas con filtros (llamado desde controller)
  async getMetrics(filters?: DashboardFilterDto): Promise<DashboardMetricsDocument | null> {
    const query: any = {};
    
    if (filters?.startDate && filters?.endDate) {
      query.date = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate)
      };
    }

    return this.metricsModel
      .findOne(query)
      .sort({ date: -1 })
      .exec();
  }

  // ✅ MÉTODO: Descartar alertas (llamado desde controller)
  async dismissAlert(id: string): Promise<AlertDocument | null> {
    return this.alertModel
      .findByIdAndUpdate(
        id,
        { isDismissed: true },
        { new: true }
      )
      .exec();
  }

  // ✅ MÉTODO: Calcular métricas diarias con cron (llamado desde controller)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async calculateDailyMetrics(): Promise<void> {
    this.logger.log('Calculating daily metrics...');
    
    try {
      const metrics = await this.collectMetrics();
      await this.saveMetrics(metrics);
      await this.checkForAlerts(metrics);
      
      this.logger.log('Daily metrics calculated successfully');
    } catch (error) {
      this.logger.error('Error calculating daily metrics:', error);
    }
  }

  // ✅ MÉTODO: Obtener métricas actuales (privado)
  private async getCurrentMetrics(): Promise<DashboardMetricsDocument | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.metricsModel
      .findOne({
        date: { $gte: today }
      })
      .sort({ date: -1 })
      .exec();
  }

  // ✅ MÉTODO: Obtener métricas de una fecha específica (privado)
  private async getMetricsForDate(date: Date): Promise<DashboardMetricsDocument | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.metricsModel
      .findOne({
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      })
      .sort({ date: -1 })
      .exec();
  }

  // ✅ MÉTODO: Obtener actividad reciente (privado)
  private async getRecentActivity(): Promise<any[]> {
    const recentAlerts = await this.alertModel
      .find({
        createdAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // última semana
        }
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    return recentAlerts.map(alert => ({
      id: alert._id.toString(),
      type: 'alert',
      title: alert.title,
      description: alert.message,
      timestamp: alert.createdAt,
      category: alert.category
    }));
  }

  // ✅ MÉTODO: Calcular crecimiento (privado)
  private calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Number(((current - previous) / previous * 100).toFixed(2));
  }

  // ✅ MÉTODO: Calcular tendencia (privado)
  private calculateTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
    const difference = current - previous;
    const threshold = previous * 0.05; // 5% threshold

    if (Math.abs(difference) <= threshold) {
      return 'stable';
    }
    
    return difference > 0 ? 'up' : 'down';
  }

  // ✅ MÉTODO: Recopilar métricas usando datos mock
  private async collectMetrics(): Promise<any> {
    // Datos mock - reemplazar cuando tengas modelos reales
    return {
      date: new Date(),
      startups: {
        total: 25,
        active: 20,
        paused: 3,
        archived: 2,
        byStage: {
          idea: 5,
          validation: 8,
          pmf: 4,
          growth: 6,
          scale: 2
        }
      },
      financials: {
        totalRevenue: 450000,
        totalCosts: 320000,
        netIncome: 130000,
        burnRate: 25000,
        runway: 18,
        mrr: 37500,
        arr: 450000
      },
      team: {
        totalMembers: 85,
        activeMembers: 78,
        utilizationRate: 75,
        availableCapacity: 25
      },
      users: {
        totalUsers: 12500,
        activeUsers: 8900,
        averageNPS: 8.2,
        churnRate: 5.2
      },
      okrs: {
        totalObjectives: 24,
        completedObjectives: 18,
        averageProgress: 78,
        onTrack: 15,
        atRisk: 6,
        behind: 3
      }
    };
  }

  // ✅ MÉTODO: Guardar métricas (privado)
  private async saveMetrics(metrics: any): Promise<DashboardMetricsDocument> {
    const metricsDoc = new this.metricsModel(metrics);
    return metricsDoc.save();
  }

  // ✅ MÉTODO: Obtener alertas activas
  async getActiveAlerts(): Promise<AlertDocument[]> {
    return this.alertModel
      .find({
        isDismissed: false,
        $or: [
          { expiresAt: { $gt: new Date() } },
          { expiresAt: null }
        ]
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();
  }

  // ✅ MÉTODO: Crear alerta
  async createAlert(alertData: Partial<Alert>): Promise<AlertDocument> {
    const alert = new this.alertModel(alertData);
    return alert.save();
  }

  // ✅ MÉTODO: Obtener resumen ejecutivo
  async getExecutiveSummary(filters?: DashboardFilterDto): Promise<ExecutiveSummaryDto> {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get current metrics
    const currentMetrics = await this.getCurrentMetrics();
    const previousMetrics = await this.getMetricsForDate(lastWeek);
    
    // Get active alerts
    const alerts = await this.getActiveAlerts();
    
    // Get recent activity
    const recentActivity = await this.getRecentActivity();
    
    // Get top performers
    const topPerformers = await this.getTopPerformers();

    // Calculate growth rates
    const weeklyGrowth = this.calculateGrowth(
      currentMetrics?.startups?.total || 0,
      previousMetrics?.startups?.total || 0
    );

    const revenueGrowth = this.calculateGrowth(
      currentMetrics?.financials?.totalRevenue || 0,
      previousMetrics?.financials?.totalRevenue || 0
    );

    return {
      metrics: {
        startups: {
          total: currentMetrics?.startups?.total || 0,
          active: currentMetrics?.startups?.active || 0,
          weeklyGrowth
        },
        revenue: {
          current: currentMetrics?.financials?.totalRevenue || 0,
          mrr: currentMetrics?.financials?.mrr || 0,
          growth: revenueGrowth
        },
        burnRate: {
          current: currentMetrics?.financials?.burnRate || 0,
          runway: currentMetrics?.financials?.runway || 0,
          trend: this.calculateTrend(
            currentMetrics?.financials?.burnRate || 0,
            previousMetrics?.financials?.burnRate || 0
          )
        },
        team: {
          total: currentMetrics?.team?.totalMembers || 0,
          utilization: currentMetrics?.team?.utilizationRate || 0
        }
      },
      alerts: alerts.map(alert => ({
        id: alert._id.toString(),
        type: alert.type,
        title: alert.title,
        message: alert.message,
        timestamp: alert.createdAt
      })),
      recentActivity,
      topPerformers
    };
  }

  // ✅ MÉTODO: Obtener mejores performers (datos mock)
  private async getTopPerformers() {
    // Mock data ya que no tienes modelo Startup
    return [
      {
        id: '507f1f77bcf86cd799439011',
        name: 'TechStart Alpha',
        metric: 'Revenue',
        value: 125000,
        change: 15.2
      },
      {
        id: '507f1f77bcf86cd799439012',
        name: 'InnovateCorp',
        metric: 'Users',
        value: 8500,
        change: 22.1
      },
      {
        id: '507f1f77bcf86cd799439013',
        name: 'DataFlow Pro',
        metric: 'MRR',
        value: 18000,
        change: 8.7
      }
    ];
  }

  // ✅ MÉTODO: Verificar alertas (privado)
  private async checkForAlerts(metrics: any) {
    // Check burn rate
    if (metrics.financials.runway < 6) {
      await this.createAlert({
        title: 'Low Runway Alert',
        message: `Current runway is only ${metrics.financials.runway} months`,
        type: AlertType.CRITICAL,
        category: AlertCategory.FINANCIAL
      });
    }

    // Check team utilization
    if (metrics.team.utilizationRate > 90) {
      await this.createAlert({
        title: 'High Team Utilization',
        message: `Team utilization is at ${metrics.team.utilizationRate}%`,
        type: AlertType.WARNING,
        category: AlertCategory.TEAM
      });
    }

    // Check OKR progress
    if (metrics.okrs.behind > 5) {
      await this.createAlert({
        title: 'OKRs Behind Schedule',
        message: `${metrics.okrs.behind} objectives are behind schedule`,
        type: AlertType.WARNING,
        category: AlertCategory.PERFORMANCE
      });
    }
  }
}