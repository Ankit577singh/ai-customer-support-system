import { useRef, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import { useChat } from '../hooks/useChat';
import { Loader2 } from 'lucide-react';

export default function ChatPage() {
  const userId = 'user_1';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    conversations,
    currentConversationId,
    messages,
    isTyping,
    loading,
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
  } = useChat(userId);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // ✅ Auto-create conversation on first load if none exists
  useEffect(() => {
    if (!loading && !currentConversationId) {
      console.log('🆕 No conversation active, creating one...');
      createNewConversation();
    }
  }, [loading, currentConversationId]);

  const handleSend = (message: string) => {
    console.log('💬 User input:', message);
    sendMessage(message);
  };

  const handleQuickAction = (message: string) => {
    console.log('⚡ Quick action:', message);
    if (!currentConversationId) {
      createNewConversation();
      // Wait for state update
      setTimeout(() => sendMessage(message), 200);
    } else {
      sendMessage(message);
    }
  };

  return (
    <Layout
      onNewChat={createNewConversation}
      conversations={conversations}
      currentConversationId={currentConversationId}
      onSelectConversation={selectConversation}
      onDeleteConversation={deleteConversation}
    >
      {loading ? (
        // Loading State
        <div className="h-full flex flex-col items-center justify-center p-8">
          <div className="relative mb-6">
            <Loader2 className="w-16 h-16 text-teal-500 animate-spin" />
          </div>
          <h3 className="text-gray-700 text-lg font-semibold mb-2">Loading conversations...</h3>
          <p className="text-gray-500 text-sm">Please wait a moment</p>
        </div>
      ) : messages.length === 0 ? (
        <WelcomeScreen onQuickAction={handleQuickAction} />
      ) : (
        <div className="h-full flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} {...msg} />
              ))}

              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      )}
    </Layout>
  );
}