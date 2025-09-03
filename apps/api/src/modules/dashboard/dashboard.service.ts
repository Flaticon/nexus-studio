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
  AlertType,        // ✅ AÑADIR ESTA IMPORTACIÓN
  AlertCategory     // ✅ AÑADIR ESTA IMPORTACIÓN
} from './schemas/alert.schema';
import { Startup, StartupDocument } from '../portfolio/schemas/startup.schema';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
import { ExecutiveSummaryDto } from './dto/executive-summary.dto';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    @InjectModel(DashboardMetrics.name)
    private metricsModel: Model<DashboardMetricsDocument>,
    @InjectModel(Alert.name)
    private alertModel: Model<AlertDocument>,  // ✅ Usar AlertDocument
    @InjectModel(Startup.name)
    private startupModel: Model<StartupDocument>,
  ) {}

  // ... resto del código igual hasta getActiveAlerts ...

  // ✅ CORREGIR: Cambiar el tipo de retorno a AlertDocument[]
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

  // ✅ CORREGIR: Cambiar el tipo de retorno a AlertDocument
  async createAlert(alertData: Partial<Alert>): Promise<AlertDocument> {
    const alert = new this.alertModel(alertData);
    return alert.save();
  }

  // ... resto del código hasta getExecutiveSummary ...

  async getExecutiveSummary(filters?: DashboardFilterDto): Promise<ExecutiveSummaryDto> {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get current metrics
    const currentMetrics = await this.getCurrentMetrics();
    const previousMetrics = await this.getMetricsForDate(lastWeek);
    
    // Get active alerts - ✅ ahora alerts será de tipo AlertDocument[]
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
      // ✅ CORREGIR: Ahora alert tiene _id y createdAt porque es AlertDocument
      alerts: alerts.map(alert => ({
        id: alert._id.toString(),
        type: alert.type,
        title: alert.title,
        message: alert.message,
        timestamp: alert.createdAt as Date  // Cast porque createdAt viene de timestamps
      })),
      recentActivity,
      topPerformers
    };
  }

  // ... resto del código hasta getTopPerformers ...

  // ✅ CORREGIR: Asegurar que el tipo de retorno sea correcto
  private async getTopPerformers() {
    const startups = await this.startupModel
      .find({ status: 'active' })
      .sort({ 'kpis.0.current': -1 })
      .limit(5)
      .exec();

    return startups.map((startup: StartupDocument) => ({  // ✅ Tipar startup
      id: startup._id.toString(),
      name: startup.name,
      metric: startup.kpis[0]?.name || 'Revenue',
      value: startup.kpis[0]?.current || 0,
      change: this.calculateGrowth(
        startup.kpis[0]?.current || 0,
        startup.kpis[0]?.target || 0
      )
    }));
  }

  // ... resto del código igual hasta checkForAlerts ...

  // ✅ Los AlertType y AlertCategory ahora están importados correctamente
  private async checkForAlerts(metrics: any) {
    // Check burn rate
    if (metrics.financials.runway < 6) {
      await this.createAlert({
        title: 'Low Runway Alert',
        message: `Current runway is only ${metrics.financials.runway} months`,
        type: AlertType.CRITICAL,      // ✅ Ahora funciona
        category: AlertCategory.FINANCIAL  // ✅ Ahora funciona
      });
    }

    // Check team utilization
    if (metrics.team.utilizationRate > 90) {
      await this.createAlert({
        title: 'High Team Utilization',
        message: `Team utilization is at ${metrics.team.utilizationRate}%`,
        type: AlertType.WARNING,        // ✅ Ahora funciona
        category: AlertCategory.TEAM    // ✅ Ahora funciona
      });
    }

    // Check OKR progress
    if (metrics.okrs.behind > 5) {
      await this.createAlert({
        title: 'OKRs Behind Schedule',
        message: `${metrics.okrs.behind} objectives are behind schedule`,
        type: AlertType.WARNING,            // ✅ Ahora funciona
        category: AlertCategory.PERFORMANCE // ✅ Ahora funciona
      });
    }
  }
}