
import React, { useState } from 'react';
import type { User } from '../types';
import ContactItem from './ContactItem';
import { SearchIcon } from './Icons';

interface SidebarProps {
  contacts: User[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ contacts, selectedContactId, onSelectContact }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Chats</h1>
        <div className="relative mt-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isSelected={contact.id === selectedContactId}
            onClick={() => onSelectContact(contact.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
