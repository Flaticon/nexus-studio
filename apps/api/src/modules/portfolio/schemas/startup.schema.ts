// apps/api/src/modules/portfolio/schemas/startup.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument, Types } from 'mongoose';

export type StartupDocument = Startup & MongooseDocument;

// Enums
export enum StartupStage {
  IDEA = 'idea',
  VALIDATION = 'validation',
  PMF = 'pmf',
  GROWTH = 'growth',
  SCALE = 'scale'
}

export enum StartupStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  ARCHIVED = 'archived'
}

export enum DocumentType {
  PITCH_DECK = 'pitch_deck',
  BUSINESS_PLAN = 'business_plan',
  FINANCIAL_MODEL = 'financial_model',
  LEGAL = 'legal',
  TECHNICAL = 'technical',
  OTHER = 'other'
}

// Sub-schemas
@Schema()
class Timeline {
  @Prop({ required: true })
  stage: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  description?: string;

  @Prop()
  milestone?: string;
}

@Schema()
class StartupDocumentSubSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, enum: DocumentType })
  type: DocumentType;

  @Prop()
  description?: string;

  @Prop({ default: Date.now })
  uploadedAt: Date;

  @Prop()
  uploadedBy: string;

  @Prop()
  size?: number;

  @Prop()
  mimeType?: string;
}

@Schema()
class Metric {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  unit: string;

  @Prop()
  target?: number;

  @Prop()
  previousValue?: number;

  @Prop({ default: Date.now })
  recordedAt: Date;

  @Prop()
  category?: string;
}

@Schema()
class ActivityLog {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  userName: string;

  @Prop({ type: Object })
  changes?: Record<string, any>;

  @Prop({ default: Date.now })
  timestamp: Date;
}

@Schema()
class Milestone {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ default: false })
  completed: boolean;

  @Prop()
  completedAt?: Date;

  @Prop()
  category?: string;
}

// Main Startup Schema
@Schema({ timestamps: true })
export class Startup {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description?: string;

  @Prop()
  logo?: string;

  @Prop()
  website?: string;

  @Prop()
  industry?: string;

  @Prop({ 
    required: true, 
    enum: StartupStage,
    default: StartupStage.IDEA
  })
  stage: StartupStage;

  @Prop({ 
    required: true, 
    enum: StartupStatus,
    default: StartupStatus.ACTIVE
  })
  status: StartupStatus;

  @Prop({
    type: {
      lead: { type: Types.ObjectId, ref: 'TeamMember' },
      members: [{ type: Types.ObjectId, ref: 'TeamMember' }]
    }
  })
  squad: {
    lead: Types.ObjectId;
    members: Types.ObjectId[];
  };

  @Prop({
    type: {
      deck: String,
      demo: String,
      repository: String,
      documentation: String
    }
  })
  resources: {
    deck?: string;
    demo?: string;
    repository?: string;
    documentation?: string;
  };

  @Prop({ type: [StartupDocumentSubSchema], default: [] })
  documents: StartupDocumentSubSchema[];

  @Prop({ type: [Metric], default: [] })
  metrics: Metric[];

  @Prop([{
    name: String,
    current: Number,
    target: Number,
    unit: String,
    lastUpdated: Date
  }])
  kpis: Array<{
    name: string;
    current: number;
    target: number;
    unit: string;
    lastUpdated: Date;
  }>;

  @Prop({ type: [Timeline], default: [] })
  timeline: Timeline[];

  @Prop({ type: [ActivityLog], default: [] })
  activityLog: ActivityLog[];

  @Prop({ type: [Milestone], default: [] })
  milestones: Milestone[];

  @Prop({
    type: {
      foundedDate: Date,
      incorporationDate: Date,
      firstRevenue: Date,
      breakEven: Date
    }
  })
  keyDates?: {
    foundedDate?: Date;
    incorporationDate?: Date;
    firstRevenue?: Date;
    breakEven?: Date;
  };

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const StartupSchema = SchemaFactory.createForClass(Startup);

// Indexes for better query performance
StartupSchema.index({ stage: 1, status: 1 });
StartupSchema.index({ 'squad.lead': 1 });
StartupSchema.index({ tags: 1 });
StartupSchema.index({ createdAt: -1 });