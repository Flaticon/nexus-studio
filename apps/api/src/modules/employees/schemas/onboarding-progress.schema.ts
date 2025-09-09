import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OnboardingProgressDocument = OnboardingProgress & Document;

export enum OnboardingStepStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped'
}

export enum OnboardingStepType {
  FORM = 'form',
  DOCUMENT = 'document',
  VIDEO = 'video',
  TASK = 'task',
  MEETING = 'meeting',
  TRAINING = 'training'
}

@Schema({ _id: false })
export class OnboardingStep {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: OnboardingStepType })
  type: OnboardingStepType;

  @Prop({ type: String, enum: OnboardingStepStatus, default: OnboardingStepStatus.PENDING })
  status: OnboardingStepStatus;

  @Prop()
  order: number;

  @Prop({ default: false })
  isRequired: boolean;

  @Prop()
  dueDate?: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  assignedTo: string; // HR person or manager responsible

  @Prop()
  estimatedDuration: number; // in minutes

  @Prop({ type: [Types.ObjectId], ref: 'CompanyResource' })
  resources: Types.ObjectId[]; // References to CompanyResource documents

  @Prop({ type: Object })
  formData: any; // For form-type steps

  @Prop()
  notes: string;

  @Prop({ type: Object })
  feedback?: {
    rating: number; // 1-5
    comment: string;
    submittedAt: Date;
  };
}

@Schema({ timestamps: true })
export class OnboardingProgress {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  completedDate?: Date;

  @Prop({ default: 0 })
  completionPercentage: number;

  @Prop({ type: [OnboardingStep], default: [] })
  steps: OnboardingStep[];

  @Prop()
  currentStepId: string;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  assignedHR: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  assignedBuddy: Types.ObjectId; // Mentor/buddy system

  @Prop({ type: [String] })
  departmentSpecificSteps: string[]; // References to department-specific onboarding steps

  @Prop({ type: [Object] })
  customSteps: OnboardingStep[]; // Custom steps added for this specific employee

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ type: [Object] })
  documents: {
    id: string;
    name: string;
    type: 'contract' | 'handbook' | 'policy' | 'form' | 'other';
    url: string;
    status: 'pending' | 'reviewed' | 'signed';
    uploadedAt: Date;
    reviewedAt?: Date;
  }[];

  @Prop({ type: [Object] })
  meetings: {
    id: string;
    title: string;
    type: 'one_on_one' | 'team_intro' | 'company_overview' | 'training';
    scheduledDate: Date;
    attendees: string[];
    status: 'scheduled' | 'completed' | 'cancelled';
    notes: string;
  }[];

  @Prop({ type: Object })
  feedback?: {
    overallRating: number; // 1-5
    comments: string;
    suggestions: string;
    submittedAt: Date;
  };

  @Prop({ default: true })
  isActive: boolean;

  // Reference to the new resource progress tracking system
  @Prop({ type: Types.ObjectId, ref: 'ResourceProgress' })
  resourceProgress?: Types.ObjectId;
}

export const OnboardingProgressSchema = SchemaFactory.createForClass(OnboardingProgress);

// Indexes
OnboardingProgressSchema.index({ employeeId: 1 });
OnboardingProgressSchema.index({ isCompleted: 1 });
OnboardingProgressSchema.index({ completionPercentage: 1 });