import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Mic, MicOff, Volume2, User, Bot } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  message: string;
  tamilMessage?: string;
  timestamp: Date;
  audioUrl?: string;
}

const FarmerGPT: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      message: 'Hello! I\'m your AI farming assistant. How can I help you today?',
      tamilMessage: 'வணக்கம்! நான் உங்கள் AI வேளாண்மை உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedResponses: { [key: string]: { english: string; tamil: string } } = {
    'leaf blight': {
      english: 'For leaf blight, I recommend: 1) Remove affected leaves immediately, 2) Apply neem oil spray (30ml per liter), 3) Ensure good air circulation, 4) Avoid overhead watering. Use jeevamrutham to boost plant immunity.',
      tamil: 'இலை கருக்கல் நோய்க்கு: 1) பாதிக்கப்பட்ட இலைகளை உடனே அகற்றவும், 2) வேப்ப எண்ணெய் தெளிப்பு (லிட்டருக்கு 30 மில்லி), 3) நல்ல காற்று சுழற்சி, 4) தலைக்கு மேல் தண்ணீர் ஊற்றாதீர்கள். ஜீவாமிர்தம் உபயோகித்து செடியின் நோய் எதிர்ப்பு சக்தியை அதிகரிக்கவும்.'
    },
    'pest control': {
      english: 'Natural pest control methods: 1) Neem oil spray (effective against most pests), 2) Marigold companion planting, 3) Encourage beneficial insects like ladybugs, 4) Use sticky traps for flying pests. For severe infestations, consider bio-pesticides like Spinosad.',
      tamil: 'இயற்கை பூச்சி கட்டுப்பாடு: 1) வேப்ப எண்ణெய் தெளிப்பு (பல பூச்சிகளுக்கு பலனளிக்கும்), 2) செம்பருத்தி செடிகளை நடவும், 3) நன்மை செய்யும் பூச்சிகளை ஊக்கப்படுத்தவும், 4) பறக்கும் பூச்சிகளுக்கு ஒட்டும் பொறிகளை பயன்படுத்தவும்.'
    },
    'irrigation': {
      english: 'Optimal irrigation tips: 1) Water early morning (6-8 AM) or evening (6-8 PM), 2) Check soil moisture 2-3 inches deep, 3) Use drip irrigation for efficiency, 4) Mulching helps retain moisture. Current sensor data shows your soil moisture is at good levels.',
      tamil: 'சிறந்த நீர்ப்பாசன வழிமுறைகள்: 1) அதிகாலை (காலை 6-8) அல்லது மாலை (6-8) தண்ணீர் ஊற்றவும், 2) 2-3 அங்குல ஆழத்தில் மண் ஈரப்பதத்தை சரிபார்க்கவும், 3) துளி நீர்ப்பாசனம் பயன்படுத்தவும், 4) மண் மூடுதல் ஈரப்பதத்தை தக்க வைக்க உதவும்.'
    },
    'fertilizer': {
      english: 'Organic fertilizer recommendations: 1) Vermicompost (2-3 kg per plant), 2) Cow dung compost, 3) Jeevamrutham weekly application, 4) Green manure from legume crops. For specific nutrients, use: Neem cake for nitrogen, bone meal for phosphorus.',
      tamil: 'இயற்கை உரப் பரிந்துரைகள்: 1) மண்புழு உரம் (செடிக்கு 2-3 கிலோ), 2) பசு மல உரம், 3) வாரம் ஒருமுறை ஜீவாமிர்தம், 4) பயறு வகை பயிர்களில் இருந்து பசுந்தாள் உரம். குறிப்பிட்ட சத்துக்களுக்கு: நைட்ரஜனுக்கு வேப்பம் பிண்ணாக்கு, பாஸ்பரஸுக்கு எலும்பு உரம்.'
    }
  };

  const generateResponse = (userMessage: string): { english: string; tamil: string } => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Default response
    return {
      english: 'I understand your concern. Based on your field data and local conditions in Thanjavur, I recommend consulting our disease detection results and sensor data for specific guidance. You can also try natural solutions like neem oil spray or jeevamrutham application.',
      tamil: 'உங்கள் கவலையை நான் புரிந்துகொள்கிறேன். தஞ்சாவூர் பகுதியின் உங்கள் வயல் தரவு மற்றும் உள்ளூர் நிலைமைகளின் அடிப்படையில், குறிப்பிட்ட வழிகாட்டுதலுக்காக எங்கள் நோய் கண்டறிதல் முடிவுகள் மற்றும் சென்சர் தரவை ஆலோசிக்க பரிந்துரைக்கிறேன்।'
    };
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        message: response.english,
        tamilMessage: response.tamil,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        setInputMessage('My rice plants have brown spots on leaves');
      }, 3000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const playAudio = (text: string) => {
    // Simulate text-to-speech
    console.log('Playing audio for:', text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-green-600" />
              <span>Farmer GPT Assistant</span>
            </h2>
            <p className="text-gray-600 tamil-font">விவசாயி GPT உதவியாளர்</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Available 24/7</p>
            <p className="text-xs text-green-600">Tamil & English Support</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 text-sm">Queries Answered</h3>
            <p className="text-xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 text-sm">Success Rate</h3>
            <p className="text-xl font-bold text-green-600">96%</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 text-sm">Languages</h3>
            <p className="text-xl font-bold text-purple-600">2</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-800 text-sm">Response Time</h3>
            <p className="text-xl font-bold text-orange-600">&lt;2s</p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg card-shadow flex flex-col h-96">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className={`rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  {message.tamilMessage && (
                    <div className="mt-2 pt-2 border-t border-gray-300 border-opacity-30">
                      <p className="text-xs tamil-font opacity-90">{message.tamilMessage}</p>
                    </div>
                  )}
                  {message.type === 'assistant' && (
                    <button
                      onClick={() => playAudio(message.tamilMessage || message.message)}
                      className="mt-2 flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800"
                    >
                      <Volume2 className="h-3 w-3" />
                      <span>Play Audio</span>
                    </button>
                  )}
                  <p className="text-xs opacity-75 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <button
              onClick={handleVoiceRecord}
              className={`p-2 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about diseases, pests, irrigation, fertilizers... (Tamil/English)"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === '' || isTyping}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            💡 Try asking: "How to treat leaf blight?", "Best irrigation time?", "Organic fertilizer advice"
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <p className="text-sm text-gray-600 tamil-font mb-4">விரைவு செயல்கள்</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setInputMessage('How to treat leaf blight disease?')}
            className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-sm">Disease Treatment</h4>
            <p className="text-xs text-gray-600 tamil-font">நோய் சிகிச்சை</p>
          </button>
          
          <button
            onClick={() => setInputMessage('Best time for irrigation today?')}
            className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-sm">Irrigation Advice</h4>
            <p className="text-xs text-gray-600 tamil-font">நீர்ப்பாசன ஆலோசனை</p>
          </button>
          
          <button
            onClick={() => setInputMessage('Organic fertilizer recommendations')}
            className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-sm">Fertilizer Help</h4>
            <p className="text-xs text-gray-600 tamil-font">உர உதவி</p>
          </button>
          
          <button
            onClick={() => setInputMessage('Natural pest control methods')}
            className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-sm">Pest Control</h4>
            <p className="text-xs text-gray-600 tamil-font">பூச்சி கட்டுப்பாடு</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerGPT;