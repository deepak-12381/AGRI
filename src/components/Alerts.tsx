import React from 'react';
import { AlertTriangle, Info, CheckCircle, Clock, X } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  tamil: string;
  timestamp: Date;
}

interface AlertsProps {
  alerts: Alert[];
}

const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Info className="h-4 w-4 text-blue-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <X className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Active Alerts</h2>
        <div className="text-sm text-gray-600 tamil-font">செயல்படும் எச்சரிக்கைகள்</div>
      </div>
      
      <div className="space-y-3">
        {alerts.length > 0 ? alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getAlertStyle(alert.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{alert.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                <p className="text-xs text-gray-600 tamil-font mt-2">{alert.tamil}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{alert.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
            <p className="text-sm tamil-font">எந்த எச்சரிக்கையும் இல்லை</p>
          </div>
        )}
      </div>
      
      {/* SMS/Offline Support */}
      <div className="mt-6 pt-4 border-t">
        <h3 className="font-semibold text-sm mb-2">Offline Support</h3>
        <p className="text-xs text-gray-600 tamil-font mb-2">ஆஃப்லைன் ஆதரவு</p>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            SMS alerts active for critical issues. Emergency number: <strong>+91-9876543210</strong>
          </p>
          <p className="text-xs text-gray-600 tamil-font mt-1">
            முக்கியமான பிரச்சினைகளுக்கு SMS எச்சரிக்கைகள் செயல்படும்.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alerts;