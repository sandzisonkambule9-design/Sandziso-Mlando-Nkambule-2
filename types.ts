
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  online: boolean;
}

export interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'me' | 'other';
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  contactId: string;
  messages: Message[];
}
