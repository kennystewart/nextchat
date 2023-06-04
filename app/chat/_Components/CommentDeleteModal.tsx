import Modal from '@/components/Modal';
import React from 'react';

interface Props {
    show: boolean,
    setShow: (boolean) => void,
    messageId: string,
    removeMessage: (messageId:string) => void
}

const CommentDeleteModal: React.FC<Props> = ({show, setShow, messageId, removeMessage}) => {

    const submit = () => {
        removeMessage(messageId);
    };
    
    return (
        <>
            <Modal title='Danger Alert!' show={show} setShow={setShow} type="warning" submit={submit}> 
                <p>Remove this message?</p>
            </Modal> 
        </>
    );
}
export default CommentDeleteModal;