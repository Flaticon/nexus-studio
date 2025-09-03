import { Model } from 'mongoose';
import { DashboardMetricsDocument } from './schemas/dashboard-metrics.schema';
import { Alert, AlertDocument } from './schemas/alert.schema';
import { StartupDocument } from '../portfolio/schemas/startup.schema';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
import { ExecutiveSummaryDto } from './dto/executive-summary.dto';
export declare class DashboardService {
    private metricsModel;
    private alertModel;
    private startupModel;
    private readonly logger;
    constructor(metricsModel: Model<DashboardMetricsDocument>, alertModel: Model<AlertDocument>, startupModel: Model<StartupDocument>);
    getActiveAlerts(): Promise<AlertDocument[]>;
    createAlert(alertData: Partial<Alert>): Promise<AlertDocument>;
    getExecutiveSummary(filters?: DashboardFilterDto): Promise<ExecutiveSummaryDto>;
    private getTopPerformers;
    private checkForAlerts;
}
