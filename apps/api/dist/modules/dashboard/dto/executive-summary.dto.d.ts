export declare class ExecutiveSummaryDto {
    metrics: {
        startups: {
            total: number;
            active: number;
            weeklyGrowth: number;
        };
        revenue: {
            current: number;
            mrr: number;
            growth: number;
        };
        burnRate: {
            current: number;
            runway: number;
            trend: string;
        };
        team: {
            total: number;
            utilization: number;
        };
    };
    alerts: Array<{
        id: string;
        type: string;
        title: string;
        message: string;
        timestamp: Date;
    }>;
    recentActivity: Array<{
        id: string;
        type: string;
        description: string;
        timestamp: Date;
        user: string;
    }>;
    topPerformers: Array<{
        id: string;
        name: string;
        metric: string;
        value: number;
        change: number;
    }>;
}
