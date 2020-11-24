import React, { useState } from 'react';
import './ChatInput.css';
import { RoundButton } from '../../../../components/button';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const sendMessage = e => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage !== '') {
      //få bort uppdatering av sida vid Enter :)
      console.log(message);
      //Send message via Sockets
      //timestamp when message was sent?
      setMessage('');
    }
  };

  return (
    <div className="chat-input">
      <br />
      <form className="chat-input__form">
        <input
          className="chat-input__input-text"
          type="textarea"
          value={message}
          placeholder={'Write a message..'}
          onChange={e => setMessage(e.target.value)}
          autoFocus="true"
        ></input>

        <span className="material-icons chat-input__emoji">
          insert_emoticon
        </span>
        <RoundButton type="submit" onClick={e => sendMessage(e)}>
          <span className="material-icons chat-input__send">send</span>
        </RoundButton>
      </form>
    </div>
  );
};

//connect to redux, Get name/profile of other person in connection.
export default ChatInput;

//  <button className="chat-input__button" onClick={(e) => sendMessage(e)}>
//    Send message
//  </button>;
