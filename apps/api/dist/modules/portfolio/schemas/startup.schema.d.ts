import { Document as MongooseDocument, Types } from 'mongoose';
export type StartupDocument = Startup & MongooseDocument;
export declare enum StartupStage {
    IDEA = "idea",
    VALIDATION = "validation",
    PMF = "pmf",
    GROWTH = "growth",
    SCALE = "scale"
}
export declare enum StartupStatus {
    ACTIVE = "active",
    PAUSED = "paused",
    ARCHIVED = "archived"
}
export declare enum DocumentType {
    PITCH_DECK = "pitch_deck",
    BUSINESS_PLAN = "business_plan",
    FINANCIAL_MODEL = "financial_model",
    LEGAL = "legal",
    TECHNICAL = "technical",
    OTHER = "other"
}
declare class Timeline {
    stage: string;
    date: Date;
    description?: string;
    milestone?: string;
}
declare class StartupDocumentSubSchema {
    name: string;
    url: string;
    type: DocumentType;
    description?: string;
    uploadedAt: Date;
    uploadedBy: string;
    size?: number;
    mimeType?: string;
}
declare class Metric {
    name: string;
    value: number;
    unit: string;
    target?: number;
    previousValue?: number;
    recordedAt: Date;
    category?: string;
}
declare class ActivityLog {
    action: string;
    description: string;
    userId: Types.ObjectId;
    userName: string;
    changes?: Record<string, any>;
    timestamp: Date;
}
declare class Milestone {
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
    completedAt?: Date;
    category?: string;
}
export declare class Startup {
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    website?: string;
    industry?: string;
    stage: StartupStage;
    status: StartupStatus;
    squad: {
        lead: Types.ObjectId;
        members: Types.ObjectId[];
    };
    resources: {
        deck?: string;
        demo?: string;
        repository?: string;
        documentation?: string;
    };
    documents: StartupDocumentSubSchema[];
    metrics: Metric[];
    kpis: Array<{
        name: string;
        current: number;
        target: number;
        unit: string;
        lastUpdated: Date;
    }>;
    timeline: Timeline[];
    activityLog: ActivityLog[];
    milestones: Milestone[];
    keyDates?: {
        foundedDate?: Date;
        incorporationDate?: Date;
        firstRevenue?: Date;
        breakEven?: Date;
    };
    tags: string[];
    metadata?: Record<string, any>;
}
export declare const StartupSchema: import("mongoose").Schema<Startup, import("mongoose").Model<Startup, any, any, any, MongooseDocument<unknown, any, Startup, any, {}> & Startup & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Startup, MongooseDocument<unknown, {}, import("mongoose").FlatRecord<Startup>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Startup> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
