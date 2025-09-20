import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PredictionModelDocument = PredictionModel & Document;

@Schema({
  timestamps: true,
  collection: 'prediction_models'
})
export class PredictionModel {
  @Prop({ required: true, unique: true })
  modelName: string;

  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  targetMetric: string;

  @Prop({ type: [String], required: true })
  features: string[];

  @Prop({ type: Object, required: true })
  modelConfig: {
    algorithm: string;
    hyperparameters: Record<string, any>;
    trainingData: {
      startDate: Date;
      endDate: Date;
      recordCount: number;
    };
  };

  @Prop({ type: Object })
  performance: {
    accuracy?: number;
    rmse?: number;
    mae?: number;
    r2?: number;
    confidenceInterval?: [number, number];
  };

  @Prop({ type: Object })
  weights?: Record<string, number>;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  trainedAt: Date;

  @Prop()
  lastPredictionAt?: Date;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const PredictionModelSchema = SchemaFactory.createForClass(PredictionModel);