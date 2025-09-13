import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, MapPin, Award } from 'lucide-react';

interface MarketPrice {
  crop: string;
  tamilName: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  market: string;
  lastUpdated: Date;
}

interface GovernmentScheme {
  id: string;
  title: string;
  tamilTitle: string;
  description: string;
  tamilDescription: string;
  eligibility: string[];
  amount: string;
  deadline: Date;
  status: 'active' | 'closing_soon' | 'closed';
}

const MarketInsights: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');

  const marketPrices: MarketPrice[] = [
    {
      crop: 'Rice',
      tamilName: 'அரிசி',
      currentPrice: 2850,
      previousPrice: 2750,
      trend: 'up',
      market: 'Thanjavur Mandi',
      lastUpdated: new Date()
    },
    {
      crop: 'Sugarcane',
      tamilName: 'கரும்பு',
      currentPrice: 3200,
      previousPrice: 3250,
      trend: 'down',
      market: 'Local Sugar Mill',
      lastUpdated: new Date()
    },
    {
      crop: 'Tomato',
      tamilName: 'தக்காளி',
      currentPrice: 4500,
      previousPrice: 4200,
      trend: 'up',
      market: 'Koyambedu Market',
      lastUpdated: new Date()
    },
    {
      crop: 'Cotton',
      tamilName: 'பருத்தி',
      currentPrice: 6800,
      previousPrice: 6800,
      trend: 'stable',
      market: 'CCI Center',
      lastUpdated: new Date()
    }
  ];

  const governmentSchemes: GovernmentScheme[] = [
    {
      id: '1',
      title: 'PM-KISAN Scheme',
      tamilTitle: 'பிரதமர் கிசான் திட்டம்',
      description: 'Direct income support of ₹6000 per year to small and marginal farmers',
      tamilDescription: 'சிறு மற்றும் குறு விவசாயிகளுக்கு ஆண்டுக்கு ₹6000 நேரடி வருமான ஆதரவு',
      eligibility: ['Small and marginal farmers', 'Land ownership documents required', 'Aadhaar card mandatory'],
      amount: '₹2000 x 3 installments',
      deadline: new Date('2024-03-31'),
      status: 'active'
    },
    {
      id: '2',
      title: 'Crop Insurance Scheme',
      tamilTitle: 'பயிர் காப்பீட்டு திட்டம்',
      description: 'Insurance coverage for crop losses due to natural calamities',
      tamilDescription: 'இயற்கை பேரழிவுகளால் பயிர் இழப்புகளுக்கு காப்பீட்டு பாதுகாப்பு',
      eligibility: ['All farmers', 'Premium payment required', 'Crop cutting experiments participation'],
      amount: 'Up to ₹200000 per hectare',
      deadline: new Date('2024-02-15'),
      status: 'closing_soon'
    },
    {
      id: '3',
      title: 'Soil Health Card Scheme',
      tamilTitle: 'மண் ஆரோக்கிய அட்டை திட்டம்',
      description: 'Free soil testing and nutrient recommendations',
      tamilDescription: 'இலவச மண் பரிசோதனை மற்றும் ஊட்டச்சத்து பரிந்துரைகள்',
      eligibility: ['All farmers with agricultural land', 'Village-level implementation'],
      amount: 'Free service',
      deadline: new Date('2024-06-30'),
      status: 'active'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 text-gray-600">—</div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSchemeStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'closing_soon': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Prices */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Market Prices</h2>
            <p className="text-gray-600 tamil-font">சந்தை விலைகள்</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketPrices.map((price, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{price.crop}</h3>
                  <p className="text-sm text-gray-600 tamil-font">{price.tamilName}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(price.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                    ₹{Math.abs(price.currentPrice - price.previousPrice)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-2xl font-bold">₹{price.currentPrice}</p>
                  <p className="text-xs text-gray-500">per quintal</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Previous: ₹{price.previousPrice}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{price.market}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Harvest Timing & Recommendations */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-xl font-bold mb-4">Harvest Timing & Market Strategy</h2>
        <p className="text-gray-600 tamil-font mb-4">அறுவடை நேரம் மற்றும் சந்தை வியூகம்</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Optimal Harvest Windows</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Rice (Field A1, A2):</span>
                  <span className="font-medium">15-20 Feb 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Sugarcane (Field B1):</span>
                  <span className="font-medium">Mar-Apr 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Tomato (Field C1):</span>
                  <span className="font-medium">5-10 Feb 2024</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Price Predictions</h3>
              <p className="text-sm text-blue-700">
                Rice prices expected to rise 8-12% next month due to festival demand.
                Consider delaying harvest by 1-2 weeks if storage facilities are available.
              </p>
              <p className="text-xs text-blue-600 tamil-font mt-2">
                பண்டிகை தேவை காரணமாக அரிசி விலை அடுத்த மாதம் 8-12% உயரும் என எதிர்பார்க்கப்படுகிறது.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Storage Recommendations</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Ensure 12-14% moisture content before storage</li>
                <li>• Use proper ventilation to prevent fungal growth</li>
                <li>• Consider community storage for better prices</li>
              </ul>
              <p className="text-xs text-yellow-600 tamil-font mt-2">
                சேமிப்பிற்கு முன் 12-14% ஈரப்பதம் உறுதி செய்யவும்.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Marketing Tips</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Compare prices across 3-4 markets</li>
                <li>• Use FPO channels for better rates</li>
                <li>• Avoid distress selling during peak harvest</li>
              </ul>
              <p className="text-xs text-purple-600 tamil-font mt-2">
                3-4 சந்தைகளில் விலைகளை ஒப்பிட்டு பார்க்கவும்.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Government Schemes */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Government Schemes & Subsidies</h2>
            <p className="text-gray-600 tamil-font">அரசு திட்டங்கள் மற்றும் மானியங்கள்</p>
          </div>
          <Award className="h-6 w-6 text-amber-500" />
        </div>

        <div className="space-y-4">
          {governmentSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{scheme.title}</h3>
                  <p className="text-sm text-gray-600 tamil-font">{scheme.tamilTitle}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSchemeStatusStyle(scheme.status)}`}>
                    {scheme.status === 'active' ? 'Active' : 
                     scheme.status === 'closing_soon' ? 'Closing Soon' : 'Closed'}
                  </span>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-2">{scheme.description}</p>
              <p className="text-xs text-gray-600 tamil-font mb-3">{scheme.tamilDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Eligibility:</h4>
                  <ul className="text-gray-600 space-y-1">
                    {scheme.eligibility.slice(0, 2).map((req, idx) => (
                      <li key={idx}>• {req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Amount:</h4>
                  <p className="text-green-600 font-semibold">{scheme.amount}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Deadline:</h4>
                  <p className="text-red-600">{scheme.deadline.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Apply Online
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm">
                  Download Form
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;