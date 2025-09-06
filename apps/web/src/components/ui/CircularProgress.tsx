// apps/web/src/components/ui/CircularProgress.tsx
'use client';

import { FC } from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  showValue?: boolean;
  label?: string;
  className?: string;
}

export const CircularProgress: FC<CircularProgressProps> = ({
  value,
  max,
  size = 'md',
  color = 'blue',
  showValue = true,
  label,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const strokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
  const radius = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-emerald-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    red: 'text-red-500'
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background circle */}
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 50 50"
        >
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          
          {/* Progress circle */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClasses[color]} transition-all duration-700 ease-out`}
          />
        </svg>
        
        {/* Center text */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <span className="text-xs text-gray-600 font-medium text-center">
          {label}
        </span>
      )}
    </div>
  );
};