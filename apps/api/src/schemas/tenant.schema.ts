import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tenant extends Document {
  @Prop({ required: true, unique: true })
  subdomain: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  plan: 'starter' | 'professional' | 'enterprise';

  @Prop({ required: true })
  status: 'active' | 'inactive' | 'trial' | 'suspended';

  @Prop({ default: Date.now })
  trialEndsAt: Date;

  @Prop({ default: {} })
  settings: {
    logo?: string;
    primaryColor?: string;
    companyName?: string;
    website?: string;
    industry?: string;
  };

  @Prop({ default: {} })
  billing: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    cancelAtPeriodEnd?: boolean;
  };

  @Prop({ default: {} })
  usage: {
    venturesCount: number;
    usersCount: number;
    storageUsed: number; // in MB
  };

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

// Add indexes for performance
TenantSchema.index({ subdomain: 1 });
TenantSchema.index({ email: 1 });
TenantSchema.index({ 'billing.stripeCustomerId': 1 });