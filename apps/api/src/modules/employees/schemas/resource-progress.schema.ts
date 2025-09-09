import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResourceProgressDocument = ResourceProgress & Document;

export enum ProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped'
}

@Schema({ _id: false })
export class ResourceCompletion {
  @Prop({ type: Types.ObjectId, ref: 'CompanyResource', required: true })
  resourceId: Types.ObjectId;

  @Prop({ type: String, enum: ProgressStatus, default: ProgressStatus.NOT_STARTED })
  status: ProgressStatus;

  @Prop()
  startedAt?: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  dueDate?: Date;

  @Prop()
  notes: string;

  @Prop({ type: Object })
  completionData: any; // Form data, signatures, etc.

  @Prop({ type: Object })
  feedback?: {
    rating: number; // 1-5
    comment: string;
    submittedAt: Date;
  };

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  assignedBy?: Types.ObjectId; // HR or manager who assigned this

  @Prop()
  timeSpent?: number; // Time spent in minutes

  @Prop({ default: false })
  requiresReview: boolean; // Does completion need review?

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  reviewedBy?: Types.ObjectId;

  @Prop()
  reviewedAt?: Date;

  @Prop()
  reviewNotes?: string;
}

@Schema({ timestamps: true })
export class ResourceProgress {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ type: [ResourceCompletion], default: [] })
  resources: ResourceCompletion[];

  @Prop()
  onboardingStartDate: Date;

  @Prop()
  onboardingCompleteDate?: Date;

  @Prop({ default: false })
  isOnboardingComplete: boolean;

  @Prop({ default: 0 })
  overallProgress: number; // Percentage 0-100

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  assignedHR?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  assignedBuddy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  manager?: Types.ObjectId;

  @Prop()
  department: string;

  @Prop()
  role: string;

  @Prop({ type: Object })
  statistics: {
    totalResources: number;
    completedResources: number;
    requiredCompleted: number;
    totalRequiredResources: number;
    averageCompletionTime?: number;
    overallRating?: number;
  };

  @Prop({ type: [Object] })
  milestones: {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completedAt?: Date;
    isCompleted: boolean;
    requiredResources: Types.ObjectId[]; // Resources that must be completed for this milestone
  }[];

  @Prop({ type: Object })
  overallFeedback?: {
    rating: number;
    comments: string;
    suggestions: string;
    submittedAt: Date;
  };

  @Prop({ default: true })
  isActive: boolean;
}

export const ResourceProgressSchema = SchemaFactory.createForClass(ResourceProgress);

// Indexes
ResourceProgressSchema.index({ employeeId: 1 }, { unique: true });
ResourceProgressSchema.index({ isOnboardingComplete: 1 });
ResourceProgressSchema.index({ overallProgress: 1 });
ResourceProgressSchema.index({ department: 1 });
ResourceProgressSchema.index({ role: 1 });
ResourceProgressSchema.index({ 'resources.resourceId': 1 });
ResourceProgressSchema.index({ 'resources.status': 1 });