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
      case 'positive': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
    <div className="bg-white rounded-xl card-shadow hover:card-shadow-hover transition-all duration-200 p-6 border border-gray-100 hover:border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium text-gray-600 text-balance">{title}</h3>
            {getTrendIcon() && (
              <div className="text-gray-400">
                {getTrendIcon()}
              </div>
            )}
          </div>
          
          <div className="mb-3">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">
              {formatValue(value)}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1 font-medium">{subtitle}</p>
            )}
          </div>
          
          {change !== undefined && (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getChangeColor()}`}>
              {change > 0 ? (
                <ArrowUpIcon className="h-3 w-3" />
              ) : change < 0 ? (
                <ArrowDownIcon className="h-3 w-3" />
              ) : null}
              <span>
                {change > 0 ? '+' : ''}{Math.abs(change)}%
              </span>
              <span className="text-xs opacity-75">vs anterior</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="ml-4 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-100">
            <div className="text-blue-600">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};