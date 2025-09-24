'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Activity,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Star,
  Info
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface PredictionData {
  period: string;
  actual: number;
  predicted: number;
  confidence: number;
}

interface MetricPrediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  change: number;
  changePercent: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
  factors: string[];
  data: PredictionData[];
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  category: string;
  estimatedGain: string;
  timeframe: string;
}

export default function PredictiveMetrics() {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [predictions, setPredictions] = useState<MetricPrediction[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get predictive data
    setTimeout(() => {
      setPredictions(getMockPredictions());
      setRecommendations(getMockRecommendations());
      setIsLoading(false);
    }, 1500);
  }, []);

  const getMockPredictions = (): MetricPrediction[] => [
    {
      metric: 'revenue',
      currentValue: 195000,
      predictedValue: 245000,
      change: 50000,
      changePercent: 25.6,
      confidence: 87,
      trend: 'up',
      timeframe: 'Next 3 months',
      factors: ['Seasonal growth', 'New feature launch', 'Market expansion'],
      data: [
        { period: 'Jul', actual: 195000, predicted: 205000, confidence: 92 },
        { period: 'Aug', actual: 0, predicted: 220000, confidence: 89 },
        { period: 'Sep', actual: 0, predicted: 235000, confidence: 85 },
        { period: 'Oct', actual: 0, predicted: 245000, confidence: 87 },
      ]
    },
    {
      metric: 'users',
      currentValue: 3250,
      predictedValue: 4100,
      change: 850,
      changePercent: 26.2,
      confidence: 82,
      trend: 'up',
      timeframe: 'Next 3 months',
      factors: ['Viral coefficient improvement', 'Marketing campaigns', 'Product improvements'],
      data: [
        { period: 'Jul', actual: 3250, predicted: 3400, confidence: 88 },
        { period: 'Aug', actual: 0, predicted: 3650, confidence: 84 },
        { period: 'Sep', actual: 0, predicted: 3900, confidence: 80 },
        { period: 'Oct', actual: 0, predicted: 4100, confidence: 82 },
      ]
    },
    {
      metric: 'retention',
      currentValue: 93,
      predictedValue: 89,
      change: -4,
      changePercent: -4.3,
      confidence: 75,
      trend: 'down',
      timeframe: 'Next 3 months',
      factors: ['Market saturation', 'Increased competition', 'Feature complexity'],
      data: [
        { period: 'Jul', actual: 93, predicted: 92, confidence: 85 },
        { period: 'Aug', actual: 0, predicted: 91, confidence: 78 },
        { period: 'Sep', actual: 0, predicted: 90, confidence: 72 },
        { period: 'Oct', actual: 0, predicted: 89, confidence: 75 },
      ]
    },
    {
      metric: 'conversion',
      currentValue: 3.8,
      predictedValue: 4.5,
      change: 0.7,
      changePercent: 18.4,
      confidence: 91,
      trend: 'up',
      timeframe: 'Next 3 months',
      factors: ['UX improvements', 'A/B test winners', 'Onboarding optimization'],
      data: [
        { period: 'Jul', actual: 3.8, predicted: 4.0, confidence: 93 },
        { period: 'Aug', actual: 0, predicted: 4.2, confidence: 90 },
        { period: 'Sep', actual: 0, predicted: 4.4, confidence: 89 },
        { period: 'Oct', actual: 0, predicted: 4.5, confidence: 91 },
      ]
    }
  ];

  const getMockRecommendations = (): Recommendation[] => [
    {
      id: '1',
      title: 'Optimize Onboarding Flow',
      description: 'Implement guided tour and reduce time-to-value for new users',
      impact: 'high',
      effort: 'medium',
      category: 'User Experience',
      estimatedGain: '+15% conversion rate',
      timeframe: '4-6 weeks'
    },
    {
      id: '2',
      title: 'Implement Predictive Churn Prevention',
      description: 'Use ML models to identify at-risk users and trigger retention campaigns',
      impact: 'high',
      effort: 'high',
      category: 'Retention',
      estimatedGain: '+8% retention rate',
      timeframe: '8-12 weeks'
    },
    {
      id: '3',
      title: 'A/B Test Pricing Strategy',
      description: 'Test value-based pricing to optimize revenue per customer',
      impact: 'medium',
      effort: 'low',
      category: 'Monetization',
      estimatedGain: '+12% ARPU',
      timeframe: '2-3 weeks'
    },
    {
      id: '4',
      title: 'Expand Referral Program',
      description: 'Enhanced incentives and social sharing features for user referrals',
      impact: 'medium',
      effort: 'medium',
      category: 'Growth',
      estimatedGain: '+20% organic growth',
      timeframe: '6-8 weeks'
    }
  ];

  const selectedPrediction = predictions.find(p => p.metric === selectedMetric);

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'revenue': return <DollarSign className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      case 'retention': return <Target className="w-5 h-5" />;
      case 'conversion': return <TrendingUp className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'revenue': return 'from-green-400 to-emerald-600';
      case 'users': return 'from-blue-400 to-indigo-600';
      case 'retention': return 'from-purple-400 to-violet-600';
      case 'conversion': return 'from-orange-400 to-red-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTrendIcon = (trend: string, changePercent: number) => {
    if (trend === 'up' || changePercent > 0) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (trend === 'down' || changePercent < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case 'revenue': return `$${value.toLocaleString()}`;
      case 'users': return value.toLocaleString();
      case 'retention': case 'conversion': return `${value}%`;
      default: return value.toString();
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-60 animate-pulse"></div>
          </div>
        </div>
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Predictive Analytics Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Predictive Analytics</h2>
            <p className="text-indigo-100">AI-powered forecasting and recommendations</p>
          </div>
        </div>

        {/* Metric Selector */}
        <div className="flex flex-wrap gap-3">
          {predictions.map((prediction) => (
            <button
              key={prediction.metric}
              onClick={() => setSelectedMetric(prediction.metric)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedMetric === prediction.metric
                  ? 'bg-white bg-opacity-20 backdrop-blur-sm'
                  : 'bg-white bg-opacity-10 hover:bg-opacity-15'
              }`}
            >
              {getMetricIcon(prediction.metric)}
              <span className="font-medium capitalize">{prediction.metric}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Prediction Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          {selectedPrediction && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getMetricColor(selectedMetric)} rounded-xl flex items-center justify-center text-white`}>
                    {getMetricIcon(selectedMetric)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">{selectedMetric} Prediction</h3>
                    <p className="text-sm text-gray-600">{selectedPrediction.timeframe}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    {getTrendIcon(selectedPrediction.trend, selectedPrediction.changePercent)}
                    <span className={`font-bold ${selectedPrediction.changePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPrediction.changePercent > 0 ? '+' : ''}{selectedPrediction.changePercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedPrediction.confidence}% confidence
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={selectedPrediction.data}>
                    <defs>
                      <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="period" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => [
                        formatValue(value as number, selectedMetric),
                        name === 'actual' ? 'Actual' : 'Predicted'
                      ]}
                    />

                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#3B82F6"
                      fill="url(#actualGradient)"
                      strokeWidth={3}
                      connectNulls={false}
                    />

                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="#8B5CF6"
                      fill="url(#predictedGradient)"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      connectNulls={true}
                    />

                    <ReferenceLine x="Jul" stroke="#EF4444" strokeDasharray="2 2" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Key Factors */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  Key Factors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPrediction.factors.map((factor, index) => (
                    <span key={index} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Predictions Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictions Summary</h3>
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <div
                  key={prediction.metric}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedMetric === prediction.metric
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                  onClick={() => setSelectedMetric(prediction.metric)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getMetricIcon(prediction.metric)}
                      <span className="font-medium text-gray-900 capitalize">{prediction.metric}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{prediction.confidence}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {formatValue(prediction.currentValue, prediction.metric)} → {formatValue(prediction.predictedValue, prediction.metric)}
                    </span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(prediction.trend, prediction.changePercent)}
                      <span className={`text-sm font-medium ${
                        prediction.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {prediction.changePercent > 0 ? '+' : ''}{prediction.changePercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
            <p className="text-sm text-gray-600">Actionable insights to improve performance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{rec.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(rec.impact)}`}>
                    {rec.impact} impact
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEffortColor(rec.effort)}`}>
                    {rec.effort} effort
                  </span>
                  <span className="text-xs text-gray-500">{rec.timeframe}</span>
                </div>
                <div className="text-sm font-medium text-green-600">
                  {rec.estimatedGain}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}