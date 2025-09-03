import { Document, Types } from 'mongoose';
interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}
export type DashboardMetricsDocument = DashboardMetrics & Document & Timestamps & {
    _id: Types.ObjectId;
};
export declare class DashboardMetrics {
    date: Date;
    startups: {
        total: number;
        active: number;
        paused: number;
        archived: number;
        byStage: {
            idea: number;
            validation: number;
            pmf: number;
            growth: number;
            scale: number;
        };
    };
    financials: {
        totalRevenue: number;
        totalCosts: number;
        netIncome: number;
        burnRate: number;
        runway: number;
        mrr: number;
        arr: number;
    };
    team: {
        totalMembers: number;
        activeMembers: number;
        utilizationRate: number;
        availableCapacity: number;
    };
    users: {
        totalUsers: number;
        activeUsers: number;
        averageNPS: number;
        churnRate: number;
    };
    okrs: {
        totalObjectives: number;
        completedObjectives: number;
        averageProgress: number;
        onTrack: number;
        atRisk: number;
        behind: number;
    };
}
export declare const DashboardMetricsSchema: import("mongoose").Schema<DashboardMetrics, import("mongoose").Model<DashboardMetrics, any, any, any, Document<unknown, any, DashboardMetrics, any, {}> & DashboardMetrics & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DashboardMetrics, Document<unknown, {}, import("mongoose").FlatRecord<DashboardMetrics>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DashboardMetrics> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
