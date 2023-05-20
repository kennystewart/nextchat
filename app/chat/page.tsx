import prisma from "../../client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// @ts-expect-error
import { revalidatePath ,revalidateTag} from "next/server";
import { Suspense } from "react";
import OnIntervalFn from "./OnIntervalFn";


async function MessageList() {
  const messages = await prisma.chatMessage.findMany({
    select: {
      id: true,
      message: true,
      createdAt: true,
      author: { select: { image: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  const renderMessages = messages.length>0  && messages.map((message) => (
    <div key={message.id}>
      <div>
        <span>{message.author.name}</span>
      </div>
      <div>{message.message}</div>
    </div>
  ));

  const renderNullMessages = (
    <>
      <h2>
        Hello , Kennyth, there is no messages...
      </h2>
    </>
  )
  return messages ? renderMessages: renderNullMessages;
  
}

function ShoutBox({ email }: { email: string }) {
  if(!email){  // if not logged in no form.
    return
  }
  async function sendMessage(formData: FormData) {
    "use server";
    const message = formData.get("message")?.toString() ?? "";
    if (message.length > 0 && message.length <= 400) {
      await prisma.chatMessage.create({
        data: { message, author: { connect: { email: email } } },
      });
    }

    revalidatePath("/chat");
  }

  async function refresh() {
    "use server";
    revalidatePath("/chat");
  }

  return (
    <div>
      <form
        className="flex"
        // @ts-expect-error
        action={sendMessage}
      >
        <input
          minLength={1}
          maxLength={400}
          name="message"
          className="border"
          type="text"
        />
        <button className="border" type="submit">
          Send
        </button>
      </form>
      <OnIntervalFn intervalMs={5000} fn={refresh} />
    </div>
  );
}

export default async function Chat() {
  const session = await getServerSession(authOptions);

  // @ts-expect-error
  const userEmail: string = session?.user?.email;
  return (
    <div className="container mx-auto mt-48">
      <div className="max-h-32 h-32 overflow-y-auto">
        {/* @ts-expect-error */}
        <MessageList />
      </div>
      <ShoutBox email={userEmail} />
    </div>
  );
}
