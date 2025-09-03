import { Model } from 'mongoose';
import { DashboardMetricsDocument } from './schemas/dashboard-metrics.schema';
import { Alert, AlertDocument } from './schemas/alert.schema';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
import { ExecutiveSummaryDto } from './dto/executive-summary.dto';
export declare class DashboardService {
    private metricsModel;
    private alertModel;
    private readonly logger;
    constructor(metricsModel: Model<DashboardMetricsDocument>, alertModel: Model<AlertDocument>);
    getMetrics(filters?: DashboardFilterDto): Promise<DashboardMetricsDocument | null>;
    dismissAlert(id: string): Promise<AlertDocument | null>;
    calculateDailyMetrics(): Promise<void>;
    private getCurrentMetrics;
    private getMetricsForDate;
    private getRecentActivity;
    private calculateGrowth;
    private calculateTrend;
    private collectMetrics;
    private saveMetrics;
    getActiveAlerts(): Promise<AlertDocument[]>;
    createAlert(alertData: Partial<Alert>): Promise<AlertDocument>;
    getExecutiveSummary(filters?: DashboardFilterDto): Promise<ExecutiveSummaryDto>;
    private getTopPerformers;
    private checkForAlerts;
}
