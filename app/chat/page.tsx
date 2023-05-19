// import prisma from "../../client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// // @ts-expect-error
// import { revalidatePath ,revalidateTag} from "next/server";
// import { Suspense } from "react";
// import OnIntervalFn from "./OnIntervalFn";


// async function MessageList() {
//   const messages = await prisma.chatMessage.findMany({
//     select: {
//       id: true,
//       message: true,
//       createdAt: true,
//       author: { select: { image: true, name: true } },
//     },
//     orderBy: { createdAt: "desc" },
//     take: 50,
//   });
 
//   return messages.map((message) => (
//     <div key={message.id}>
//       <div>
//         <span>{message.author.name}</span>
//       </div>
//       <div>{message.message}</div>
//     </div>
//   ));
  
// }

// function ShoutBox({ email }: { email: string }) {
//   if(!email){  // if not logged in no form.
//     return
//   }
//   async function sendMessage(formData: FormData) {
//     "use server";
//     const message = formData.get("message")?.toString() ?? "";
//     if (message.length > 0 && message.length <= 400) {
//       await prisma.chatMessage.create({
//         data: { message, author: { connect: { email: email } } },
//       });
//     }

//     revalidatePath("/chat");
//   }

//   async function refresh() {
//     "use server";
//     revalidatePath("/chat");
//   }

//   return (
//     <div>
//       <form
//         className="flex"
//         // @ts-expect-error
//         action={sendMessage}
//       >
//         <input
//           minLength={1}
//           maxLength={400}
//           name="message"
//           className="border"
//           type="text"
//         />
//         <button className="border" type="submit">
//           Send dancing
//         </button>
//       </form>
//       <OnIntervalFn intervalMs={5000} fn={refresh} />
//     </div>
//   );
// }

// export default async function Chat() {
//   const session = await getServerSession(authOptions);

//   // @ts-expect-error
//   const userEmail: string = session?.user?.email;
//   return (
//     <div className="container mx-auto mt-48">
//       <div className="max-h-32 h-32 overflow-y-auto">
//         {/* @ts-expect-error */}
//         <MessageList />
//       </div>
//       <ShoutBox email={userEmail} />
//     </div>
//   );
// }


import prisma from "../../client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// @ts-expect-error
import { revalidatePath ,revalidateTag} from "next/server";
import { Suspense } from "react";
import OnIntervalFn from "./OnIntervalFn";
import EmojiPicker from "@/components/EmojiPicker";
import Rating from "./Rating"; 
import RatingComponent from "@/components/RatingComponent";

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
  console.log('this is messages:' + messages);
  return messages?messages.map((message) => (
    <div key={message.id}>
      <div>
        <span>{message.author.name}</span>
      </div>
      <div>{message.message}</div>
      <div className="flex items-center mb-5">
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      </div>
    </div>
  )): 'no messages';
  
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
          placeholder="comment..."
        />
        <button className="border" type="submit">
          Send this s..
        </button>
        <Rating />
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


