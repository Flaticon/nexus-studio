// apps/api/src/modules/portfolio/schemas/comparison.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument, Types } from 'mongoose';

export type ComparisonDocument = Comparison & MongooseDocument;

@Schema({ timestamps: true })
export class Comparison {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Startup', required: true })
  startupIds: Types.ObjectId[];

  @Prop({ required: true })
  metrics: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Object })
  snapshot?: Record<string, any>;

  @Prop()
  notes?: string;
}

export const ComparisonSchema = SchemaFactory.createForClass(Comparison);