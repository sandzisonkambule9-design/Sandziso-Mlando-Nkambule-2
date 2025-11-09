
import React, { useState, useRef, useEffect } from 'react';
import type { User, Message } from '../types';
import MessageBubble from './MessageBubble';
import { SendIcon, ArrowLeftIcon, MenuIcon } from './Icons';

interface ChatWindowProps {
  contact: User | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, onSendMessage, onBack }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  if (!contact) {
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        <div className="text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2 className="mt-2 text-xl font-medium">Select a chat to start messaging</h2>
            <p className="mt-1 text-sm">Your chats will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10 shadow-sm">
        <button onClick={onBack} className="md:hidden mr-3 text-gray-600 dark:text-gray-300">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <img className="w-10 h-10 rounded-full object-cover" src={contact.avatarUrl} alt={contact.name} />
        <div className="ml-4 flex-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{contact.name}</h2>
          <p className="text-sm text-green-500 dark:text-green-400">{contact.online ? 'Online' : 'Offline'}</p>
        </div>
        <button className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400">
            <MenuIcon className="h-6 w-6" />
        </button>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1200/800?blur=2')" }}>
        <div className="backdrop-blur-sm bg-black/10 p-4 rounded-lg">
            {messages.map(msg => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-3 p-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800 transition-transform duration-200 transform hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!inputText.trim()}
          >
            <SendIcon className="h-6 w-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatWindow;
