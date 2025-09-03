// apps/api/src/modules/dashboard/schemas/dashboard-metrics.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ✅ Interfaz para los timestamps automáticos
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Tipo corregido que incluye _id tipado y timestamps
export type DashboardMetricsDocument = DashboardMetrics & Document & Timestamps & {
  _id: Types.ObjectId;
};

@Schema({ timestamps: true })
export class DashboardMetrics {
  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({
    type: {
      total: Number,
      active: Number,
      paused: Number,
      archived: Number,
      byStage: {
        idea: Number,
        validation: Number,
        pmf: Number,
        growth: Number,
        scale: Number
      }
    }
  })
  startups: {
    total: number;
    active: number;
    paused: number;
    archived: number;
    byStage: {
      idea: number;
      validation: number;
      pmf: number;
      growth: number;
      scale: number;
    }
  };

  @Prop({
    type: {
      totalRevenue: Number,
      totalCosts: Number,
      netIncome: Number,
      burnRate: Number,
      runway: Number,
      mrr: Number,
      arr: Number
    }
  })
  financials: {
    totalRevenue: number;
    totalCosts: number;
    netIncome: number;
    burnRate: number;
    runway: number;
    mrr: number;
    arr: number;
  };

  @Prop({
    type: {
      totalMembers: Number,
      activeMembers: Number,
      utilizationRate: Number,
      availableCapacity: Number
    }
  })
  team: {
    totalMembers: number;
    activeMembers: number;
    utilizationRate: number;
    availableCapacity: number;
  };

  @Prop({
    type: {
      totalUsers: Number,
      activeUsers: Number,
      averageNPS: Number,
      churnRate: Number
    }
  })
  users: {
    totalUsers: number;
    activeUsers: number;
    averageNPS: number;
    churnRate: number;
  };

  @Prop({
    type: {
      totalObjectives: Number,
      completedObjectives: Number,
      averageProgress: Number,
      onTrack: Number,
      atRisk: Number,
      behind: Number
    }
  })
  okrs: {
    totalObjectives: number;
    completedObjectives: number;
    averageProgress: number;
    onTrack: number;
    atRisk: number;
    behind: number;
  };
}

export const DashboardMetricsSchema = SchemaFactory.createForClass(DashboardMetrics);