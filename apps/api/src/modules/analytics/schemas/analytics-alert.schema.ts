import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalyticsAlertDocument = AnalyticsAlert & Document;

@Schema({
  timestamps: true,
  collection: 'analytics_alerts'
})
export class AnalyticsAlert {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  metricName: string;

  @Prop({
    type: Object,
    required: true
  })
  condition: {
    operator: 'greater_than' | 'less_than' | 'equals' | 'not_equals' | 'percentage_change';
    threshold: number;
    timeWindow?: string; // '1h', '24h', '7d', etc.
  };

  @Prop({ type: [String], required: true })
  notificationChannels: string[]; // 'email', 'slack', 'webhook'

  @Prop({ type: [String], required: true })
  recipients: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  triggerCount: number;

  @Prop()
  lastTriggeredAt?: Date;

  @Prop()
  lastValue?: number;

  @Prop({ type: Object })
  filters?: {
    source?: string;
    entityId?: string;
    tags?: string[];
    dimensions?: Record<string, string>;
  };

  @Prop({ type: Object })
  metadata?: {
    description?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    category?: string;
  };
}

export const AnalyticsAlertSchema = SchemaFactory.createForClass(AnalyticsAlert);