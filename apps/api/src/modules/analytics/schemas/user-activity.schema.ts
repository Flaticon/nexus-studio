import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserActivityDocument = UserActivity & Document;

@Schema({
  timestamps: true,
  collection: 'user_activities',
  autoIndex: true
})
export class UserActivity {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, index: true })
  sessionId: string;

  @Prop({ required: true })
  action: string; // 'page_view', 'click', 'form_submit', 'api_call', etc.

  @Prop({ required: true })
  resource: string; // '/dashboard', '/analytics', 'button:export', etc.

  @Prop({ required: true, index: true })
  timestamp: Date;

  @Prop({ type: Object })
  context?: {
    userAgent?: string;
    ip?: string;
    referer?: string;
    page?: string;
    component?: string;
  };

  @Prop({ type: Object })
  data?: Record<string, any>; // Additional event data

  @Prop()
  duration?: number; // For actions with duration (page views, etc.)

  @Prop({ type: Object })
  performance?: {
    loadTime?: number;
    renderTime?: number;
    responseTime?: number;
  };

  @Prop({ default: false })
  isConversion?: boolean;

  @Prop()
  conversionValue?: number;
}

export const UserActivitySchema = SchemaFactory.createForClass(UserActivity);

// Indexes for analytics queries
UserActivitySchema.index({ userId: 1, timestamp: -1 });
UserActivitySchema.index({ action: 1, timestamp: -1 });
UserActivitySchema.index({ resource: 1, timestamp: -1 });
UserActivitySchema.index({ sessionId: 1, timestamp: -1 });