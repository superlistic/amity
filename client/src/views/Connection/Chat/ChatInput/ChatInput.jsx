import React, { useState } from 'react';

import './ChatInput.css';
import { RoundButton } from '../../../../components/button';

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const newMessage = e => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage !== '') {
      sendMessage(message);
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

export default ChatInput;
