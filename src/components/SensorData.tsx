import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SensorDataProps {
  sensorData: {
    soilMoisture: number;
    temperature: number;
    humidity: number;
    leafWetness: number;
    ndvi: number;
  };
}

const SensorData: React.FC<SensorDataProps> = ({ sensorData }) => {
  const generateChartData = (value: number, variation: number = 5) => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: Math.max(
        0,
        Math.min(
          100,
          value + Math.sin(i * 0.5) * variation + (Math.random() - 0.5) * 2
        )
      ),
    }));
  };

  const soilData = generateChartData(sensorData.soilMoisture, 8);
  const tempData = generateChartData(sensorData.temperature, 6);
  const humidityData = generateChartData(sensorData.humidity, 10);

  const getTrend = (data: Array<{ hour: number; value: number }>) => {
    const recent = data.slice(-6);
    const first = recent[0].value;
    const last = recent[recent.length - 1].value;
    const diff = last - first;

    if (Math.abs(diff) < 2)
      return { icon: Minus, color: 'text-gray-500', text: 'Stable' };
    return diff > 0
      ? { icon: TrendingUp, color: 'text-green-500', text: 'Rising' }
      : { icon: TrendingDown, color: 'text-red-500', text: 'Falling' };
  };

  const SimpleChart: React.FC<{
    data: Array<{ hour: number; value: number }>;
    color: string;
    label: string;
    unit: string;
    tamilLabel: string;
  }> = ({ data, color, label, unit, tamilLabel }) => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;

    const trend = getTrend(data);
    const TrendIcon = trend.icon;

    return (
      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-sm text-gray-600 tamil-font">{tamilLabel}</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendIcon className={`h-4 w-4 ${trend.color}`} />
            <span className={`text-sm ${trend.color}`}>{trend.text}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-end space-x-1 h-32">
            {data.slice(-12).map((point, index) => (
              <div
                key={index}
                className="flex-1 bg-gray-200 rounded-t relative group"
                style={{
                  height: `${((point.value - minValue) / range) * 100}%`,
                  minHeight: '8px',
                }}
              >
                <div
                  className={`absolute bottom-0 left-0 right-0 rounded-t transition-all duration-300 ${color}`}
                  style={{
                    height: `${((point.value - minValue) / range) * 100}%`,
                    minHeight: '8px',
                  }}
                ></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {point.value.toFixed(2)}{unit}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>12h ago</span>
            <span>6h ago</span>
            <span>Now</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-xs text-gray-600">Min</p>
            <p className="font-semibold">{minValue.toFixed(2)}{unit}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Current</p>
            <p className="text-xl font-bold text-blue-600">
              {data[data.length - 1].value.toFixed(2)}{unit}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Max</p>
            <p className="font-semibold">{maxValue.toFixed(2)}{unit}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-xl font-bold mb-4">Real-time Sensor Monitoring</h2>
        <p className="text-gray-600 tamil-font mb-6">நேரடி சென்சர் கண்காணிப்பு</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Data Collection Points</h3>
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-blue-600">Active sensors across farm</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">Update Frequency</h3>
            <p className="text-2xl font-bold text-green-600">5 min</p>
            <p className="text-sm text-green-600">Real-time monitoring</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800">Data Accuracy</h3>
            <p className="text-2xl font-bold text-purple-600">98.50%</p>
            <p className="text-sm text-purple-600">Calibrated sensors</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          data={soilData}
          color="bg-blue-500"
          label="Soil Moisture"
          unit="%"
          tamilLabel="மண் ஈரப்பதம்"
        />

        <SimpleChart
          data={tempData}
          color="bg-orange-500"
          label="Temperature"
          unit="°C"
          tamilLabel="வெப்பநிலை"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          data={humidityData}
          color="bg-teal-500"
          label="Humidity"
          unit="%"
          tamilLabel="ஈரப்பதம்"
        />

        <div className="bg-white rounded-lg p-6 card-shadow">
          <h3 className="text-lg font-semibold mb-4">NDVI Analysis</h3>
          <p className="text-sm text-gray-600 tamil-font mb-4">தாவர ஆரோக்கிய குறியீடு</p>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Current NDVI</span>
              <span className="text-2xl font-bold text-green-600">
                {sensorData.ndvi.toFixed(2)}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(sensorData.ndvi / 1.0) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="w-3 h-3 bg-red-500 rounded mx-auto mb-1"></div>
                <span>Poor (0.0-0.3)</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mx-auto mb-1"></div>
                <span>Moderate (0.3-0.6)</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded mx-auto mb-1"></div>
                <span>Healthy (0.6-1.0)</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Assessment:</strong> Your crops show good vegetation health.
                NDVI values above 0.7 indicate healthy, dense vegetation.
              </p>
              <p className="text-sm text-green-700 tamil-font mt-1">
                உங்கள் பயிர்கள் நல்ல ஆரோக்கியத்தில் உள்ளன.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorData;
