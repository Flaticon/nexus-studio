// apps/api/src/modules/dashboard/dashboard.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { 
  DashboardMetrics, 
  DashboardMetricsSchema 
} from './schemas/dashboard-metrics.schema';
import { Alert, AlertSchema } from './schemas/alert.schema';
import { PortfolioModule } from '../portfolio/portfolio.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: DashboardMetrics.name, schema: DashboardMetricsSchema },
      { name: Alert.name, schema: AlertSchema }
    ]),
    PortfolioModule // Import to access Startup model
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService]
})
export class DashboardModule {}