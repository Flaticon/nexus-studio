// apps/api/src/modules/portfolio/schemas/startup.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StartupDocument = Startup & Document;

@Schema({ timestamps: true })
export class Startup {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ 
    required: true, 
    enum: ['idea', 'validation', 'pmf', 'growth', 'scale'] 
  })
  stage: string;

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
      repository: String
    }
  })
  resources: {
    deck?: string;
    demo?: string;
    repository?: string;
  };

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

  @Prop({ 
    required: true, 
    enum: ['active', 'paused', 'archived'],
    default: 'active'
  })
  status: string;
}

export const StartupSchema = SchemaFactory.createForClass(Startup);