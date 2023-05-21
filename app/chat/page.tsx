import prisma from "../../client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// @ts-expect-error
import { revalidatePath ,revalidateTag} from "next/server";
import { Suspense } from "react";
import OnIntervalFn from "./OnIntervalFn";
import * as React from 'react';

const myId = "clhsshv9i0000l508ltj0sr5l"

function getRole(author: any) {
  
  if(myId == author.id) 
    return 1;
  return 0;
} 

async function MessageList() {
    const messages = await prisma.chatMessage.findMany({
      select: {
        id: true,
        message: true,
        createdAt: true,
        author: { select: { image: true, name: true, id: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const editMessage = ({id, message}) => {
        
    }

    const deleteMessage = ({id}) =>{

    }

    const like = ({id}) => {

    }
    const renderMessages = messages.length>0  && messages.map((message) => {
      
    let createdAt = message.createdAt.toLocaleString();

    let role = 0;

    return (
        <article key={message.id} className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                  {message.author.image && 
                    <img className="mr-2 w-12 h-12 rounded-full" src={message.author.image} alt={message.author.name}  />
                  }
                  {!message.author.image &&
                    <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <svg className="absolute w-14 h-14 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                  }
                </div>
                <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                  {message.author.name} 
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{createdAt}</p>
            </div>
            
            {messageToolButtons(message, role, editMessage, deleteMessage, like)}
          </footer>
          <p className="text-gray-500 dark:text-gray-400">{message.author.name}</p>
          <div className="flex items-center mt-4 space-x-4">
                  <button className="inline-flex items-center px-1 -ml-1 flex-column">
                      <svg className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path
                              d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                  </button>
                  <p>26</p>
          </div>
        </article>
    )});

  const renderNullMessages = (
    <>
      <h2>
        Hello , Kennyth, there is no messages...
      </h2>
    </>
  )
  return messages ? renderMessages: renderNullMessages;
  
}
function messageToolButtons(message: any, role: number, editMessage:any, deleteMessage: any, like:any)  {
  
  console.log(message);

  if (role == 0 || (role == 1 && message.author.id == myId)) {
    return <div className="flex items-center">
    <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5 [color]-$fill-color" style={{strokeWidth: "var(--grid-item-icon-stroke-width)", transform: "scale(var(--grid-item-icon-scale))"}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10">
        </path>
      </svg>
      <span className="sr-only">Comment settings</span>
    </button>
    <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5 [color]-$fill-color" style={{strokeWidth: "var(--grid-item-icon-stroke-width)", transform: "scale(var(--grid-item-icon-scale))"}}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0">
        </path>
    </svg>
    </button>
  </div>
  }
  return  
  <>
  </>
}
function ShoutBox({ email }: { email: string }) {
  // if(!email){  // if not logged in no form.
  //   return
  // }
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
    <>
      <div>
        <form 
        className="mb-6" 
         // @ts-expect-error
         action={sendMessage}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" name="message" rows={6} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a comment..." required=""></textarea>
            </div>
            <button type="submit" className="text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 bg-blue-700">
                Post comment
            </button>
        </form>

        {/* <OnIntervalFn intervalMs={5000} fn={refresh} /> */}
      </div>
    </>
    
  );
}

export default async function Chat() {
  const session = await getServerSession(authOptions);

  // @ts-expect-error
  const userEmail: string = session?.user?.email;
  return (
    <>
    <div className="container mx-auto mt-160">
      <div className="py-6 lg:py-12 px-1 mt-28">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              Home / Chat
            </span>
          </div>
        </div>
      </div>
    </div>
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-8">
      <div className="max-w-[65%] mx-auto px-4">

        <ShoutBox email={userEmail} />

        <div className="max-h-200 h-200 overflow-y-auto">
          {/* @ts-expect-error */}

          <MessageList />
        </div>
      </div>
    </section>
    </>
  );
}
