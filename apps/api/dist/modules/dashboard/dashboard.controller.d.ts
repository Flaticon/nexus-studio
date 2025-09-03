import { DashboardService } from './dashboard.service';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getExecutiveSummary(filters?: DashboardFilterDto): Promise<import("./dto/executive-summary.dto").ExecutiveSummaryDto>;
    getMetrics(filters: DashboardFilterDto): Promise<import("./schemas/dashboard-metrics.schema").DashboardMetricsDocument | null>;
    getAlerts(): Promise<import("./schemas/alert.schema").AlertDocument[]>;
    createAlert(alertData: any): Promise<import("./schemas/alert.schema").AlertDocument>;
    dismissAlert(id: string): Promise<import("./schemas/alert.schema").AlertDocument | null>;
    calculateMetrics(): Promise<{
        message: string;
    }>;
}
