import { Plus, MessageSquare, Trash2, Clock, History, Sparkles, Search } from 'lucide-react';
import { useState } from 'react';
import type { Conversation } from '../../types';

interface SidebarProps {
  onNewChat: () => void;
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export default function Sidebar({
  onNewChat,
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const truncateText = (text: string, maxLength = 55) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    // (conv as any) used to bypass 'title' property check
    const title = (conv as any).title || '';
    const lastMessage = conv.messages[0]?.content || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <aside className="w-80 h-screen flex flex-col bg-white border-r border-gray-200">
      
      {/* Header */}
      <div className="flex-shrink-0 p-5 border-b border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-teal-600" strokeWidth={2} />
            <h2 className="font-semibold text-gray-900 text-lg">History</h2>
          </div>
          <div className="flex items-center justify-center px-2.5 py-1 bg-teal-50 rounded-full border border-teal-100">
            <span className="text-xs font-semibold text-teal-700">{conversations.length}</span>
          </div>
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Search Bar */}
      {conversations.length > 0 && (
        <div className="flex-shrink-0 px-5 py-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center h-full">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No results found' : 'No conversations yet'}
            </h3>
            <p className="text-sm text-gray-500 max-w-[200px]">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Start a new conversation to see it appear here'
              }
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filteredConversations.map((conv) => {
              const lastMessage = conv.messages[0];
              const isActive = conv.id === currentConversationId;

              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`group relative p-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-50 border-2 border-teal-200 shadow-sm'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-md' 
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <MessageSquare className={`w-5 h-5 ${
                        isActive ? 'text-white' : 'text-gray-600'
                      }`} strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`font-semibold text-sm truncate ${
                          isActive ? 'text-teal-900' : 'text-gray-900'
                        }`}>
                          {/* (conv as any).title fix applied here */}
                          {(conv as any).title || `Conversation ${conv.id.slice(0, 8)}`}
                        </h4>
                        <span className={`text-xs whitespace-nowrap flex-shrink-0 ${
                          isActive ? 'text-teal-600 font-medium' : 'text-gray-500'
                        }`}>
                          {lastMessage && formatTime(lastMessage.createdAt)}
                        </span>
                      </div>
                      
                      {lastMessage && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2.5">
                          {truncateText(lastMessage.content, 60)}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${
                          isActive 
                            ? 'bg-teal-100 text-teal-700 font-medium' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>{conv.messages.length} msgs</span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(conv.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete conversation"
                        >
                          <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-gradient-to-br from-teal-50/30 to-transparent p-4">
        <div className="flex flex-col items-center justify-center gap-1.5 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="font-medium text-gray-700">Powered by AI Hub</span>
          </div>
          <span className="text-xs text-gray-500">All conversations are encrypted</span>
        </div>
      </div>
    </aside>
  );
}