import { Document, Types } from 'mongoose';
export type StartupDocument = Startup & Document;
export declare class Startup {
    name: string;
    slug: string;
    stage: string;
    squad: {
        lead: Types.ObjectId;
        members: Types.ObjectId[];
    };
    resources: {
        deck?: string;
        demo?: string;
        repository?: string;
    };
    kpis: Array<{
        name: string;
        current: number;
        target: number;
        unit: string;
        lastUpdated: Date;
    }>;
    status: string;
}
export declare const StartupSchema: import("mongoose").Schema<Startup, import("mongoose").Model<Startup, any, any, any, Document<unknown, any, Startup, any, {}> & Startup & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Startup, Document<unknown, {}, import("mongoose").FlatRecord<Startup>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Startup> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
