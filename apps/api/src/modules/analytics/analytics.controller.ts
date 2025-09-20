import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { MLPredictionService } from './ml-prediction.service';
import { RealtimeAnalyticsService } from './realtime-analytics.service';
import { CreateAnalyticsMetricDto } from './dto/create-analytics-metric.dto';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
import { CreateAlertDto } from './dto/create-alert.dto';
import { TrainModelDto } from './dto/train-model.dto';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly mlPredictionService: MLPredictionService,
    private readonly realtimeService: RealtimeAnalyticsService,
  ) {}

  @Get('overview')
  async getAnalyticsOverview(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.analyticsService.getAnalyticsOverview(query);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch analytics overview',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('trends')
  async getPerformanceTrends(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.analyticsService.getPerformanceTrends(query);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch performance trends',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('cohorts')
  async getCohortAnalysis(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.analyticsService.getCohortAnalysis(query);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch cohort analysis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('funnel')
  async getFunnelAnalysis(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.analyticsService.getFunnelAnalysis(query);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch funnel analysis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user-journey')
  async getUserJourneyAnalysis(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.analyticsService.getUserJourneyAnalysis(query);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user journey analysis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('market')
  async getMarketAnalysis(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.analyticsService.getMarketAnalysis(query);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch market analysis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('predictions')
  async getPredictions(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.mlPredictionService.generatePredictions(query);
    } catch (error) {
      throw new HttpException(
        'Failed to generate predictions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('insights')
  async getInsights(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.analyticsService.generateInsights(query);
    } catch (error) {
      throw new HttpException(
        'Failed to generate insights',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('real-time')
  async getRealTimeMetrics() {
    try {
      return await this.realtimeService.getCurrentMetrics();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch real-time metrics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('anomalies')
  async getAnomalies(@Query() query: AnalyticsQueryDto) {
    try {
      return await this.analyticsService.detectAnomalies(query);
    } catch (error) {
      throw new HttpException(
        'Failed to detect anomalies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('metrics')
  async recordMetric(@Body() createMetricDto: CreateAnalyticsMetricDto) {
    try {
      return await this.analyticsService.recordMetric(createMetricDto);
    } catch (error) {
      throw new HttpException(
        'Failed to record metric',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('events/batch')
  async recordBatchEvents(@Body() events: CreateAnalyticsMetricDto[]) {
    try {
      return await this.analyticsService.recordBatchMetrics(events);
    } catch (error) {
      throw new HttpException(
        'Failed to record batch events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('alerts')
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    try {
      return await this.analyticsService.createAlert(createAlertDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create alert',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('alerts')
  async getAlerts() {
    try {
      return await this.analyticsService.getAlerts();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch alerts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('models/train')
  async trainModel(@Body() trainModelDto: TrainModelDto) {
    try {
      return await this.mlPredictionService.trainModel(trainModelDto);
    } catch (error) {
      throw new HttpException(
        'Failed to train model',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('models')
  async getModels() {
    try {
      return await this.mlPredictionService.getModels();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch models',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('export')
  async exportAnalytics(
    @Body() query: AnalyticsQueryDto & { format: 'csv' | 'xlsx' | 'pdf' },
    @Res() res: Response,
  ) {
    try {
      const exportData = await this.analyticsService.exportAnalytics(query);

      const contentType = {
        csv: 'text/csv',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        pdf: 'application/pdf',
      };

      res.setHeader('Content-Type', contentType[query.format]);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=analytics-export.${query.format}`,
      );

      res.send(exportData);
    } catch (error) {
      throw new HttpException(
        'Failed to export analytics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('health')
  async getAnalyticsHealth() {
    try {
      return await this.analyticsService.getHealthStatus();
    } catch (error) {
      throw new HttpException(
        'Failed to get analytics health',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}