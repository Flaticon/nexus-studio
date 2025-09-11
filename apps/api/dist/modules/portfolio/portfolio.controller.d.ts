import { PortfolioService } from './portfolio.service';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { PortfolioFilterDto } from './dto/portfolio-filter.dto';
import { AddDocumentDto } from './dto/add-document.dto';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    create(createStartupDto: CreateStartupDto): Promise<import("./schemas/startup.schema").Startup>;
    findAll(filters: PortfolioFilterDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/startup.schema").StartupDocument, {}, {}> & import("./schemas/startup.schema").Startup & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    findOne(id: string): Promise<import("./schemas/startup.schema").Startup>;
    update(id: string, updateStartupDto: UpdateStartupDto): Promise<import("./schemas/startup.schema").Startup>;
    remove(id: string): Promise<void>;
    moveToNextStage(id: string, milestone?: string): Promise<import("./schemas/startup.schema").Startup>;
    addDocument(id: string, documentDto: AddDocumentDto): Promise<import("./schemas/startup.schema").Startup>;
    updateMetrics(id: string, metrics: any[]): Promise<import("./schemas/startup.schema").Startup>;
    addMilestone(id: string, milestone: any): Promise<import("./schemas/startup.schema").Startup>;
    completeMilestone(id: string, index: number): Promise<import("./schemas/startup.schema").Startup>;
    getPipelineView(): Promise<{
        stage: import("./schemas/startup.schema").StartupStage;
        count: number;
        startups: {
            id: any;
            name: string;
            slug: string;
            logo: string | undefined;
            mainKpi: {
                name: string;
                current: number;
                target: number;
                unit: string;
                lastUpdated: Date;
            };
            revenue: number;
        }[];
    }[]>;
    getStatistics(): Promise<{
        total: number;
        byStage: {
            stage: import("./schemas/startup.schema").StartupStage;
            count: number;
        }[];
        byStatus: {
            active: number;
            paused: number;
            archived: number;
        };
        recentActivity: {
            action: string;
            description: string;
            userId: import("mongoose").Types.ObjectId;
            userName: string;
            changes?: Record<string, any>;
            timestamp: Date;
        }[];
        topPerformers: {
            id: unknown;
            name: string;
            revenue: number;
            growth: number;
        }[];
    }>;
    getActivityLog(startupId?: string): Promise<{
        action: string;
        description: string;
        userId: import("mongoose").Types.ObjectId;
        userName: string;
        changes?: Record<string, any>;
        timestamp: Date;
    }[]>;
    compareStartups(startupIds: string[]): Promise<{
        startups: {
            id: unknown;
            name: string;
            stage: import("./schemas/startup.schema").StartupStage;
            status: import("./schemas/startup.schema").StartupStatus;
        }[];
        metrics: {
            metric: string;
            values: {
                startupId: any;
                startupName: string;
                value: number;
                unit: string;
            }[];
        }[];
        timeline: {
            startupId: any;
            startupName: string;
            timeline: {
                stage: string;
                date: Date;
                description?: string;
                milestone?: string;
            }[];
        }[];
        team: {
            id: unknown;
            name: string;
            teamSize: number;
        }[];
    }>;
    saveComparison(name: string, startupIds: string[], metrics: string[], req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/comparison.schema").ComparisonDocument, {}, {}> & import("./schemas/comparison.schema").Comparison & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getSavedComparisons(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/comparison.schema").ComparisonDocument, {}, {}> & import("./schemas/comparison.schema").Comparison & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
