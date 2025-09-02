import { Model } from 'mongoose';
import { Startup, StartupDocument } from './schemas/startup.schema';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
export declare class PortfolioService {
    private startupModel;
    constructor(startupModel: Model<StartupDocument>);
    create(createStartupDto: CreateStartupDto): Promise<Startup>;
    findAll(filters?: any): Promise<Startup[]>;
    findOne(id: string): Promise<Startup>;
    update(id: string, updateStartupDto: UpdateStartupDto): Promise<Startup>;
    updateKPIs(id: string, kpis: any[]): Promise<Startup>;
    remove(id: string): Promise<void>;
}
