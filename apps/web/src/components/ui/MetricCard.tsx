'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'positive' | 'negative' | 'neutral';
  };
  icon?: LucideIcon;
  description?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  description,
  color = 'primary'
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return {
          accent: 'var(--color-success)',
          background: 'var(--color-success-light)'
        };
      case 'warning':
        return {
          accent: 'var(--color-warning)',
          background: 'var(--color-warning-light)'
        };
      case 'danger':
        return {
          accent: 'var(--color-danger)',
          background: 'var(--color-danger-light)'
        };
      default:
        return {
          accent: 'var(--color-primary)',
          background: 'var(--color-primary-light)'
        };
    }
  };

  const getChangeIcon = () => {
    if (!change) return null;

    const isPositive = change.type === 'positive';
    const isNegative = change.type === 'negative';

    return (
      <span
        className={`text-caption font-bold inline-flex items-center gap-1 px-3 py-1.5 rounded-full`}
        style={{
          color: 'white',
          backgroundColor: isPositive ? 'var(--color-success)' : isNegative ? 'var(--color-danger)' : 'var(--text-secondary)'
        }}
      >
        {isPositive ? '↗' : isNegative ? '↘' : '→'}
        {Math.abs(change.value)}%
      </span>
    );
  };

  const colors = getColorClasses();

  return (
    <div
      className="rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: 'calc(var(--spacing-unit) * 3)'
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-body font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            {title}
          </h3>
          <div
            className="text-4xl font-bold leading-none mb-1"
            style={{
              color: 'var(--text-primary)',
              fontSize: '2.5rem',
              lineHeight: '1'
            }}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {description && (
            <p className="text-sm font-medium mt-2" style={{ color: 'var(--text-tertiary)' }}>
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className="p-3 rounded-lg flex-shrink-0"
            style={{
              backgroundColor: colors.accent
            }}
          >
            <Icon
              className="w-6 h-6 text-white"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        {change && (
          <div>
            {getChangeIcon()}
          </div>
        )}
      </div>
    </div>
  );
};