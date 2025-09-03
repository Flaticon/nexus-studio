// apps/api/src/modules/dashboard/schemas/alert.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ✅ Interfaz para los timestamps automáticos
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Tipo corregido que incluye timestamps y _id tipado
export type AlertDocument = Alert & Document & Timestamps & {
  _id: Types.ObjectId;
};

export enum AlertType {
  CRITICAL = 'critical',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success'
}

export enum AlertCategory {
  FINANCIAL = 'financial',
  PERFORMANCE = 'performance',
  TEAM = 'team',
  DEADLINE = 'deadline',
  SYSTEM = 'system'
}

@Schema({ 
  timestamps: true  // ✅ Esto añade createdAt y updatedAt automáticamente
})
export class Alert {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: AlertType })
  type: AlertType;

  @Prop({ required: true, enum: AlertCategory })
  category: AlertCategory;

  @Prop({ type: Types.ObjectId, ref: 'Startup' })
  startupId?: Types.ObjectId;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: false })
  isDismissed: boolean;

  @Prop()
  actionUrl?: string;

  @Prop()
  actionLabel?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop()
  expiresAt?: Date;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);