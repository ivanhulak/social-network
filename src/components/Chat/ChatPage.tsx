import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ChatMessageAPIType } from '../../DAL/chat-api';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';
import send from '../../assets/icons/send.svg';

const StyledChatPage = styled.div`
   margin: 10px;
`;
const ChatPageTitle = styled.h1`
   font-size: 32px;
   color: #886DF5;
   font-weight: 600;
   text-align: center;
   margin-bottom: 20px;
`;
const StyledChat = styled.div`
   padding: 30px;
   border: 5px solid #B7A8F5;
   box-shadow: 0px 0px 24px 4px #B7A8F5;
   border-radius: 33px;
`;

const ChatPage: React.FC = () => {
   return (
      <StyledChatPage>
         <ChatPageTitle>ChatPage</ChatPageTitle>
         <StyledChat><Chat /></StyledChat>
      </StyledChatPage>
   );
}
export default ChatPage;


const Chat: React.FC = () => {
   const dispatch: any = useDispatch()
   const status = useSelector((state: AppStateType) => state.chat.status)
   useEffect(() => {
      dispatch(startMessagesListening())
      return () => {
         dispatch(stopMessagesListening())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   return (
      <div>
         {status === 'error' && <div>Some errror occured. Please, refresh the page</div>}
         <Messages />
         <AddMessageForm />
      </div>
   );
}

const MessagesBlock = styled.div`
   height: 400px;
   overflow: auto;
`;
const Messages: React.FC = () => {
   const messages = useSelector((state: AppStateType) => state.chat.messages)
   const messagesAnchorRef = useRef<HTMLDivElement>(null)
   const [isAutoScroll, setIsAutoScroll] = useState(true)

   const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const element = e.currentTarget
      if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
         !isAutoScroll && setIsAutoScroll(true)
      } else {
         isAutoScroll && setIsAutoScroll(false)
      }
   }
   useEffect(() => {
      if (isAutoScroll) {
         messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
   }, [messages, isAutoScroll])

   return <MessagesBlock onScroll={scrollHandler}>
      {messages.map((m, index) => <Message key={index} message={m} />)}
      <div ref={messagesAnchorRef}></div>
   </MessagesBlock>
}

const StyledMessage = styled.div<{ messageAlign: string }>`
   display: flex;
   justify-content: ${(props) => props.messageAlign};
   gap: 20px;
   background-color: #B7A8F5;
   border-radius: 30px;
   padding: 10px 20px;
   overflow: scroll;
   &:not(:last-child){
      margin-bottom: 10px;
   }
   .message-image{
      width: 50px;
      border-radius: 50%;
   }
   .fullName{
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 5px;
   }
`;
const Message: React.FC<{ message: ChatMessageAPIType }> = ({ message }) => {
   const ownerUserId = useSelector((state: AppStateType) => state.auth.userId)
   return (
      <StyledMessage messageAlign={message.userId === ownerUserId ? 'flex-end' : 'flex-start'}>
         {(message.userId !== ownerUserId)
            ? <>
               <div>
                  <img src={message.photo || "https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png"} alt="" className='message-image' />
               </div>
               <div>
                  <div className="fullName" style={{ textAlign: 'left' }}>{message.userName}</div>
                  <div>{message.message}</div>
               </div>
            </>
            : <>
               <div>
                  <div className="fullName" style={{ textAlign: 'right' }}>{message.userName}</div>
                  <div>{message.message}</div>
               </div>
               <div>
                  <img src={message.photo || "https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png"} alt="" className='message-image' />
               </div>
            </>}

      </StyledMessage>
   );
}
const StyledSendMessage = styled.div`
   .sendMessage-textarea{
      display: block;
      min-height: 80px;
      padding: 15px 130px 15px 15px;
      color: #E3E3E3;
      font-weight: 600;
      width: 100%;
      font-size: 20px;
      resize: vertical;
      background-color:#8000FF;
      border-radius: 0px 30px 30px 30px;
      margin-bottom: 10px;
   }
   .sendMessage-textarea::placeholder {
      color: #E3E3E3;
   }
   .sendMessage-textarea:focus {
      border: 1px solid #B7A8F5;
   }
`;
const SendButton = styled.button`
   position: absolute;
   right: 10px;
   top: 10px;
   background-color: #B7A8F5;
   border-radius: 30px;
   color: #fff;
   font-size: 20px;
   font-weight: 500;
   padding: 5px 15px;
   transition: all 0.3s linear;
   &:hover{
      box-shadow: 0px 0px 24px 4px #B7A8F5;
   }
`;
const AddMessageForm: React.FC = () => {
   const [message, setMessage] = useState('')
   const dispatch: any = useDispatch()
   const status = useSelector((state: AppStateType) => state.chat.status)

   const sendMessageHandler = () => {
      if (!message) {
         return
      }
      dispatch(sendMessage(message))
      setMessage('')
   }
   return (
      <StyledSendMessage>
         <div style={{ position: 'relative', width: '30vw'}}>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)}
               value={message}
               className='sendMessage-textarea'
               placeholder='Send message . . .'></textarea>
            <SendButton type="submit" disabled={status !== 'ready'} onClick={sendMessageHandler}>
               <img src={send} alt="" />
            </SendButton>
         </div>
      </StyledSendMessage>
   );
}