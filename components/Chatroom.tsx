import { useState } from "react";
import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Chat } from "../../types/Chat";
import { Message } from "./Message";

type Props = {
  chat: Chat;
};

const prisma = new PrismaClient();

export const ChatRoom = ({ chat }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chat.messages);
  const [session] = useSession();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    const message = {
      content: inputValue,
      author: session.user.id,
      chat: {
        connect: {
          id: chat.id,
        },
      },
    };

    const newMessage = await prisma.message.create({ data: message });
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleChatClose = async () => {
    await prisma.chat.update({
      where: { id: chat.id },
      data: { isClosed: true },
    });
  };

  return (
    <div className="flex flex-col justify-between h-full p-4">
      <div>
        <h2 className="text-lg font-semibold">{chat.title}</h2>
        <button onClick={handleChatClose} className="text-gray-500">
          Close Chat
        </button>
      </div>
      <div className="flex flex-col-reverse mt-4 mb-auto space-y-2">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {!chat.isClosed && (
        <form onSubmit={handleFormSubmit} className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message here"
            className="flex-grow rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2 mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 rounded-md text-white px-4 py-2"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};
