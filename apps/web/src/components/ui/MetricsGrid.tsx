'use client';

import React from 'react';
import { MetricCard } from './MetricCard';
import { LucideIcon } from 'lucide-react';

interface Metric {
  id: string;
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'positive' | 'negative' | 'neutral';
  };
  icon?: LucideIcon;
  description?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'teal' | 'indigo' | 'orange';
}

interface MetricsGridProps {
  metrics: Metric[];
  columns?: 2 | 3 | 4;
  gap?: number;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  metrics,
  columns = 4,
  gap = 3
}) => {
  const getGridClasses = () => {
    const columnClasses = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };

    const gapClasses = {
      1: 'gap-2',
      2: 'gap-4',
      3: 'gap-6',
      4: 'gap-8'
    };

    return `grid ${columnClasses[columns]} ${gapClasses[gap as keyof typeof gapClasses] || 'gap-6'}`;
  };

  return (
    <div className={getGridClasses()}>
      {metrics.map((metric, index) => (
        <div
          key={metric.id}
          className="stagger-item"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <MetricCard
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            description={metric.description}
            color={metric.color}
          />
        </div>
      ))}
    </div>
  );
};

export type { Metric };