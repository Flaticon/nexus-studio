// apps/web/src/components/portfolio/ComparisonView.tsx
'use client';

import { FC } from 'react';
import { Startup, Metric } from '@/types/portfolio';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface ComparisonViewProps {
  startups: Startup[];
  metrics: string[];
}

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const ComparisonView: FC<ComparisonViewProps> = ({ 
  startups, 
  metrics 
}) => {
  // Prepare data for bar chart
  const barChartData = metrics.map(metricName => {
    const dataPoint: any = { metric: metricName };
    startups.forEach((startup, index) => {
      const metric = startup.metrics.find(m => m.name === metricName);
      dataPoint[startup.name] = metric?.value || 0;
    });
    return dataPoint;
  });

  // Prepare data for radar chart
  const radarChartData = startups[0]?.kpis.map(kpi => {
    const dataPoint: any = { kpi: kpi.name };
    startups.forEach(startup => {
      const startupKpi = startup.kpis.find(k => k.name === kpi.name);
      dataPoint[startup.name] = startupKpi 
        ? (startupKpi.current / startupKpi.target) * 100 
        : 0;
    });
    return dataPoint;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Startup Comparison</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {startups.map((startup, index) => (
            <div 
              key={startup._id}
              className="border rounded-lg p-4"
              style={{ borderColor: colors[index] }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <h3 className="font-medium">{startup.name}</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Stage: {startup.stage}</p>
                <p>Team: {startup.squad.members.length + 1} members</p>
                <p>Founded: {startup.keyDates?.foundedDate 
                  ? new Date(startup.keyDates.foundedDate).getFullYear()
                  : 'N/A'
                }</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Comparison */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Metrics Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Legend />
            {startups.map((startup, index) => (
              <Bar
                key={startup._id}
                dataKey={startup.name}
                fill={colors[index]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* KPI Performance */}
      {radarChartData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">KPI Performance (%)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarChartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="kpi" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              {startups.map((startup, index) => (
                <Radar
                  key={startup._id}
                  name={startup.name}
                  dataKey={startup.name}
                  stroke={colors[index]}
                  fill={colors[index]}
                  fillOpacity={0.3}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Timeline Comparison */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Stage Progression</h3>
        <div className="space-y-4">
          {startups.map((startup, index) => (
            <div key={startup._id}>
              <h4 className="font-medium mb-2">{startup.name}</h4>
              <div className="flex items-center gap-2">
                {Object.values(StartupStage).map(stage => {
                  const timelineEvent = startup.timeline.find(t => t.stage === stage);
                  const isPassed = timelineEvent !== undefined;
                  const isCurrent = startup.stage === stage;
                  
                  return (
                    <div
                      key={stage}
                      className={`
                        flex-1 h-2 rounded
                        ${isPassed || isCurrent 
                          ? `bg-${colors[index]}` 
                          : 'bg-gray-200'
                        }
                      `}
                      style={{
                        backgroundColor: isPassed || isCurrent 
                          ? colors[index] 
                          : undefined
                      }}
                      title={timelineEvent 
                        ? new Date(timelineEvent.date).toLocaleDateString() 
                        : 'Not reached'
                      }
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};