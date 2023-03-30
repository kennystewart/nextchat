
export type User = {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type Chat = {
    id: string;
    title: string;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type UserChat = {
    userId: string;
    chatId: string;
  };
  
  export type Message = {
    id: string;
    content: string;
    html: boolean;
    authorId: string;
    chatId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type MessageLike = {
    userId: string;
    messageId: string;
  };