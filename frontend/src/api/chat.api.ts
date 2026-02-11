import axios from 'axios';
import type { Conversation, Agent } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const chatApi = {
  // Send message
  sendMessage: async (userId: string, conversationId: string, message: string) => {
    try {
      console.log('📡 API Request:', {
        url: `${API_BASE}/chat/messages`,
        payload: { userId, conversationId, message }
      });

      const { data } = await axios.post(`${API_BASE}/chat/messages`, {
        userId,
        conversationId,
        message,
      });

      console.log('📡 API Response:', data);
      return data;
    } catch (error: any) {
      console.error('📡 API Error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get all conversations
  getConversations: async (userId: string): Promise<Conversation[]> => {
    const { data } = await axios.get(`${API_BASE}/chat/conversations?userId=${userId}`);
    return data.conversations;
  },

  // Get single conversation
  getConversation: async (conversationId: string): Promise<Conversation> => {
    const { data } = await axios.get(`${API_BASE}/chat/conversations/${conversationId}`);
    return data.conversation;
  },

  // Delete conversation
  deleteConversation: async (conversationId: string) => {
    const { data } = await axios.delete(`${API_BASE}/chat/conversations/${conversationId}`);
    return data;
  },

  // Get agents
  getAgents: async (): Promise<Agent[]> => {
    const { data } = await axios.get(`${API_BASE}/agents`);
    return data.agents;
  },

  // Get agent capabilities
  getAgentCapabilities: async (agentType: string) => {
    const { data } = await axios.get(`${API_BASE}/agents/${agentType}/capabilities`);
    return data.agent;
  },
};
