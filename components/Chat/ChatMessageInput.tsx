import React, { useState } from 'react';
import EmojiPicker from '../EmojiPicker';

interface ChatMessageInputProps {
  onSendMessage: (message: string) => void;
}

const ChatMessageInput: React.FC<ChatMessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <form className="flex items-center space-x-2" onSubmit={handleSendMessage}>
      <button
        type="button"
        className="focus:outline-none"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <span role="img" aria-label="Emoji picker">
          😃
        </span>
      </button>
      
      <input
        type="text"
        className="flex-grow rounded border p-2"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!message.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default ChatMessageInput;
