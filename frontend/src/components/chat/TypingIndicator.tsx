import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6 animate-fadeIn">
      <div className="flex gap-3 max-w-[80%]">
        
        {/* Avatar */}
        <div className="flex-shrink-0 self-start">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Typing Content */}
        <div className="flex flex-col space-y-2">
          {/* Sender name */}
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs font-semibold text-gray-700">AI Assistant</span>
          </div>

          {/* Typing Bubble */}
          <div className="inline-flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-200 rounded-2xl rounded-tl-md shadow-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-teal-500 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-teal-500 rounded-full typing-dot" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-teal-500 rounded-full typing-dot" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-gray-500">typing...</span>
          </div>
        </div>
      </div>
    </div>
  );
}