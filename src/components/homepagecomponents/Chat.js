import React, { useContext } from 'react'
import call from '../images/videocallicon.png';
import addfriend from '../images/addfriend-logo.png';
import more from '../images/more-icon.png';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../../context/ChatsContexts';

const Chat = () => {
  const{data} = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatinfo">
        <span>{data.user.displayName}</span>
        <div className="chaticon">
          <img src={call} alt="" />
          <img src={addfriend} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat;