import { Bot, Sparkles, Zap, Shield, Clock } from 'lucide-react';

interface WelcomeScreenProps {
  onQuickAction: (message: string) => void;
}

export default function WelcomeScreen({ onQuickAction }: WelcomeScreenProps) {
  const quickPrompts = [
    "Where is my order?",
    "Check my refund status",
    "I need help with billing",
    "Track my delivery"
  ];

 

  return (
    <div className="h-full flex items-center justify-center p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-3xl mx-auto">
        
        {/* Main Content Container - Perfectly Centered */}
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Logo Section - Perfectly Centered */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-2 shadow-2xl">
              <Bot className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Welcome Text - Perfectly Centered */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                Welcome to AI Hub
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Your intelligent assistant for orders, billing, and support
            </p>
          </div>

        

          {/* Divider */}
          <div className="w-full max-w-md mx-auto border-t border-gray-200"></div>

          {/* Try Asking Section - Perfectly Centered */}
          <div className="w-full space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span className="font-medium">Try asking something like...</span>
            </div>

            {/* Quick Prompts Grid - Perfectly Aligned & Centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => onQuickAction(prompt)}
                  className="group flex items-center gap-3 px-5 py-4 bg-white rounded-xl border-2 border-gray-100 hover:border-teal-200 text-left transition-all duration-300 hover:shadow-lg hover:shadow-teal-100/50 hover:-translate-y-0.5"
                >
                  {/* Icon Container */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                  </div>
                  
                  {/* Text */}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700 transition-colors flex-1">
                    {prompt}
                  </span>
                  
                  {/* Arrow Icon */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Hint - Perfectly Centered */}
          <div className="pt-4">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
              Type your message below to get started
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}