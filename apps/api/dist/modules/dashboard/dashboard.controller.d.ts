import { DashboardService } from './dashboard.service';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getExecutiveSummary(filters?: DashboardFilterDto): Promise<import("./dto/executive-summary.dto").ExecutiveSummaryDto>;
    getMetrics(filters: DashboardFilterDto): Promise<any>;
    getAlerts(): Promise<any[]>;
    createAlert(alertData: any): Promise<any>;
    dismissAlert(id: string): Promise<any>;
    calculateMetrics(): Promise<{
        message: string;
    }>;
}
