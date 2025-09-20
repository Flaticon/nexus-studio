'use client';

import { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ReferenceLine,
  Brush,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Layers,
  Map,
  Filter,
  Download,
  RefreshCw,
  Maximize2,
  Settings
} from 'lucide-react';

interface AdvancedChartsProps {
  data: any;
  selectedMetrics: string[];
  timeRange: string;
  onMetricChange: (metrics: string[]) => void;
  onTimeRangeChange: (range: string) => void;
}

export default function AdvancedCharts({
  data,
  selectedMetrics,
  timeRange,
  onMetricChange,
  onTimeRangeChange
}: AdvancedChartsProps) {
  const [chartType, setChartType] = useState('trend');
  const [showAnomalies, setShowAnomalies] = useState(true);
  const [showPredictions, setShowPredictions] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const chartTypes = [
    { id: 'trend', label: 'Trend Analysis', icon: TrendingUp },
    { id: 'comparison', label: 'Comparison', icon: BarChart3 },
    { id: 'distribution', label: 'Distribution', icon: PieChartIcon },
    { id: 'correlation', label: 'Correlation', icon: Activity },
    { id: 'funnel', label: 'Funnel', icon: Target },
    { id: 'heatmap', label: 'Heatmap', icon: Map },
    { id: 'cohort', label: 'Cohort', icon: Layers }
  ];

  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16'];

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data.trends}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="month"
          stroke="#6B7280"
          fontSize={12}
        />
        <YAxis stroke="#6B7280" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />

        {selectedMetrics.includes('revenue') && (
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
            name="Revenue"
          />
        )}

        {selectedMetrics.includes('users') && (
          <Line
            type="monotone"
            dataKey="users"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
            name="Users"
          />
        )}

        {selectedMetrics.includes('retention') && (
          <Line
            type="monotone"
            dataKey="retention"
            stroke="#8B5CF6"
            strokeWidth={3}
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
            name="Retention %"
          />
        )}

        {showAnomalies && (
          <ReferenceLine y={0} stroke="#EF4444" strokeDasharray="5 5" />
        )}

        <Brush dataKey="month" height={30} stroke="#3B82F6" />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderComparisonChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data.startupMetrics}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="name"
          stroke="#6B7280"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis stroke="#6B7280" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />

        {selectedMetrics.includes('revenue') && (
          <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" radius={[4, 4, 0, 0]} />
        )}

        {selectedMetrics.includes('users') && (
          <Bar dataKey="users" fill="#10B981" name="Users" radius={[4, 4, 0, 0]} />
        )}

        {selectedMetrics.includes('growth') && (
          <Bar dataKey="growth" fill="#8B5CF6" name="Growth %" radius={[4, 4, 0, 0]} />
        )}
      </BarChart>
    </ResponsiveContainer>
  );

  const renderDistributionChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="revenue"
          data={data.startupMetrics}
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={60}
          paddingAngle={5}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          labelLine={false}
        >
          {data.startupMetrics.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`$${value.toLocaleString()}`, 'Revenue']}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderCorrelationChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart data={data.startupMetrics}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="cac"
          name="CAC"
          stroke="#6B7280"
          fontSize={12}
          label={{ value: 'Customer Acquisition Cost', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          dataKey="ltv"
          name="LTV"
          stroke="#6B7280"
          fontSize={12}
          label={{ value: 'Lifetime Value', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, name) => [value, name === 'cac' ? 'CAC' : 'LTV']}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Scatter dataKey="ltv" fill="#3B82F6" />
        <ReferenceLine
          segment={[{ x: 200, y: 1000 }, { x: 600, y: 5000 }]}
          stroke="#10B981"
          strokeDasharray="5 5"
          label="Healthy LTV/CAC Ratio"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );

  const renderFunnelChart = () => {
    const funnelData = [
      { name: 'Visitors', value: 10000, fill: '#3B82F6' },
      { name: 'Signups', value: 3200, fill: '#10B981' },
      { name: 'Trials', value: 1200, fill: '#8B5CF6' },
      { name: 'Conversions', value: 400, fill: '#F59E0B' },
      { name: 'Retained', value: 320, fill: '#EF4444' }
    ];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <FunnelChart>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Funnel
            dataKey="value"
            data={funnelData}
            isAnimationActive={true}
          >
            <LabelList position="center" fill="#fff" stroke="none" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    );
  };

  const renderRadarChart = () => {
    const radarData = data.startupMetrics.map(startup => ({
      startup: startup.name,
      growth: startup.growth,
      retention: startup.retention,
      satisfaction: startup.nps || 75,
      efficiency: (startup.ltv / startup.cac) * 10,
      market: startup.stage === 'pmf' ? 90 : startup.stage === 'validation' ? 60 : 30
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData[0] ? [radarData[0]] : []}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <PolarRadiusAxis
            tick={{ fontSize: 10, fill: '#6B7280' }}
            domain={[0, 100]}
          />
          <Radar
            dataKey="growth"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.1}
            strokeWidth={2}
            name="Growth"
          />
          <Radar
            dataKey="retention"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.1}
            strokeWidth={2}
            name="Retention"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  const renderCohortChart = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">Cohort</th>
            <th className="text-center py-3 px-4 font-medium text-gray-900">Size</th>
            <th className="text-center py-3 px-4 font-medium text-gray-900">Month 1</th>
            <th className="text-center py-3 px-4 font-medium text-gray-900">Month 2</th>
            <th className="text-center py-3 px-4 font-medium text-gray-900">Month 3</th>
            <th className="text-center py-3 px-4 font-medium text-gray-900">Month 6</th>
          </tr>
        </thead>
        <tbody>
          {data.cohortData.map((cohort, index) => (
            <tr key={cohort.cohort} className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-900">{cohort.cohort}</td>
              <td className="text-center py-3 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  100%
                </span>
              </td>
              <td className="text-center py-3 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  cohort.month1 >= 80 ? 'bg-green-100 text-green-800' :
                  cohort.month1 >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {cohort.month1}%
                </span>
              </td>
              <td className="text-center py-3 px-4">
                {cohort.month2 !== null ? (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    cohort.month2 >= 70 ? 'bg-green-100 text-green-800' :
                    cohort.month2 >= 50 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cohort.month2}%
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="text-center py-3 px-4">
                {cohort.month3 !== null ? (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    cohort.month3 >= 60 ? 'bg-green-100 text-green-800' :
                    cohort.month3 >= 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cohort.month3}%
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="text-center py-3 px-4">
                {cohort.month5 !== null ? (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    cohort.month5 >= 50 ? 'bg-green-100 text-green-800' :
                    cohort.month5 >= 30 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cohort.month5}%
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'trend': return renderTrendChart();
      case 'comparison': return renderComparisonChart();
      case 'distribution': return renderDistributionChart();
      case 'correlation': return renderCorrelationChart();
      case 'funnel': return renderFunnelChart();
      case 'radar': return renderRadarChart();
      case 'cohort': return renderCohortChart();
      default: return renderTrendChart();
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-100 ${
      fullScreen ? 'fixed inset-4 z-50' : ''
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Advanced Analytics</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnomalies(!showAnomalies)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                showAnomalies
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              Anomalies
            </button>
            <button
              onClick={() => setShowPredictions(!showPredictions)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                showPredictions
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              Predictions
            </button>
            <button
              onClick={() => setFullScreen(!fullScreen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2">
          {chartTypes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setChartType(id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartType === id
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        {renderChart()}
      </div>

      {/* Chart Controls */}
      <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Metrics:</span>
              <div className="flex gap-2">
                {['revenue', 'users', 'growth', 'retention'].map(metric => (
                  <button
                    key={metric}
                    onClick={() => {
                      const newMetrics = selectedMetrics.includes(metric)
                        ? selectedMetrics.filter(m => m !== metric)
                        : [...selectedMetrics, metric];
                      onMetricChange(newMetrics);
                    }}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      selectedMetrics.includes(metric)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}