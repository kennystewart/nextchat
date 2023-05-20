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
 
  return messages.map((message) => (
    <div key={message.id}>
      <div>
        <span>{message.author.name}</span>
      </div>
      <div>{message.message}</div>
    </div>
  ));
  
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
          Send dancing
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


// import prisma from "../../client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// // @ts-expect-error
// import { revalidatePath ,revalidateTag} from "next/server";
// import { Suspense } from "react";
// import OnIntervalFn from "./OnIntervalFn";
// import EmojiPicker from "@/components/EmojiPicker";

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
//   console.log('this is messages:' + messages);
//   return messages?messages.map((message) => (
//     <div key={message.id}>
//       <div className="bg-white w-full sm:max-w-7xl md:w-1/3 h-auto shadow px-3 py-2 flex flex-col space-y-2">
//         {/* <div className="flex items-center space-x-2">
//           <div className="flex flex-shrink-0 self-start cursor-pointer">
//             <img src="https://images.unsplash.com/photo-1609349744982-0de6526d978b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHRvd0paRnNrcEdnfHxlbnwwfHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="" className="h-8 w-8 object-cover rounded-full" />
//           </div>

//           <div className="flex items-center justify-center space-x-2">
//             <div className="block">
//               <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
//                 <div className="font-medium">
//                   <a className="hover:underline text-sm" target="_blank">
//                     <small>{message.author.name}</small>
//                   </a>
//                 </div>
//                 <div className="text-xs">
//                 {message.message}
//                 </div>
//               </div>
//               <div className="flex justify-start items-center text-xs w-full">
//                 <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
//                   <a className="hover:underline" target="_blank">
//                     <small>Like</small>
//                   </a>
//                   <small className="self-center">.</small>
//                   <a className="hover:underline" target="_blank">
//                     <small>Reply</small>
//                   </a>
//                   <small className="self-center">.</small>
//                   <a className="hover:underline" target="_blank">
//                     <small>15 hour</small>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//         this is chat..
//       </div>
//     </div>
//   )): 'no messages';
  
// }

// async function ShoutBox({ email }: { email: string }) {
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
//           placeholder="comment..."
//         />
//         <button className="border" type="submit">
//           Send this s..
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


