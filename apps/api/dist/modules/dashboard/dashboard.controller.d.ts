import { DashboardService } from './dashboard.service';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getExecutiveSummary(filters?: DashboardFilterDto): Promise<import("./dto/executive-summary.dto").ExecutiveSummaryDto>;
    getMetrics(filters: DashboardFilterDto): any;
    getAlerts(): Promise<import("./schemas/alert.schema").AlertDocument[]>;
    createAlert(alertData: any): Promise<import("./schemas/alert.schema").AlertDocument>;
    dismissAlert(id: string): any;
    calculateMetrics(): Promise<{
        message: string;
    }>;
}
