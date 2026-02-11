import { Bot, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MessageProps {
  role: 'user' | 'agent';
  content: string;
  agentType?: string;
  createdAt?: string;
  isLastMessage?: boolean;
}

export default function ChatMessage({ 
  role, 
  content, 
  agentType, 
  createdAt,
  isLastMessage = false 
}: MessageProps) {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).toLowerCase();
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fadeIn`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar - Only for AI */}
        {!isUser && (
          <div className="flex-shrink-0 self-start">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className="flex flex-col space-y-2">
          
          {/* Sender name and time - Only for AI */}
          {!isUser && (
            <div className="flex items-center gap-2 px-1">
              <span className="text-xs font-semibold text-gray-700">AI Assistant</span>
              {createdAt && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-400">{formatTime(createdAt)}</span>
                </>
              )}
            </div>
          )}

          {/* Message Bubble */}
          <div className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-br-md shadow-md'
              : 'bg-white text-gray-800 border border-gray-200 rounded-tl-md shadow-sm'
          }`}>
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {content}
            </p>
          </div>

          {/* Timestamp for user messages */}
          {isUser && (
            <div className="flex items-center justify-end gap-2 px-1">
              {createdAt ? (
                <span className="text-xs text-gray-400">{formatTime(createdAt)}</span>
              ) : (
                <span className="text-xs text-gray-400">Just now</span>
              )}
            </div>
          )}

          {/* Copy button for AI messages */}
          {!isUser && (
            <div className="flex items-start px-1">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}