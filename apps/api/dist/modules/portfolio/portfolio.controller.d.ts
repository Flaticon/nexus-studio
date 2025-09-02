import { PortfolioService } from './portfolio.service';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    create(createStartupDto: CreateStartupDto): Promise<import("./schemas/startup.schema").Startup>;
    findAll(filters: any): Promise<import("./schemas/startup.schema").Startup[]>;
    findOne(id: string): Promise<import("./schemas/startup.schema").Startup>;
    update(id: string, updateStartupDto: UpdateStartupDto): Promise<import("./schemas/startup.schema").Startup>;
    updateKPIs(id: string, kpis: any[]): Promise<import("./schemas/startup.schema").Startup>;
    remove(id: string): Promise<void>;
}
