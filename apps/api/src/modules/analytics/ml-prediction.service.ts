import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PredictionModel, PredictionModelDocument } from './schemas/prediction-model.schema';
import { AnalyticsMetric, AnalyticsMetricDocument } from './schemas/analytics-metric.schema';
import { TrainModelDto } from './dto/train-model.dto';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';

export interface PredictionResult {
  metric: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  insight: string;
  predictionDate: Date;
  modelUsed: string;
}

@Injectable()
export class MLPredictionService {
  private readonly logger = new Logger(MLPredictionService.name);

  constructor(
    @InjectModel(PredictionModel.name) private predictionModelModel: Model<PredictionModelDocument>,
    @InjectModel(AnalyticsMetric.name) private analyticsMetricModel: Model<AnalyticsMetricDocument>,
  ) {}

  async generatePredictions(query: AnalyticsQueryDto): Promise<PredictionResult[]> {
    const { metrics = ['revenue', 'users', 'conversion_rate'] } = query;
    const predictions: PredictionResult[] = [];

    for (const metricName of metrics) {
      try {
        const prediction = await this.generateMetricPrediction(metricName, query);
        if (prediction) {
          predictions.push(prediction);
        }
      } catch (error) {
        this.logger.error(`Failed to generate prediction for ${metricName}: ${error.message}`);
      }
    }

    return predictions.sort((a, b) => b.confidence - a.confidence);
  }

  async trainModel(trainModelDto: TrainModelDto): Promise<PredictionModelDocument> {
    const {
      modelName,
      targetMetric,
      features,
      modelConfig,
      trainingStartDate,
      trainingEndDate,
      filters,
      metadata
    } = trainModelDto;

    // Get training data
    const trainingData = await this.getTrainingData(
      targetMetric,
      features,
      trainingStartDate,
      trainingEndDate,
      filters
    );

    if (trainingData.length < 30) {
      throw new Error('Insufficient training data. Need at least 30 data points.');
    }

    // Train the model
    const modelResult = await this.performModelTraining(
      trainingData,
      modelConfig
    );

    // Save the model
    const model = new this.predictionModelModel({
      modelName,
      version: this.generateModelVersion(),
      targetMetric,
      features,
      modelConfig: {
        ...modelConfig,
        trainingData: {
          startDate: trainingStartDate ? new Date(trainingStartDate) : new Date(),
          endDate: trainingEndDate ? new Date(trainingEndDate) : new Date(),
          recordCount: trainingData.length
        }
      },
      performance: modelResult.performance,
      weights: modelResult.weights,
      trainedAt: new Date(),
      metadata
    });

    return await model.save();
  }

  async getModels(): Promise<PredictionModelDocument[]> {
    return await this.predictionModelModel.find({ isActive: true })
      .sort({ trainedAt: -1 });
  }

  async updateModelPerformance(modelId: string, performance: any): Promise<void> {
    await this.predictionModelModel.updateOne(
      { _id: modelId },
      { $set: { performance, lastPredictionAt: new Date() } }
    );
  }

  private async generateMetricPrediction(
    metricName: string,
    query: AnalyticsQueryDto
  ): Promise<PredictionResult | null> {
    // Get the best model for this metric
    const model = await this.predictionModelModel.findOne({
      targetMetric: metricName,
      isActive: true
    }).sort({ 'performance.accuracy': -1 });

    if (!model) {
      // Use fallback prediction method
      return await this.generateFallbackPrediction(metricName, query);
    }

    // Get recent data for prediction
    const recentData = await this.getRecentDataForPrediction(metricName, model.features);

    if (recentData.length === 0) {
      return null;
    }

    // Generate prediction using the model
    const prediction = await this.applyModel(model, recentData);

    return {
      metric: metricName,
      current: recentData[recentData.length - 1].value,
      predicted: prediction.value,
      confidence: prediction.confidence,
      trend: this.determineTrend(
        recentData[recentData.length - 1].value,
        prediction.value
      ),
      insight: this.generateInsight(metricName, recentData, prediction),
      predictionDate: new Date(),
      modelUsed: model.modelName
    };
  }

