import React, { useState } from 'react';
import { Camera, AlertTriangle, CheckCircle, Eye, Download, RefreshCw } from 'lucide-react';

interface DetectionResult {
  id: string;
  fieldId: string;
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  tamilName: string;
  tamilDescription: string;
  recommendations: string[];
  tamilRecommendations: string[];
  imageUrl: string;
  coordinates: { lat: number; lng: number };
  timestamp: Date;
}

const DiseaseDetection: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedResult, setSelectedResult] = useState<DetectionResult | null>(null);

  const detectionResults: DetectionResult[] = [
    {
      id: '1',
      fieldId: 'A2',
      diseaseName: 'Leaf Blight',
      confidence: 87,
      severity: 'Medium',
      description: 'Brown spots with yellow halos detected on rice leaves. Early stage infection.',
      tamilName: 'இலை கருக்கல் நோய்',
      tamilDescription: 'அரிசி இலைகளில் மஞ்சள் வளையத்துடன் பழுப்பு புள்ளிகள் கண்டறியப்பட்டன.',
      recommendations: [
        'Apply neem oil spray (30ml per liter of water)',
        'Remove affected leaves and burn them safely',
        'Improve air circulation around plants',
        'Reduce overhead watering'
      ],
      tamilRecommendations: [
        'வேப்ப எண்ணெய் தெளிப்பு (ஒரு லிட்டர் தண்ணீருக்கு 30 மில்லி)',
        'பாதிக்கப்பட்ட இலைகளை அகற்றி பாதுகாப்பாக எரிக்கவும்',
        'செடிகளுக்கு இடையே காற்று சுழற்சியை மேம்படுத்தவும்',
        'தலைக்கு மேல் நீர் பாய்ச்சுவதை குறைக்கவும்'
      ],
      imageUrl: 'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=300',
      coordinates: { lat: 11.0168, lng: 76.9558 },
      timestamp: new Date('2024-01-15T09:30:00')
    },
    {
      id: '2',
      fieldId: 'B1',
      diseaseName: 'Stem Borer Attack',
      confidence: 94,
      severity: 'High',
      description: 'Severe pest infestation detected in sugarcane field. Multiple entry holes visible.',
      tamilName: 'தண்டு துளைப்பான் தாக்குதல்',
      tamilDescription: 'கரும்பு வயலில் கடுமையான பூச்சி தாக்குதல் கண்டறியப்பட்டது.',
      recommendations: [
        'URGENT: Apply biological control - Release Trichogramma wasps',
        'Use pheromone traps to monitor pest population',
        'Apply jeevamrutham to strengthen plant immunity',
        'If severe: Apply approved bio-pesticide (Spinosad)'
      ],
      tamilRecommendations: [
        'அவசரம்: உயிரியல் கட்டுப்பாடு - ட்ரைக்கோகிராமா குளவிகளை விடவும்',
        'பூச்சிகளின் எண்ணிக்கையை கண்காணிக்க பெரோமோன் பொறிகளை பயன்படுத்தவும்',
        'செடியின் நோய் எதிர்ப்பு சக்தியை அதிகரிக்க ஜீவாமிர்தம் தெளிக்கவும்',
        'கடுமையானால்: அங்கீகரிக்கப்பட்ட உயிர் பூச்சிக்கொல்லி பயன்படுத்தவும்'
      ],
      imageUrl: 'https://images.pexels.com/photos/1468370/pexels-photo-1468370.jpeg?auto=compress&cs=tinysrgb&w=300',
      coordinates: { lat: 11.0170, lng: 76.9560 },
      timestamp: new Date('2024-01-15T11:15:00')
    },
    {
      id: '3',
      fieldId: 'C1',
      diseaseName: 'Healthy Crop',
      confidence: 96,
      severity: 'Low',
      description: 'No diseases or pests detected. Crops showing excellent health indicators.',
      tamilName: 'ஆரோக்கியமான பயிர்',
      tamilDescription: 'எந்த நோய் அல்லது பூச்சிகளும் கண்டறியப்படவில்லை.',
      recommendations: [
        'Continue current management practices',
        'Regular monitoring recommended',
        'Maintain optimal irrigation schedule'
      ],
      tamilRecommendations: [
        'தற்போதைய பராமரிப்பு முறைகளை தொடரவும்',
        'வழக்கமான கண்காணிப்பு பரிந்துரைக்கப்படுகிறது',
        'சிறந்த நீர்ப்பாசன அட்டவணையை பராமரிக்கவும்'
      ],
      imageUrl: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=300',
      coordinates: { lat: 11.0165, lng: 76.9565 },
      timestamp: new Date('2024-01-15T08:45:00')
    }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Low': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Medium': case 'High': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">AI Disease Detection</h2>
            <p className="text-gray-600 tamil-font">AI நோய் கண்டறிதல்</p>
          </div>
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isScanning ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
            <span>{isScanning ? 'Scanning...' : 'New Scan'}</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Images Processed</h3>
            <p className="text-2xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-blue-600">This month</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">Detection Accuracy</h3>
            <p className="text-2xl font-bold text-green-600">94.2%</p>
            <p className="text-sm text-green-600">AI Model v2.1</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800">Early Detections</h3>
            <p className="text-2xl font-bold text-yellow-600">23</p>
            <p className="text-sm text-yellow-600">Prevented outbreaks</p>
          </div>
        </div>
      </div>

      {/* Detection Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 card-shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Detection Results</h3>
          
          <div className="space-y-4">
            {detectionResults.map((result) => (
              <div
                key={result.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedResult(result)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(result.severity)}
                    <h4 className="font-medium">{result.diseaseName}</h4>
                    <span className="text-sm text-gray-600 tamil-font">({result.tamilName})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(result.severity)}`}>
                      {result.severity}
                    </span>
                    <span className="text-xs text-gray-500">Field {result.fieldId}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{result.description}</p>
                    <p className="text-xs text-gray-500 tamil-font mt-1">{result.tamilDescription}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{result.confidence}% confident</p>
                    <p className="text-xs text-gray-500">{result.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Selected Result Details */}
        <div className="bg-white rounded-lg p-6 card-shadow">
          {selectedResult ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Detection Details</h3>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedResult.imageUrl}
                    alt="Detection result"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  <div className="space-y-3">
                    {selectedResult.recommendations.map((rec, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-3">
                        <p className="text-sm">{rec}</p>
                        <p className="text-xs text-gray-600 tamil-font mt-1">
                          {selectedResult.tamilRecommendations[index]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
                    <Eye className="h-4 w-4" />
                    <span>View on Map</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm">
                    <Download className="h-4 w-4" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a detection result to view details</p>
              <p className="text-sm tamil-font mt-1">விவரங்களைக் காண ஒரு முடிவைத் தேர்ந்தெடுக்கவும்</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;