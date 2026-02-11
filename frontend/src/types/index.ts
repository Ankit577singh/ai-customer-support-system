export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  agentType?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  activeOrderId?: string;
  lastAgent?: string;
  messages: Message[];
}

export interface Agent {
  type: string;
  name: string;
  description: string;
  status: string;
}