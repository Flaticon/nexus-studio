import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MLPredictionService } from './ml-prediction.service';
import { RealtimeAnalyticsService } from './realtime-analytics.service';
import { AnalyticsMetric, AnalyticsMetricSchema } from './schemas/analytics-metric.schema';
import { PredictionModel, PredictionModelSchema } from './schemas/prediction-model.schema';
import { AnalyticsAlert, AnalyticsAlertSchema } from './schemas/analytics-alert.schema';
import { UserActivity, UserActivitySchema } from './schemas/user-activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalyticsMetric.name, schema: AnalyticsMetricSchema },
      { name: PredictionModel.name, schema: PredictionModelSchema },
      { name: AnalyticsAlert.name, schema: AnalyticsAlertSchema },
      { name: UserActivity.name, schema: UserActivitySchema },
    ])
  ],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    MLPredictionService,
    RealtimeAnalyticsService,
  ],
  exports: [AnalyticsService, MLPredictionService, RealtimeAnalyticsService],
})
export class AnalyticsModule {}