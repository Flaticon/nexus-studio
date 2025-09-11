import { Model } from 'mongoose';
import { Startup, StartupDocument, StartupStage } from './schemas/startup.schema';
import { ComparisonDocument } from './schemas/comparison.schema';
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
        data: any;
        pagination: {
            page: number;
            limit: number;
            total: any;
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
        count: any;
        startups: any;
    }[]>;
    compareStartups(startupIds: string[]): Promise<{
        startups: any;
        metrics: {
            metric: string;
            values: {
                startupId: any;
                startupName: any;
                value: any;
                unit: any;
            }[];
        }[];
        timeline: {
            startupId: any;
            startupName: any;
            timeline: any;
        }[];
        team: any;
    }>;
    saveComparison(name: string, startupIds: string[], metrics: string[], userId: string): Promise<any>;
    getSavedComparisons(userId?: string): Promise<any>;
    getActivityLog(startupId?: string, limit?: number): Promise<any>;
    getStatistics(): Promise<{
        total: any;
        byStage: any;
        byStatus: any;
        recentActivity: any;
        topPerformers: any;
    }>;
    private getCountByStage;
    private getCountByStatus;
    private getTopPerformers;
    private aggregateMetricsForComparison;
    private aggregateTimelineForComparison;
    remove(id: string): Promise<void>;
}
