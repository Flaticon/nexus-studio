// apps/api/src/modules/users/schemas/user-settings.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type UserSettingsDocument = UserSettings & Document & Timestamps & {
  _id: Types.ObjectId;
};

@Schema()
class NotificationSettings {
  @Prop({ default: true })
  email: boolean;

  @Prop({ default: false })
  push: boolean;

  @Prop({ default: false })
  sms: boolean;

  @Prop({ default: true })
  desktop: boolean;
}

@Schema()
class AppearanceSettings {
  @Prop({ default: 'system', enum: ['light', 'dark', 'system'] })
  theme: string;

  @Prop({ default: 'es' })
  language: string;

  @Prop({ default: 'America/Mexico_City' })
  timezone: string;
}

@Schema()
class PrivacySettings {
  @Prop({ default: true })
  profileVisible: boolean;

  @Prop({ default: false })
  activityTracking: boolean;

  @Prop({ default: true })
  dataAnalytics: boolean;

  @Prop({ default: false })
  thirdPartySharing: boolean;
}

@Schema()
class SecuritySettings {
  @Prop({ default: false })
  twoFactorAuth: boolean;

  @Prop({ default: '30' })
  sessionTimeout: string;

  @Prop({ default: true })
  loginNotifications: boolean;

  @Prop({ default: true })
  deviceManagement: boolean;
}

@Schema({ timestamps: true })
export class UserSettings {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop()
  fullName?: string;

  @Prop()
  role?: string;

  @Prop()
  location?: string;

  @Prop()
  bio?: string;

  @Prop()
  avatar?: string;

  @Prop({ type: NotificationSettings, default: () => ({}) })
  notifications: NotificationSettings;

  @Prop({ type: AppearanceSettings, default: () => ({}) })
  appearance: AppearanceSettings;

  @Prop({ type: PrivacySettings, default: () => ({}) })
  privacy: PrivacySettings;

  @Prop({ type: SecuritySettings, default: () => ({}) })
  security: SecuritySettings;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);

// Index for better query performance
UserSettingsSchema.index({ userId: 1 }, { unique: true });