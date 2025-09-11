import { Document, Types } from 'mongoose';
interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}
export type AlertDocument = Alert & Document & Timestamps & {
    _id: Types.ObjectId;
};
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
export declare const AlertSchema: any;
export {};
