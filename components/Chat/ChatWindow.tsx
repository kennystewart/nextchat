import React from 'react';
import { Chat } from '../../context/ChatContext';
import ChatMessage from './ChatMessage';
import ChatMessageInput from './ChatMessageInput';
import { useSession } from 'next-auth/react';
interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (message: string) => void;
  onToggleLike: (messageId: number) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onSendMessage, onToggleLike }) => {
const { data: session } = useSession();

  return (
    <div className="flex flex-col h-full">
      <div className="h-full overflow-y-auto">
        {chat.messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.userId === session.user.email}
            onToggleLike={() => onToggleLike(message.id)}
          />
        ))}
      </div>
      <div className="mt-auto border-t p-2">
        <ChatMessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
