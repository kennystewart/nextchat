import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

interface Message {
  id: number;
  text: string;
  createdAt: Date;
  author: {
    name: string;
    email: string;
  };
}

const prisma = new PrismaClient();

export default function Chats() {
  const { data: session, status } = useSession();

  const [chats, setChats] = useState<Chat[]>([]);
  const [newChatTitle, setNewChatTitle] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetchChats();
    }
  }, [status]);

  async function fetchChats() {
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          {
            adminEmails: {
              has: session?.user?.email,
            },
          },
          {
            user: {
              email: session?.user?.email,
            },
          },
        ],
      },
      include: {
        messages: {
          include: {
            author: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    setChats(chats);
  }

  async function handleNewChatSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (newChatTitle.trim() === "") {
      return;
    }
    await prisma.chat.create({
      data: {
        title: newChatTitle.trim(),
        user: {
          connect: {
            email: session?.user?.email,
          },
        },
        adminEmails: {
          set: [session?.user?.email],
        },
      },
    });
    setNewChatTitle("");
    fetchChats();
  }

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "authenticated" && session && (
        <>
          <h1>Chats</h1>
          <ul>
            {chats.map((chat) => (
              <li key={chat.id}>
                <h2>{chat.title}</h2>
                <ul>
                  {chat.messages.map((message) => (
                    <li key={message.id}>
                      <p>{message.text}</p>
                      <p>
                        Sent by {message.author.name} (
                        {message.author.email})
                      </p>
                      <p>{message.createdAt.toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <form onSubmit={handleNewChatSubmit}>
            <input
              type="text"
              value={newChatTitle}
              onChange={(event) => setNewChatTitle(event.target.value)}
            />
            <button type="submit">Create Chat</button>
          </form>
        </>
      )}
      {status === "authenticated" && !session && (
        <p>You need to sign in to use this feature.</p>
      )}
    </div>
  );
}