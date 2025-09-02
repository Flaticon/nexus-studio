declare enum StartupStage {
    IDEA = "idea",
    VALIDATION = "validation",
    PMF = "pmf",
    GROWTH = "growth",
    SCALE = "scale"
}
declare class ResourcesDto {
    deck?: string;
    demo?: string;
    repository?: string;
}
export declare class CreateStartupDto {
    name: string;
    slug: string;
    stage: StartupStage;
    squadLead: string;
    squadMembers: string[];
    resources?: ResourcesDto;
}
export {};
