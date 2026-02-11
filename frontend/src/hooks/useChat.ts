import { useState, useEffect } from 'react';
import { chatApi } from '../api/chat.api';
import type { Conversation, Message } from '../types';  // ← Add 'type' keyword

export function useChat(userId: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  // Load conversation messages when switching
  useEffect(() => {
    if (currentConversationId) {
      loadConversationMessages(currentConversationId);
    }
  }, [currentConversationId]);

  // Load all conversations
  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await chatApi.getConversations(userId);
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load messages for a specific conversation
  const loadConversationMessages = async (conversationId: string) => {
    try {
      const conversation = await chatApi.getConversation(conversationId);
      setMessages(conversation.messages);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]);
    }
  };

  // Send a message
  const sendMessage = async (content: string) => {
    if (!currentConversationId) {
      console.error('No active conversation');
      return;
    }

    // Optimistically add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await chatApi.sendMessage(userId, currentConversationId, content);

      // Add agent response
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response.reply,
        agentType: 'AI',
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, agentMessage]);

      // Refresh conversations list
      loadConversations();
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: 'Sorry, something went wrong. Please try again.',
        agentType: 'ERROR',
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Create new conversation
  const createNewConversation = () => {
    const newId = `conv_${Date.now()}`;
    setCurrentConversationId(newId);
    setMessages([]);
  };

  // Select conversation
  const selectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  // Delete conversation
  const deleteConversation = async (conversationId: string) => {
    try {
      await chatApi.deleteConversation(conversationId);
      
      // Remove from list
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));

      // If current conversation was deleted, clear messages
      if (conversationId === currentConversationId) {
        setCurrentConversationId('');
        setMessages([]);
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  return {
    conversations,
    currentConversationId,
    messages,
    isTyping,
    loading,
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
  };
}