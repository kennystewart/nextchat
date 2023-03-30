import React from 'react';
import { Chat } from '../../context/ChatContext';

interface ChatListItemProps {
  chat: Chat;
  selected: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, selected, onClick }) => {
  const bgColor = selected ? 'bg-gray-200 dark:bg-gray-700' : '';

  return (
    <div
      className={`p-4 border-b cursor-pointer ${bgColor} hover:bg-gray-100 dark:hover:bg-gray-600`}
      onClick={onClick}
    >
      <h2 className="font-semibold text-lg">{chat.title}</h2>
      {chat.disabled && (
        <span className="text-red-500 text-sm">This chat is currently disabled by a moderator</span>
      )}
    </div>
  );
};

export default ChatListItem;
