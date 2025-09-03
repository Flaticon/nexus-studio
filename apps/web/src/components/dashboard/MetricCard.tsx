// apps/web/src/components/dashboard/MetricCard.tsx
import { FC } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  subtitle?: string;
}

export const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  subtitle
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
          {change !== undefined && (
            <div className={`mt-2 flex items-center ${getChangeColor()}`}>
              {change > 0 ? (
                <ArrowUpIcon className="h-4 w-4 mr-1" />
              ) : change < 0 ? (
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              ) : null}
              <span className="text-sm font-medium">
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 p-3 bg-blue-50 rounded-full">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};