  private async getTrainingData(
    targetMetric: string,
    features: string[],
    startDate?: string,
    endDate?: string,
    filters?: any
  ): Promise<any[]> {
    const dateFilter: any = {};

    if (startDate && endDate) {
      dateFilter.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else {
      // Default to last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      dateFilter.timestamp = { $gte: sixMonthsAgo };
    }

    // Build aggregation pipeline
    const pipeline = [
      {
        $match: {
          metricName: { $in: [targetMetric, ...features] },
          ...dateFilter,
          ...(filters?.sources ? { source: { $in: filters.sources } } : {}),
          ...(filters?.entityIds ? { entityId: { $in: filters.entityIds } } : {}),
          ...(filters?.tags ? { tags: { $in: filters.tags } } : {})
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$timestamp'
              }
            },
            metric: '$metricName'
          },
          value: { $avg: '$value' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          metrics: {
            $push: {
              name: '$_id.metric',
              value: '$value',
              count: '$count'
            }
          }
        }
      },
      { $sort: { _id: 1 as const } }
    ];

    const aggregatedData = await this.analyticsMetricModel.aggregate(pipeline);

    // Transform to training format
    return aggregatedData
      .filter(d => d.metrics.length >= features.length + 1) // Ensure all features are present
      .map(d => {
        const dataPoint: any = { date: d._id };

        d.metrics.forEach(m => {
          dataPoint[m.name] = m.value;
        });

        return dataPoint;
      });
  }

  private async performModelTraining(
    trainingData: any[],
    modelConfig: any
  ): Promise<{ performance: any; weights: any }> {
    const { algorithm, hyperparameters } = modelConfig;

    switch (algorithm) {
      case 'linear_regression':
        return await this.trainLinearRegression(trainingData, hyperparameters);
      case 'random_forest':
        return await this.trainRandomForest(trainingData, hyperparameters);
      case 'arima':
        return await this.trainARIMA(trainingData, hyperparameters);
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }

  private async trainLinearRegression(
    trainingData: any[],
    hyperparameters: any
  ): Promise<{ performance: any; weights: any }> {
    // Simplified linear regression implementation
    // In a real-world scenario, you'd use a proper ML library like TensorFlow.js or call a Python service

    const features = Object.keys(trainingData[0]).filter(k => k !== 'date' && k !== 'target');
    const n = trainingData.length;
    const featureCount = features.length;

    // Mock implementation - replace with actual linear regression
    const weights: any = {};
    features.forEach(feature => {
      weights[feature] = Math.random() * 2 - 1; // Random weight between -1 and 1
    });

    // Mock performance metrics
    const performance = {
      accuracy: 0.85 + Math.random() * 0.10, // 85-95%
      rmse: 0.05 + Math.random() * 0.10, // 5-15%
      mae: 0.03 + Math.random() * 0.07, // 3-10%
      r2: 0.80 + Math.random() * 0.15, // 80-95%
      confidenceInterval: [0.75, 0.95] as [number, number]
    };

    return { performance, weights };
  }

  private async trainRandomForest(
    trainingData: any[],
    hyperparameters: any
  ): Promise<{ performance: any; weights: any }> {
    // Mock Random Forest implementation
    const features = Object.keys(trainingData[0]).filter(k => k !== 'date' && k !== 'target');

    const weights: any = {};
    features.forEach(feature => {
      weights[feature] = Math.random(); // Feature importance
    });

    const performance = {
      accuracy: 0.88 + Math.random() * 0.10,
      rmse: 0.03 + Math.random() * 0.07,
      mae: 0.02 + Math.random() * 0.05,
      r2: 0.85 + Math.random() * 0.12,
      confidenceInterval: [0.80, 0.97] as [number, number]
    };

    return { performance, weights };
  }

  private async trainARIMA(
    trainingData: any[],
    hyperparameters: any
  ): Promise<{ performance: any; weights: any }> {
    // Mock ARIMA implementation for time series forecasting
    const weights = {
      ar_coefficients: [0.7, -0.2],
      ma_coefficients: [0.3],
      diff_order: 1
    };

    const performance = {
      accuracy: 0.82 + Math.random() * 0.12,
      rmse: 0.04 + Math.random() * 0.08,
      mae: 0.03 + Math.random() * 0.06,
      aic: 150 + Math.random() * 50, // Akaike Information Criterion
      bic: 160 + Math.random() * 50  // Bayesian Information Criterion
    };

    return { performance, weights };
  }

  private async getRecentDataForPrediction(
    metricName: string,
    features: string[]
  ): Promise<any[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const pipeline = [
      {
        $match: {
          metricName: { $in: [metricName, ...features] },
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$timestamp'
              }
            },
            metric: '$metricName'
          },
          value: { $avg: '$value' }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          metrics: {
            $push: {
              name: '$_id.metric',
              value: '$value'
            }
          }
        }
      },
      { $sort: { _id: 1 as const } }
    ];

    const aggregatedData = await this.analyticsMetricModel.aggregate(pipeline);

    return aggregatedData.map(d => {
      const dataPoint: any = { date: d._id };
      d.metrics.forEach(m => {
        dataPoint[m.name] = m.value;
      });
      return dataPoint;
    });
  }

  private async applyModel(
    model: PredictionModelDocument,
    recentData: any[]
  ): Promise<{ value: number; confidence: number }> {
    // Apply the trained model to make predictions
    // This is a simplified implementation

    const latestData = recentData[recentData.length - 1];
    const previousData = recentData[recentData.length - 2] || latestData;

    // Calculate trend-based prediction
    const currentValue = latestData[model.targetMetric] || 0;
    const previousValue = previousData[model.targetMetric] || currentValue;
    const trendFactor = currentValue / previousValue;

    // Apply model weights (simplified)
    let prediction = currentValue;
    let weightSum = 0;

    if (model.weights) {
      Object.entries(model.weights).forEach(([feature, weight]) => {
        if (typeof weight === 'number' && latestData[feature] !== undefined) {
          prediction += latestData[feature] * weight * 0.1; // Scale down the influence
          weightSum += Math.abs(weight);
        }
      });
    }

    // Apply trend
    prediction *= trendFactor;

    // Calculate confidence based on model performance and data quality
    const baseConfidence = model.performance?.accuracy || 0.75;
    const dataQuality = Math.min(recentData.length / 30, 1); // More data = higher confidence
    const confidence = baseConfidence * dataQuality * 100;

    return {
      value: Math.round(prediction * 100) / 100,
      confidence: Math.round(confidence)
    };
  }

  private async generateFallbackPrediction(
    metricName: string,
    query: AnalyticsQueryDto
  ): Promise<PredictionResult | null> {
    // Simple trend-based prediction when no trained model is available
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentMetrics = await this.analyticsMetricModel.find({
      metricName,
      timestamp: { $gte: thirtyDaysAgo }
    }).sort({ timestamp: 1 });

    if (recentMetrics.length < 5) {
      return null;
    }

    const values = recentMetrics.map(m => m.value);
    const currentValue = values[values.length - 1];
    const avgGrowthRate = this.calculateAverageGrowthRate(values);
    const predictedValue = currentValue * (1 + avgGrowthRate);

    return {
      metric: metricName,
      current: currentValue,
      predicted: Math.round(predictedValue * 100) / 100,
      confidence: 65, // Lower confidence for fallback method
      trend: this.determineTrend(currentValue, predictedValue),
      insight: this.generateFallbackInsight(metricName, avgGrowthRate),
      predictionDate: new Date(),
      modelUsed: 'trend_analysis'
    };
  }

  private calculateAverageGrowthRate(values: number[]): number {
    if (values.length < 2) return 0;

    const growthRates: number[] = [];
    for (let i = 1; i < values.length; i++) {
      if (values[i - 1] !== 0) {
        growthRates.push((values[i] - values[i - 1]) / values[i - 1]);
      }
    }

    return growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;
  }

  private determineTrend(current: number, predicted: number): 'up' | 'down' | 'stable' {
    const changePercentage = ((predicted - current) / current) * 100;

    if (changePercentage > 2) return 'up';
    if (changePercentage < -2) return 'down';
    return 'stable';
  }

  private generateInsight(
    metricName: string,
    recentData: any[],
    prediction: any
  ): string {
    const trend = this.determineTrend(
      recentData[recentData.length - 1].value,
      prediction.value
    );

    const changePercentage = Math.abs(
      ((prediction.value - recentData[recentData.length - 1].value) /
       recentData[recentData.length - 1].value) * 100
    );

    const trendDescriptions = {
      up: `Expected to increase by ${changePercentage.toFixed(1)}% based on recent trends`,
      down: `Expected to decrease by ${changePercentage.toFixed(1)}% - monitor closely`,
      stable: 'Expected to remain stable with minimal variation'
    };

    return trendDescriptions[trend];
  }

  private generateFallbackInsight(metricName: string, growthRate: number): string {
    const growthPercentage = growthRate * 100;

    if (growthPercentage > 5) {
      return `Strong positive trend detected with ${growthPercentage.toFixed(1)}% average growth`;
    } else if (growthPercentage < -5) {
      return `Declining trend detected with ${Math.abs(growthPercentage).toFixed(1)}% average decrease`;
    } else {
      return 'Stable performance with minimal variation in recent period';
    }
  }

  private generateModelVersion(): string {
    const now = new Date();
    return `v${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
  }
}