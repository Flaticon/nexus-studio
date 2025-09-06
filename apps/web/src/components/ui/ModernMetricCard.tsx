// apps/web/src/components/ui/ModernMetricCard.tsx
'use client';

import { FC, ReactNode } from 'react';
import { CircularProgress } from './CircularProgress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ModernMetricCardProps {
  title: string;
  value: string | number;
  target?: number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  trend?: 'up' | 'down' | 'stable';
  icon?: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  format?: 'currency' | 'percentage' | 'number';
  subtitle?: string;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ModernMetricCard: FC<ModernMetricCardProps> = ({
  title,
  value,
  target,
  change,
  changeType = 'neutral',
  trend = 'stable',
  icon,
  color = 'blue',
  format = 'number',
  subtitle,
  showProgress = false,
  size = 'md',
  className = ''
}) => {
  const formatValue = (val: string | number) => {
    if (format === 'currency' && typeof val === 'number') {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(val);
    }
    if (format === 'percentage' && typeof val === 'number') {
      return `${val}%`;
    }
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getColorClasses = () => {
    const colors = {
      blue: {
        bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        border: 'border-blue-100',
        accent: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        text: 'text-blue-700',
        ring: 'ring-blue-200'
      },
      green: {
        bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
        border: 'border-emerald-100',
        accent: 'bg-gradient-to-r from-emerald-500 to-green-500',
        text: 'text-emerald-700',
        ring: 'ring-emerald-200'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50 to-violet-50',
        border: 'border-purple-100',
        accent: 'bg-gradient-to-r from-purple-500 to-violet-500',
        text: 'text-purple-700',
        ring: 'ring-purple-200'
      },
      orange: {
        bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
        border: 'border-orange-100',
        accent: 'bg-gradient-to-r from-orange-500 to-amber-500',
        text: 'text-orange-700',
        ring: 'ring-orange-200'
      },
      pink: {
        bg: 'bg-gradient-to-br from-pink-50 to-rose-50',
        border: 'border-pink-100',
        accent: 'bg-gradient-to-r from-pink-500 to-rose-500',
        text: 'text-pink-700',
        ring: 'ring-pink-200'
      }
    };
    return colors[color];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: {
        padding: 'p-4',
        iconSize: 'w-12 h-12',
        titleSize: 'text-sm',
        valueSize: 'text-2xl',
        subtitleSize: 'text-xs'
      },
      md: {
        padding: 'p-6',
        iconSize: 'w-14 h-14',
        titleSize: 'text-base',
        valueSize: 'text-3xl',
        subtitleSize: 'text-sm'
      },
      lg: {
        padding: 'p-8',
        iconSize: 'w-16 h-16',
        titleSize: 'text-lg',
        valueSize: 'text-4xl',
        subtitleSize: 'text-base'
      }
    };
    return sizes[size];
  };

  const getChangeClasses = () => {
    switch (changeType) {
      case 'positive': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const colorClasses = getColorClasses();
  const sizeClasses = getSizeClasses();

  return (
    <div className={`
      relative overflow-hidden rounded-2xl border-2 transition-all duration-300 
      hover:shadow-lg hover:-translate-y-0.5 active:scale-98 group
      ${colorClasses.bg} ${colorClasses.border}
      ${sizeClasses.padding}
      ${className}
    `}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 -translate-y-8 translate-x-8 rotate-12">
        {icon && <div className="text-6xl">{icon}</div>}
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`font-bold ${colorClasses.text} ${sizeClasses.titleSize}`}>
                {title}
              </h3>
              <div className={`text-gray-400 ${trend !== 'stable' ? 'opacity-100' : 'opacity-0'}`}>
                {getTrendIcon()}
              </div>
            </div>
          </div>
          
          {icon && !showProgress && (
            <div className={`${colorClasses.accent} ${sizeClasses.iconSize} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
              {icon}
            </div>
          )}
        </div>

        {/* Main Value */}
        <div className="mb-4">
          <div className={`font-black tracking-tight text-gray-900 ${sizeClasses.valueSize} mb-1`}>
            {formatValue(value)}
          </div>
          {subtitle && (
            <p className={`text-gray-600 font-medium ${sizeClasses.subtitleSize}`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Progress Circle or Change Indicator */}
        <div className="flex items-center justify-between">
          {showProgress && target && (
            <CircularProgress
              value={typeof value === 'number' ? value : parseFloat(value.toString())}
              max={target}
              size="md"
              color={color === 'blue' ? 'blue' : color === 'green' ? 'green' : 'purple'}
              showValue={false}
            />
          )}
          
          {change !== undefined && (
            <div className={`
              inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border
              ${getChangeClasses()}
            `}>
              {getTrendIcon()}
              <span>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};