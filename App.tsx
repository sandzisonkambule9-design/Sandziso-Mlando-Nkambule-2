
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import type { User, Conversation, Message } from './types';

const MOCK_CONTACTS: User[] = [
  { id: '1', name: 'Alice', avatarUrl: 'https://picsum.photos/id/1011/200/200', lastMessage: 'Hey, how are you?', lastMessageTime: '10:30 AM', online: true },
  { id: '2', name: 'Bob', avatarUrl: 'https://picsum.photos/id/1012/200/200', lastMessage: 'Meeting at 3 PM.', lastMessageTime: '9:45 AM', online: false },
  { id: '3', name: 'Charlie', avatarUrl: 'https://picsum.photos/id/1025/200/200', lastMessage: 'Can you send the file?', lastMessageTime: 'Yesterday', online: true },
  { id: '4', name: 'Diana', avatarUrl: 'https://picsum.photos/id/1027/200/200', lastMessage: 'See you tomorrow!', lastMessageTime: 'Yesterday', online: false },
  { id: '5', name: 'Eve', avatarUrl: 'https://picsum.photos/id/10/200/200', lastMessage: 'Happy Birthday! 🎉', lastMessageTime: '3/15/24', online: true },
];

const MOCK_CONVERSATIONS: Conversation[] = [
  { contactId: '1', messages: [
      { id: 1, text: 'Hey, how are you?', timestamp: '10:30 AM', sender: 'other', status: 'read' },
      { id: 2, text: 'I am good, thanks! How about you?', timestamp: '10:31 AM', sender: 'me', status: 'read' },
  ]},
  { contactId: '2', messages: [
      { id: 1, text: 'Just a reminder about the meeting at 3 PM.', timestamp: '9:45 AM', sender: 'other', status: 'read' },
  ]},
  { contactId: '3', messages: [
    { id: 1, text: 'Hi, can you send the file we discussed?', timestamp: 'Yesterday', sender: 'other', status: 'read' },
    { id: 2, text: 'Sure, I will send it in a few minutes.', timestamp: 'Yesterday', sender: 'me', status: 'read' },
    { id: 3, text: 'Thanks!', timestamp: 'Yesterday', sender: 'other', status: 'read' },
  ]},
];

const App: React.FC = () => {
  const [contacts] = useState<User[]>(MOCK_CONTACTS);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const selectedContact = contacts.find(c => c.id === selectedContactId) || null;
  const selectedConversation = conversations.find(c => c.contactId === selectedContactId);

  useEffect(() => {
    // On mobile, if a contact is selected, we might want to hide the sidebar.
    // This logic is handled by CSS classes but could be extended here.
  }, [selectedContactId]);

  const handleSendMessage = (text: string) => {
    if (!selectedContactId) return;

    const newMessage: Message = {
      id: Date.now(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent',
    };

    setConversations(prev =>
      prev.map(convo =>
        convo.contactId === selectedContactId
          ? { ...convo, messages: [...convo.messages, newMessage] }
          : convo
      )
    );
    
    // Simulate a reply
    setTimeout(() => {
        const replyMessage: Message = {
            id: Date.now() + 1,
            text: `This is an automated reply to: "${text}"`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'other',
            status: 'read'
        };
        setConversations(prev =>
            prev.map(convo =>
                convo.contactId === selectedContactId
                    ? { ...convo, messages: [...convo.messages, replyMessage] }
                    : convo
            )
        );
    }, 1500);
  };
  
  const handleSelectContact = (id: string) => {
    setSelectedContactId(id);
    const conversationExists = conversations.some(c => c.contactId === id);
    if (!conversationExists) {
      setConversations(prev => [...prev, { contactId: id, messages: [] }]);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans antialiased text-gray-800 dark:text-gray-200">
      <div className={`w-full md:w-1/3 lg:w-1/4 transition-transform duration-300 ease-in-out ${selectedContactId ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
        <Sidebar 
          contacts={contacts} 
          selectedContactId={selectedContactId}
          onSelectContact={handleSelectContact}
        />
      </div>
      <div className={`absolute top-0 left-0 w-full h-full md:static md:w-2/3 lg:w-3/4 transition-transform duration-300 ease-in-out ${selectedContactId ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <ChatWindow
          contact={selectedContact}
          messages={selectedConversation?.messages || []}
          onSendMessage={handleSendMessage}
          onBack={() => setSelectedContactId(null)}
        />
      </div>
    </div>
  );
}

export default App;
