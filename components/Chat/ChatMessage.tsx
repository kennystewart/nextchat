import React from 'react';
import { Message } from '../../context/ChatContext';
import UserIcon from '../UserIcon';
import LikeButton from '../LikeButton';
import { useSession } from 'next-auth/react';
interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
  onToggleLike: () => void;
}
const { data: session } = useSession();
const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage, onToggleLike }) => {
  const messageClass = isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900';

  return (
    <div className="flex items-start mb-4">
      <UserIcon image={message.userId} className="mr-2" />
      <div className={`rounded p-2 ${messageClass}`}>{message.content}</div>
      <LikeButton
        liked={message.liked}
        likeCount={message.likes.length}
        onToggleLike={onToggleLike}
      />
    </div>
  );
};

export default ChatMessage;
