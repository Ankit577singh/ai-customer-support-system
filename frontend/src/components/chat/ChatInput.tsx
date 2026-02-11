import { Send, Loader2, Paperclip, Smile } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <div className="border-t border-gray-100 bg-white px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          
          {/* Input Container - Perfectly Aligned */}
          <div className="flex items-end gap-2 bg-gray-50 rounded-3xl border-2 border-gray-200 focus-within:border-teal-400 focus-within:bg-white transition-all duration-200 p-2">
            
            {/* Attachment Button - Aligned */}
            <button
              type="button"
              className="flex-shrink-0 p-2.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={disabled}
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Text Input - Perfectly Centered */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent border-none resize-none outline-none text-gray-800 placeholder-gray-400 text-[15px] leading-relaxed py-2.5 px-2 disabled:opacity-50 max-h-32 overflow-y-auto"
              style={{
                minHeight: '28px',
              }}
            />

            {/* Emoji Button - Aligned */}
            <button
              type="button"
              className="flex-shrink-0 p-2.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={disabled}
              title="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Send Button - Perfectly Aligned */}
            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className="flex-shrink-0 p-3 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none group"
              title="Send message"
            >
              {disabled ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>

          {/* Helper Text - Centered */}
          <div className="mt-2 px-2 flex items-center justify-between text-xs text-gray-400">
            <span>Press Enter to send, Shift + Enter for new line</span>
            {input.length > 0 && (
              <span className={input.length > 500 ? 'text-amber-500 font-medium' : ''}>
                {input.length} / 1000
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}