// apps/web/src/components/dashboard/AlertsPanel.tsx
import { FC } from 'react';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  X 
} from 'lucide-react';
import { Alert } from '@/types/dashboard';
import { useDismissAlert } from '@/lib/hooks/useDashboard';

interface AlertsPanelProps {
  alerts: Alert[];
}

export const AlertsPanel: FC<AlertsPanelProps> = ({ alerts }) => {
  const dismissMutation = useDismissAlert();

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getAlertBg = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Alerts & Notifications
        </h3>
        
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <p className="text-gray-500 text-sm">No active alerts</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertBg(alert.type)}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {alert.message}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissMutation.mutate(alert.id)}
                    className="ml-3 flex-shrink-0"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};