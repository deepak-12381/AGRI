import React, { useState, useEffect } from 'react';
import { MapPin, Thermometer, Droplets, Wind, Leaf, TrendingUp, AlertTriangle, MessageCircle } from 'lucide-react';
import FarmMap from './FarmMap';
import SensorData from './SensorData';
import DiseaseDetection from './DiseaseDetection';
import FarmerGPT from './FarmerGPT';
import Alerts from './Alerts';
import MarketInsights from './MarketInsights';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sensorData, setSensorData] = useState({
    soilMoisture: 45,
    temperature: 28,
    humidity: 65,
    leafWetness: 12,
    ndvi: 0.72
  });

  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Disease Risk Detected',
      message: 'Field A2 shows early signs of leaf blight. Natural treatment recommended.',
      tamil: 'வயல் A2 இல் இலை நோய் அறிகுறிகள். இயற்கை சிகிச்சை பரிந்துரைக்கப்படுகிறது.',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'info',
      title: 'Irrigation Reminder',
      message: 'Field B1 soil moisture is low. Irrigation recommended within 2 hours.',
      tamil: 'வயல் B1 மண் ஈரப்பதம் குறைவு. 2 மணி நேரத்தில் நீர்ப்பாசனம் தேவை.',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    // Simulate real-time sensor updates
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 5)),
        temperature: Math.max(20, Math.min(40, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
        leafWetness: Math.max(0, Math.min(100, prev.leafWetness + (Math.random() - 0.5) * 5)),
        ndvi: Math.max(0.3, Math.min(0.9, prev.ndvi + (Math.random() - 0.5) * 0.02))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Field Map', icon: MapPin },
    { id: 'sensors', label: 'Sensor Data', icon: Thermometer },
    { id: 'disease', label: 'Disease Detection', icon: AlertTriangle },
    { id: 'gpt', label: 'AI Assistant', icon: MessageCircle },
    { id: 'market', label: 'Market News', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Farmer Assistant</h1>
                <p className="text-green-100 tamil-font">விவசாயி உதவி</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm">Farmer: Suriya</p>
                <p className="text-xs text-green-100">Location: Tiruttani, TN</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="tamil-font">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Soil Moisture</p>
                <p className="text-2xl font-bold text-blue-600">{sensorData.soilMoisture}%</p>
              </div>
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-orange-600">{sensorData.temperature}°C</p>
              </div>
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-teal-600">{sensorData.humidity}%</p>
              </div>
              <Wind className="h-8 w-8 text-teal-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Leaf Wetness</p>
                <p className="text-2xl font-bold text-green-600">{sensorData.leafWetness}%</p>
              </div>
              <Leaf className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">NDVI Index</p>
                <p className="text-2xl font-bold text-emerald-600">{sensorData.ndvi.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FarmMap />
              </div>
              <div>
                <Alerts alerts={alerts} />
              </div>
            </div>
          )}
          
          {activeTab === 'sensors' && <SensorData sensorData={sensorData} />}
          {activeTab === 'disease' && <DiseaseDetection />}
          {activeTab === 'gpt' && <FarmerGPT />}
          {activeTab === 'market' && <MarketInsights />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
