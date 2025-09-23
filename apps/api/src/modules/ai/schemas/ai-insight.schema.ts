import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AIInsightDocument = AIInsight & Document;

@Schema({
  timestamps: true,
  collection: 'ai_insights'
})
export class AIInsight {
  @Prop({ required: true })
  type: 'opportunity' | 'risk' | 'trend' | 'prediction';

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0, max: 1 })
  confidence: number;

  @Prop({ required: true })
  priority: 'low' | 'medium' | 'high' | 'critical';

  @Prop({ default: false })
  actionable: boolean;

  @Prop({ type: [String], default: [] })
  recommendations: string[];

  @Prop({ type: Object })
  data?: any;

  @Prop()
  userId?: string;

  @Prop()
  startupId?: string;

  @Prop()
  source: string; // 'openai', 'anthropic', 'internal'

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: false })
  isArchived: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const AIInsightSchema = SchemaFactory.createForClass(AIInsight);