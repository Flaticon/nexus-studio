'use client';

import { useState, useEffect } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  Lightbulb,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';

interface Prediction {
  metric: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  insight: string;
  predictionDate: Date;
  modelUsed: string;
}

interface Model {
  modelName: string;
  version: string;
  targetMetric: string;
  accuracy: number;
  lastTrained: Date;
  status: 'active' | 'training' | 'inactive';
}

export default function MLPredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string>('revenue');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    loadPredictions();
    loadModels();

    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(loadPredictions, 60000); // Refresh every minute
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const loadPredictions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/predictions');
      if (response.ok) {
        const data = await response.json();
        setPredictions(data);
      }
    } catch (error) {
      console.error('Failed to load predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadModels = async () => {
    try {
      const response = await fetch('/api/analytics/models');
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      }
    } catch (error) {
      console.error('Failed to load models:', error);
    }
  };

  const trainModel = async (modelConfig: any) => {
    try {
      const response = await fetch('/api/analytics/models/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modelConfig)
      });

      if (response.ok) {
        await loadModels();
        // Show success notification
      }
    } catch (error) {
      console.error('Failed to train model:', error);
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'down': return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'stable': return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-blue-600 bg-blue-100';
    if (confidence >= 55) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getModelStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'training': return <Clock className="w-4 h-4 text-yellow-600 animate-spin" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const generatePredictionChart = (prediction: Prediction) => {
    // Generate synthetic historical and prediction data
    const historicalData = [];
    const currentValue = prediction.current;
    const predictedValue = prediction.predicted;

    // Generate 30 days of historical data
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Create trend with some variance
      const progress = (30 - i) / 30;
      const baseValue = currentValue * (0.7 + progress * 0.3);
      const variance = (Math.random() - 0.5) * baseValue * 0.1;

      historicalData.push({
        date: date.toISOString().split('T')[0],
        actual: Math.round(baseValue + variance),
        predicted: null,
        type: 'historical'
      });
    }

    // Add prediction points
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const progress = i / 14;
      const predictedPoint = currentValue + (predictedValue - currentValue) * progress;
      const confidence = prediction.confidence / 100;
      const variance = predictedPoint * (1 - confidence) * 0.2;

      historicalData.push({
        date: date.toISOString().split('T')[0],
        actual: null,
        predicted: Math.round(predictedPoint),
        upperBound: Math.round(predictedPoint + variance),
        lowerBound: Math.round(predictedPoint - variance),
        type: 'prediction'
      });
    }

    return historicalData;
  };

  if (loading && predictions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">ML Predictions</h3>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  const selectedPrediction = predictions.find(p => p.metric.toLowerCase().includes(selectedMetric));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Predictions</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                autoRefresh
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              {autoRefresh ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              Auto-refresh
            </button>
            <button
              onClick={loadPredictions}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Metric Selector */}
        <div className="flex flex-wrap gap-2">
          {['revenue', 'users', 'conversion', 'retention'].map(metric => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedMetric === metric
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Prediction Display */}
      {selectedPrediction && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prediction Summary */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {getTrendIcon(selectedPrediction.trend)}
                <h4 className="text-lg font-semibold text-gray-900">
                  {selectedPrediction.metric} Prediction
                </h4>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Current Value</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedPrediction.current.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-purple-600 mb-1">Predicted Value</div>
                    <div className="text-2xl font-bold text-purple-900">
                      {selectedPrediction.predicted.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Confidence Level</span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(selectedPrediction.confidence)}`}>
                    <Target className="w-4 h-4" />
                    {selectedPrediction.confidence}%
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">AI Insight</span>
                  </div>
                  <p className="text-sm text-blue-800">{selectedPrediction.insight}</p>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div>Model: {selectedPrediction.modelUsed}</div>
                  <div>Generated: {new Date(selectedPrediction.predictionDate).toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Prediction Chart */}
            <div>
              <h5 className="text-md font-semibold text-gray-900 mb-4">Forecast Visualization</h5>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={generatePredictionChart(selectedPrediction)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    stroke="#6B7280"
                    fontSize={10}
                    tickFormatter={(value) => new Date(value).getMonth() + 1 + '/' + new Date(value).getDate()}
                  />
                  <YAxis stroke="#6B7280" fontSize={10} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />

                  {/* Historical data */}
                  <Area
                    dataKey="actual"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                    connectNulls={false}
                    name="Historical"
                  />

                  {/* Prediction confidence band */}
                  <Area
                    dataKey="upperBound"
                    stroke="none"
                    fill="#8B5CF6"
                    fillOpacity={0.1}
                    connectNulls={false}
                  />
                  <Area
                    dataKey="lowerBound"
                    stroke="none"
                    fill="#FFFFFF"
                    fillOpacity={1}
                    connectNulls={false}
                  />

                  {/* Prediction line */}
                  <Line
                    dataKey="predicted"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={false}
                    connectNulls={false}
                    name="Prediction"
                  />

                  <ReferenceLine
                    x={new Date().toISOString().split('T')[0]}
                    stroke="#EF4444"
                    strokeDasharray="2 2"
                    label={{ value: "Today", position: "top" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* All Predictions Grid */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">All Predictions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {predictions.map((prediction, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 border-2 transition-all cursor-pointer ${
                selectedMetric === prediction.metric.toLowerCase()
                  ? 'border-purple-200 bg-purple-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedMetric(prediction.metric.toLowerCase())}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{prediction.metric}</span>
                {getTrendIcon(prediction.trend)}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium">{prediction.current.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Predicted:</span>
                  <span className="font-medium text-purple-600">{prediction.predicted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Confidence:</span>
                  <div className={`px-2 py-1 rounded-full text-xs ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Management */}
      {showAdvanced && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">ML Models</h4>
            <button
              onClick={() => trainModel({
                modelName: 'revenue_predictor_v2',
                targetMetric: 'revenue',
                features: ['users', 'conversion_rate', 'avg_session_duration'],
                modelConfig: {
                  algorithm: 'random_forest',
                  hyperparameters: { n_estimators: 100, max_depth: 10 }
                }
              })}
              className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-800 border border-purple-200 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              <Brain className="w-4 h-4" />
              Train New Model
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Model</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Target</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Accuracy</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Trained</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{model.modelName}</td>
                    <td className="py-3 px-4 text-gray-600">{model.targetMetric}</td>
                    <td className="text-center py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(model.accuracy)}`}>
                        {model.accuracy}%
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        {getModelStatusIcon(model.status)}
                        <span className="text-xs capitalize">{model.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-xs">
                      {new Date(model.lastTrained).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Advanced Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          <Settings className="w-4 h-4" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
        </button>
      </div>
    </div>
  );
}