import React, { createContext, useReducer, Dispatch, useContext } from 'react';
export type Like = {
    id: string;
    userId: string;
    messageId: string;
    createdAt: Date;
    updatedAt: Date;
  };
export type Message = {
    id: number;
    content: string;
    author: string;
    userId: string;
    chatId: string;
    createdAt: Date;
    updatedAt: Date;
    liked: boolean;
    likes: Like[],
  };

export type Chat = {
  id: number;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  disabled: number;
  messages: Message[];
};

type ChatState = {
  chats: Chat[];
  selectedChatId: number | null;
};

type ChatAction =
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'REMOVE_CHAT'; payload: number }
  | { type: 'EDIT_CHAT'; payload: Chat }
  | { type: 'SELECT_CHAT'; payload: number | null };

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_CHAT':
      return { ...state, chats: [...state.chats, action.payload] };
    case 'REMOVE_CHAT':
      return { ...state, chats: state.chats.filter((chat) => chat.id !== action.payload) };
    case 'EDIT_CHAT':
      return {
        ...state,
        chats: state.chats.map((chat) => (chat.id === action.payload.id ? action.payload : chat)),
      };
    case 'SELECT_CHAT':
      return { ...state, selectedChatId: action.payload };
    default:
      return state;
  }
};

type ChatProviderProps = {
  children: React.ReactNode;
};

export const ChatContext = createContext<[ChatState, Dispatch<ChatAction>]>([initialState, () => {}]);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={[state, dispatch]}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): [ChatState, Dispatch<ChatAction>] => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
