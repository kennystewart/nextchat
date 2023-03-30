import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import ChatList from '../components/Chat/ChatList';
import ChatWindow from '../components/Chat/ChatWindow';
import useChat from '../hooks/useChat';

const ChatPage: React.FC = () => {
  const {
    chats,
    selectedChatId,
    setChats,
    selectChat,
    // Add other actions from useChat hook
  } = useChat();

  // Fetch chats from the server
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chat/list');
        const fetchedChats = await response.json();
        setChats(fetchedChats);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    fetchChats();
  }, [setChats]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  // Implement sending message and toggling like functions here
  const handleSendMessage = (message: string) => {
    console.log('Send message:', message);
  };

  const handleToggleLike = (messageId: number) => {
    console.log('Toggle like for message id:', messageId);
  };

  return (
    <Layout title="Chat">
      <div className="grid grid-cols-4 h-screen">
        <div className="col-span-1">
          <ChatList chats={chats} selectedChatId={selectedChatId} onSelectChat={selectChat} />
        </div>
        <div className="col-span-3">
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              onSendMessage={handleSendMessage}
              onToggleLike={handleToggleLike}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl">Select a chat to start messaging</h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
