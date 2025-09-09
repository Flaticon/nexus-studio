import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyResourceDocument = CompanyResource & Document;

export enum ResourceType {
  DOCUMENT = 'document',
  VIDEO = 'video',
  LINK = 'link',
  FORM = 'form',
  POLICY = 'policy',
  HANDBOOK = 'handbook',
  TRAINING = 'training',
  FAQ = 'faq'
}

export enum ResourceCategory {
  COMPANY_POLICIES = 'company_policies',
  EMPLOYEE_HANDBOOK = 'employee_handbook',
  BENEFITS = 'benefits',
  IT_SETUP = 'it_setup',
  SECURITY = 'security',
  COMPLIANCE = 'compliance',
  TRAINING = 'training',
  CULTURE = 'culture',
  PROCESSES = 'processes',
  TOOLS = 'tools'
}

@Schema({ timestamps: true })
export class CompanyResource {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: ResourceType })
  type: ResourceType;

  @Prop({ type: String, enum: ResourceCategory })
  category: ResourceCategory;

  @Prop()
  content: string; // For text-based content

  @Prop()
  fileUrl: string; // For file-based resources

  @Prop()
  externalUrl: string; // For external links

  @Prop()
  thumbnailUrl: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ default: 0 })
  order: number; // Display order within category

  @Prop({ default: true })
  isRequired: boolean; // Must be reviewed during onboarding

  @Prop({ type: [String] })
  applicableRoles: string[]; // Which roles need this resource

  @Prop({ type: [String] })
  applicableDepartments: string[]; // Which departments need this resource

  @Prop()
  version: string;

  @Prop()
  lastUpdatedBy: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  requiresSignature: boolean; // For policies that need acknowledgment

  @Prop({ default: false })
  requiresCompletion: boolean; // For trainings that need completion tracking

  @Prop()
  estimatedReadTime: number; // in minutes

  @Prop()
  language: string;

  @Prop()
  accessLevel: 'public' | 'internal' | 'confidential' | 'restricted';

  @Prop({ type: [Types.ObjectId], ref: 'Employee' })
  authorizedUsers: Types.ObjectId[]; // For restricted content

  @Prop({ type: Object })
  metadata: {
    fileSize?: number;
    mimeType?: string;
    downloadCount?: number;
    viewCount?: number;
    lastAccessedAt?: Date;
  };

  @Prop()
  summary: string; // AI-generated or manual summary for quick understanding

  @Prop({ type: [Object] })
  sections: {
    id: string;
    title: string;
    content: string;
    order: number;
  }[];

  @Prop({ type: [Object] })
  faqs: {
    question: string;
    answer: string;
    category: string;
    order: number;
  }[];

  @Prop()
  relatedResources: Types.ObjectId[]; // References to related resources

  // Onboarding integration fields
  @Prop({ default: false })
  isOnboardingStep: boolean; // Whether this resource is part of onboarding

  @Prop()
  onboardingStepOrder: number; // Order within onboarding process

  @Prop({ default: false })
  isDepartmentSpecific: boolean; // Specific to certain departments during onboarding

  @Prop()
  estimatedCompletionTime: number; // Time to complete this step (in minutes)

  @Prop({ type: String, enum: ['optional', 'required', 'conditional'] })
  onboardingRequirement: string; // How critical this is for onboarding

  @Prop({ type: [String] })
  prerequisiteResources: string[]; // Resource IDs that must be completed first

  @Prop({ type: [String] })
  completionCriteria: string[]; // What defines completion of this resource

  @Prop({ type: Object })
  onboardingMetadata: {
    assignedRole?: 'hr' | 'manager' | 'buddy' | 'self'; // Who assigns/manages this step
    reminderDays?: number; // Days before due date to send reminder
    escalationDays?: number; // Days after due date to escalate
    autoAssign?: boolean; // Automatically assign to new employees
    dueAfterStart?: number; // Days after start date when this is due
  };
}

export const CompanyResourceSchema = SchemaFactory.createForClass(CompanyResource);

// Indexes
CompanyResourceSchema.index({ type: 1 });
CompanyResourceSchema.index({ category: 1 });
CompanyResourceSchema.index({ tags: 1 });
CompanyResourceSchema.index({ isActive: 1 });
CompanyResourceSchema.index({ applicableRoles: 1 });
CompanyResourceSchema.index({ applicableDepartments: 1 });
CompanyResourceSchema.index({ isOnboardingStep: 1 });
CompanyResourceSchema.index({ onboardingStepOrder: 1 });
CompanyResourceSchema.index({ onboardingRequirement: 1 });
CompanyResourceSchema.index({ title: 'text', description: 'text', content: 'text' });