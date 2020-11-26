import React, { useState } from 'react';
import './ChatInput.css';
import { RoundButton } from '../../../../components/button';
// import io from 'socket.io-client';
// const socket = io('ws://localhost:3000');
// const socket = io();

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  const newMessage = e => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage !== '') {
      // console.log(sendMessage);
      sendMessage(message);
      //Fix autfocus after sent. Now it disappears.
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
          onChange={({ target }) => setMessage(target.value)}
          autoFocus
          autoComplete="off"
        ></input>

        <span className="material-icons chat-input__emoji">
          insert_emoticon
        </span>
        <RoundButton type="submit" onClick={newMessage}>
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
