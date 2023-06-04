'use client';
import {lazy, useEffect, useState, experimental_use as useOptimistic} from 'react';
import { DeleteIcon, EditIcon, NoAvartar, replaceEmoticons} from "../_lib/ChatData";
import { sendMessage } from '../_lib/functions';
import ShoutBox from './ShoutBox';
const factoryDeleteModal = () => import('./CommentDeleteModal');
const CommentDeleteModal = lazy(factoryDeleteModal);
const factoryEditModal = () => import('./CommentEditModal');
const CommentEditModal = lazy(factoryEditModal);

interface props {
    user: any,
    messages: any,
    like: (message: any) => void,
    updateMessage: (message: any) => Promise<void>,
    removeMessage: (messageId: string) => Promise<void>,
    sendMessage: (message: any) => any
}

const MessageList: React.FC<props> = ({user, messages, like, updateMessage, removeMessage, sendMessage}) => {
    
    const myId = user?.id;

    const [showEditModal, setShowEditModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [optimisticMessages, setOptimisticMessages] = useState(messages);

    const likeMessage = async (message) => {
        let likedMessage = await like(message);
        let updatedMessages = optimisticMessages.map(message => {
            if (message.id === likedMessage['id']){ 
                return likedMessage;
            }
            return message;
        })

        setOptimisticMessages(updatedMessages);
    }

    const addOptimisticMessage = (message: any) => {
        message = {...message, sending: true};
        let updatedMessages = optimisticMessages;
        updatedMessages.unshift(message);
        setOptimisticMessages(updatedMessages);
    }

    const sendNewMessage = async (event: any) => {
        const message = event.message?.toString() ?? "";
        setLoading(true);
        addOptimisticMessage(message);
        const result = await sendMessage(message);
        if (result?.id) {
            let updatedMessages = optimisticMessages.map(message => {
                if(message?.sending) {
                    return result;
                }
                else{
                    return message;
                }
            })
            setOptimisticMessages(updatedMessages);

            messages = updatedMessages;
        }
        else return;
        setOptimisticMessages(messages);
        setLoading(false);
    }
    // import MessageDeleteModal
    useEffect(() => {
        factoryDeleteModal();
      },[showModalDelete]);

    // import MessageEditModal
    useEffect(() => {
        factoryEditModal();
      },[showEditModal]);
    
    const showModalEdit = (message:any) => {
        setMessage(message);
        setShowEditModal(true);
    }

    const dModalShow = (message) => {
        setMessage(message);
        setShowModalDelete(true);
    }

    const deleteMessage = (messageId: string) => {
        setLoading(true);
        removeMessage(messageId);
        setLoading(false);
    }

    const renderMessages =  optimisticMessages.length > 0  && optimisticMessages.map((message) => {
        if(message?.sending == true ) {
            return <div key={new Date() + 'sending...'} className="flex items-center justify-between">
            <div>
                <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        }
        else {
        let createdAt = message?.createdAt.toLocaleString();

        let role = user?.role;

        let text = message?.message;
        const replacedText = replaceEmoticons(text);

        function messageToolButtons(message: any, role: number)  {
        // function messageToolButtons(message: any)  {
                const likes = <>
                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700" 
                    onClick={() => 
                        {
                            setLoading(true)
                            likeMessage(message);
                            setLoading(false);
                        }} type="button" >
                        ❤️
                    <p>{message?.like}</p>
                </button>
            </>

            if (role == 0 || role == 2 || (role == 1 && message?.author.id == myId)) {
            // if (message?.author.id == myId) {
            return <div className="flex items-center">
                {likes}
                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    onClick={() =>showModalEdit(message)} type="button">
                        <EditIcon />
                </button>
                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    onClick={() => dModalShow(message)} type="button">
                    <DeleteIcon />
                </button>
            </div>
            }
            else return  <div className="flex items-center">
                {likes}
            </div>
        }

        return (
            <div key={message?.id} role="status" className="max-w-sm p-0 border border-gray-200 rounded-lg shadow md:p-6 dark:border-gray-700">
                <article className="p-0 mb-2 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                            {message?.author.image && 
                                <img className="mr-2 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full" src={message?.author.image} alt={message?.author.name}  />
                            }
                            {!message?.author.image &&
                                <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <NoAvartar />             
                                </div>
                            }
                            </div>
                            <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                            {message?.author.name} 
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 ">{createdAt}</p>
                        </div>
                        
                        {messageToolButtons(message, role)}
                        {/* {messageToolButtons(message)} */}
                    </footer>
                    <div className="px-16 w-11/12">
                        <label className=" text-gray-500 dark:text-gray-400" style={{wordWrap: "break-word"}}>{replacedText}</label>
                    </div>
                    </article>
            </div>
        
    )}
});

    const renderNullMessages = (
        <>
            <h2>
                Sorry, there is no message.
            </h2>
        </>
    )

    const messageRender =
    <>
        {optimisticMessages && optimisticMessages.length > 0 ? renderMessages: renderNullMessages}
        {message && 
            <>
                <CommentEditModal message={message} show={showEditModal} setShow={setShowEditModal} saveMessage={updateMessage}/>
                <CommentDeleteModal messageId={message?.id} show={showModalDelete} setShow={setShowModalDelete} removeMessage={deleteMessage}/>
            </>}
    </>
    const loadingSkeleton = <>        
        <div role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div>
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </>
    return <div className="md:w-10/12 sm:w-full mx-auto px-4">

    {<ShoutBox sendMessage={sendNewMessage} loading={loading} />}

    <div className="max-h-200 h-200 overflow-y-auto">
        <div className="flex flex-col space-y-2">
            {!loading && 
                messageRender
            }
            {loading && loadingSkeleton}
        </div>
    </div>
    </div>
}

export default MessageList;