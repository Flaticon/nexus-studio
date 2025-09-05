import { Model, Types } from 'mongoose';
import { Startup, StartupDocument, StartupStage } from './schemas/startup.schema';
import { Comparison, ComparisonDocument } from './schemas/comparison.schema';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { PortfolioFilterDto } from './dto/portfolio-filter.dto';
import { AddDocumentDto } from './dto/add-document.dto';
export declare class PortfolioService {
    private startupModel;
    private comparisonModel;
    constructor(startupModel: Model<StartupDocument>, comparisonModel: Model<ComparisonDocument>);
    create(createStartupDto: CreateStartupDto): Promise<Startup>;
    findAll(filters: PortfolioFilterDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, StartupDocument, {}, {}> & Startup & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<Startup>;
    update(id: string, updateStartupDto: UpdateStartupDto): Promise<Startup>;
    moveToNextStage(id: string, milestone?: string): Promise<Startup>;
    addDocument(id: string, documentDto: AddDocumentDto): Promise<Startup>;
    updateMetrics(id: string, metrics: any[]): Promise<Startup>;
    addMilestone(id: string, milestone: any): Promise<Startup>;
    completeMilestone(startupId: string, milestoneIndex: number): Promise<Startup>;
    getPipelineView(): Promise<{
        stage: StartupStage;
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
    compareStartups(startupIds: string[]): Promise<{
        startups: {
            id: unknown;
            name: string;
            stage: StartupStage;
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
    saveComparison(name: string, startupIds: string[], metrics: string[], userId: string): Promise<import("mongoose").Document<unknown, {}, ComparisonDocument, {}, {}> & Comparison & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getSavedComparisons(userId?: string): Promise<(import("mongoose").Document<unknown, {}, ComparisonDocument, {}, {}> & Comparison & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getActivityLog(startupId?: string, limit?: number): Promise<{
        action: string;
        description: string;
        userId: Types.ObjectId;
        userName: string;
        changes?: Record<string, any>;
        timestamp: Date;
    }[]>;
    getStatistics(): Promise<{
        total: number;
        byStage: {
            stage: StartupStage;
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
            userId: Types.ObjectId;
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
    private getCountByStage;
    private getCountByStatus;
    private getTopPerformers;
    private aggregateMetricsForComparison;
    private aggregateTimelineForComparison;
    remove(id: string): Promise<void>;
}
