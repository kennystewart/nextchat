import { useChat } from '../context/ChatContext';

const useChats = () => {
  const [state, dispatch] = useChat();

  const selectChat = (chatId: number | null) => {
    dispatch({ type: 'SELECT_CHAT', payload: chatId });
  };

  return {
    chats: state.chats,
    selectedChatId: state.selectedChatId,
    selectChat,
  };
};

export default useChats;
