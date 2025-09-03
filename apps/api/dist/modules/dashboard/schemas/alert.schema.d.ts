import { Document, Types } from 'mongoose';
export type AlertDocument = Alert & Document;
export declare enum AlertType {
    CRITICAL = "critical",
    WARNING = "warning",
    INFO = "info",
    SUCCESS = "success"
}
export declare enum AlertCategory {
    FINANCIAL = "financial",
    PERFORMANCE = "performance",
    TEAM = "team",
    DEADLINE = "deadline",
    SYSTEM = "system"
}
export declare class Alert {
    title: string;
    message: string;
    type: AlertType;
    category: AlertCategory;
    startupId?: Types.ObjectId;
    isRead: boolean;
    isDismissed: boolean;
    actionUrl?: string;
    actionLabel?: string;
    metadata?: Record<string, any>;
    expiresAt?: Date;
}
export declare const AlertSchema: import("mongoose").Schema<Alert, import("mongoose").Model<Alert, any, any, any, Document<unknown, any, Alert, any, {}> & Alert & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Alert, Document<unknown, {}, import("mongoose").FlatRecord<Alert>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Alert> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
