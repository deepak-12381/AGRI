import React, { useState } from 'react';
import { MapPin, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface FieldZone {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  crop: string;
  coordinates: { x: number; y: number };
  health: number;
  issues?: string[];
}

const FarmMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<FieldZone | null>(null);
  
  const fieldZones: FieldZone[] = [
    {
      id: 'A1',
      name: 'Field A1 - North',
      status: 'healthy',
      crop: 'Rice (நெல்)',
      coordinates: { x: 20, y: 15 },
      health: 85,
      issues: []
    },
    {
      id: 'A2',
      name: 'Field A2 - Center',
      status: 'warning',
      crop: 'Rice (நெல்)',
      coordinates: { x: 45, y: 25 },
      health: 65,
      issues: ['Early leaf blight signs detected', 'Slightly low soil moisture']
    },
    {
      id: 'B1',
      name: 'Field B1 - South',
      status: 'critical',
      crop: 'Sugarcane (கரும்பு)',
      coordinates: { x: 70, y: 40 },
      health: 40,
      issues: ['Severe pest attack detected', 'Low NDVI values', 'Irrigation needed urgently']
    },
    {
      id: 'C1',
      name: 'Field C1 - East',
      status: 'healthy',
      crop: 'Tomato (தக்காளி)',
      coordinates: { x: 80, y: 20 },
      health: 90,
      issues: []
    },
    {
      id: 'D1',
      name: 'Field D1 - West',
      status: 'warning',
      crop: 'Cotton (பருத்தி)',
      coordinates: { x: 30, y: 60 },
      health: 70,
      issues: ['Moderate fungal risk', 'pH levels slightly high']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg card-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Farm Field Map</h2>
        <div className="text-sm text-gray-600 tamil-font">வயல் வரைபடம்</div>
      </div>
      
      <div className="relative">
        {/* Map Background */}
        <div 
          className="relative w-full h-96 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200 overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(21, 128, 61, 0.05) 100%)
            `
          }}
        >
          {/* Field Zones */}
          {fieldZones.map((zone) => (
            <div
              key={zone.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${zone.coordinates.x}%`,
                top: `${zone.coordinates.y}%`
              }}
              onClick={() => setSelectedZone(zone)}
            >
              <div className={`relative p-2 rounded-full ${getStatusColor(zone.status)} animate-pulse`}>
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-24 text-center text-xs font-medium border">
                {zone.id}
              </div>
            </div>
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
            <h3 className="text-sm font-medium mb-2">Field Status</h3>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Healthy</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Warning</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected Zone Details */}
        {selectedZone && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center space-x-2">
                {getStatusIcon(selectedZone.status)}
                <span>{selectedZone.name}</span>
              </h3>
              <button 
                onClick={() => setSelectedZone(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Crop:</strong> {selectedZone.crop}</p>
                <p><strong>Health Score:</strong> {selectedZone.health}%</p>
              </div>
              <div>
                <p><strong>Status:</strong> 
                  <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                    selectedZone.status === 'healthy' ? 'bg-green-100 text-green-800' :
                    selectedZone.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedZone.status.charAt(0).toUpperCase() + selectedZone.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>
            
            {selectedZone.issues && selectedZone.issues.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-sm mb-1">Issues Detected:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {selectedZone.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmMap;