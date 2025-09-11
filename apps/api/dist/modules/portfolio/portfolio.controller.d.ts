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
        data: any;
        pagination: {
            page: number;
            limit: number;
            total: any;
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
        count: any;
        startups: any;
    }[]>;
    getStatistics(): Promise<{
        total: any;
        byStage: any;
        byStatus: any;
        recentActivity: any;
        topPerformers: any;
    }>;
    getActivityLog(startupId?: string): Promise<any>;
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
    saveComparison(name: string, startupIds: string[], metrics: string[], req: any): Promise<any>;
    getSavedComparisons(req: any): Promise<any>;
}
