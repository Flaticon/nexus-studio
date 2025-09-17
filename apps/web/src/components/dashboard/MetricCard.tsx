// apps/web/src/components/dashboard/MetricCard.tsx
import { FC } from 'react';
import { ArrowUpIcon, ArrowDownIcon, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  format?: 'currency' | 'percentage' | 'number';
}

export const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  subtitle,
  trend = 'stable',
  format = 'number'
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-emerald-700 bg-emerald-50';
      case 'negative': return 'text-red-700 bg-red-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3" />;
    if (trend === 'down') return <TrendingUp className="h-3 w-3 rotate-180" />;
    return null;
  };

  const formatValue = (val: string | number) => {
    if (format === 'currency' && typeof val === 'number') {
      return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(val);
    }
    if (format === 'percentage' && typeof val === 'number') {
      return `${val}%`;
    }
    return val;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-150 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-normal text-gray-600">{title}</h3>
            {getTrendIcon() && (
              <div className="text-gray-400">
                {getTrendIcon()}
              </div>
            )}
          </div>

          <div className="mb-3">
            <p className="text-2xl font-semibold text-gray-900">
              {formatValue(value)}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>

          {change !== undefined && (
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs ${getChangeColor()}`}>
              {change > 0 ? (
                <ArrowUpIcon className="h-3 w-3" />
              ) : change < 0 ? (
                <ArrowDownIcon className="h-3 w-3" />
              ) : null}
              <span>
                {change > 0 ? '+' : ''}{Math.abs(change)}%
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className="ml-4 p-2 bg-gray-50 rounded-lg">
            <div className="text-gray-600">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};