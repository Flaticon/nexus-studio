import { StartupStage, StartupStatus } from '../schemas/startup.schema';
declare class ResourcesDto {
    deck?: string;
    demo?: string;
    repository?: string;
    documentation?: string;
}
declare class KeyDatesDto {
    foundedDate?: string;
    incorporationDate?: string;
    firstRevenue?: string;
    breakEven?: string;
}
export declare class CreateStartupDto {
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    website?: string;
    industry?: string;
    stage: StartupStage;
    status?: StartupStatus;
    squadLead: string;
    squadMembers: string[];
    resources?: ResourcesDto;
    keyDates?: KeyDatesDto;
    tags?: string[];
}
export {};
