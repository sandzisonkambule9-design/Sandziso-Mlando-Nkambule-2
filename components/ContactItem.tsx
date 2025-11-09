
import React from 'react';
import type { User } from '../types';

interface ContactItemProps {
  contact: User;
  isSelected: boolean;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${
        isSelected
          ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <div className="relative">
        <img className="w-12 h-12 rounded-full object-cover" src={contact.avatarUrl} alt={contact.name} />
        {contact.online && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-800"></span>
        )}
      </div>
      <div className="flex-1 ml-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold">{contact.name}</h3>
          <p className={`text-xs ${isSelected ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
            {contact.lastMessageTime}
          </p>
        </div>
        <p className={`text-sm mt-1 truncate ${isSelected ? 'text-gray-100' : 'text-gray-600 dark:text-gray-300'}`}>
          {contact.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default ContactItem;
