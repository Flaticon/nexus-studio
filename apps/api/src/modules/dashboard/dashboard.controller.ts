// apps/api/src/modules/dashboard/dashboard.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Patch,
  Param,
  Query, 
  Body,
  UseGuards 
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('executive-summary')
  getExecutiveSummary(@Query() filters?: DashboardFilterDto) {
    return this.dashboardService.getExecutiveSummary(filters);
  }

  @Get('metrics')
  getMetrics(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getMetrics(filters);
  }

  @Get('alerts')
  getAlerts() {
    return this.dashboardService.getActiveAlerts();
  }

  @Post('alerts')
  createAlert(@Body() alertData: any) {
    return this.dashboardService.createAlert(alertData);
  }

  @Patch('alerts/:id/dismiss')
  dismissAlert(@Param('id') id: string) {
    return this.dashboardService.dismissAlert(id);
  }

  @Post('metrics/calculate')
  async calculateMetrics() {
    await this.dashboardService.calculateDailyMetrics();
    return { message: 'Metrics calculation started' };
  }
}