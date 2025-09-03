// apps/web/src/components/dashboard/RevenueChart.tsx
import { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface RevenueChartProps {
  data: Array<{
    date: string;
    revenue: number;
    costs: number;
    net: number;
  }>;
}

export const RevenueChart: FC<RevenueChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Financial Overview
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#6b7280"
          />
          <YAxis 
            tickFormatter={formatCurrency}
            stroke="#6b7280"
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(date) => formatDate(date)}
          />
          <Legend />
          
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="costs"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Costs"
          />
          <Line
            type="monotone"
            dataKey="net"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Net Income"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};