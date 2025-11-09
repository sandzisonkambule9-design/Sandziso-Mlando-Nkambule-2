
import React from 'react';
import type { Message } from '../types';
import { CheckIcon, DoubleCheckIcon } from './Icons';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isMe = message.sender === 'me';

  const MessageStatus = () => {
    if (!isMe) return null;
    if (message.status === 'read') return <DoubleCheckIcon className="h-4 w-4 text-blue-500" />;
    if (message.status === 'delivered') return <DoubleCheckIcon className="h-4 w-4 text-gray-400" />;
    return <CheckIcon className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow-md ${
          isMe
            ? 'bg-emerald-500 dark:bg-emerald-600 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className="flex items-center justify-end mt-1">
          <span className="text-xs text-right opacity-70 mr-2">{message.timestamp}</span>
          <MessageStatus />
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
