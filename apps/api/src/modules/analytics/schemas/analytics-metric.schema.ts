import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalyticsMetricDocument = AnalyticsMetric & Document;

@Schema({
  timestamps: true,
  collection: 'analytics_metrics',
  autoIndex: true
})
export class AnalyticsMetric {
  @Prop({ required: true, index: true })
  metricName: string;

  @Prop({ required: true, type: Number })
  value: number;

  @Prop({ required: true, index: true })
  timestamp: Date;

  @Prop({ required: true, index: true })
  source: string; // 'startup', 'portfolio', 'user', 'system'

  @Prop({ index: true })
  entityId?: string; // startup ID, user ID, etc.

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop({ type: Object })
  dimensions?: {
    category?: string;
    region?: string;
    segment?: string;
    [key: string]: string | undefined;
  };

  @Prop({ type: [String], index: true })
  tags?: string[];

  @Prop({ default: false })
  isProcessed?: boolean;

  @Prop()
  processedAt?: Date;
}

export const AnalyticsMetricSchema = SchemaFactory.createForClass(AnalyticsMetric);

// Indexes for better performance
AnalyticsMetricSchema.index({ metricName: 1, timestamp: -1 });
AnalyticsMetricSchema.index({ source: 1, entityId: 1, timestamp: -1 });
AnalyticsMetricSchema.index({ tags: 1, timestamp: -1 });
AnalyticsMetricSchema.index({ 'dimensions.category': 1, timestamp: -1 });