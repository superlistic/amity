import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ text, client }) => {
  return client ? (
    <div className="chat-message">
      <span className="material-icons chat-message__avatar">face</span>
      <div className="chat-message__box">
        <p className="chat-message__text">{text}</p>
      </div>
    </div>
  ) : (
    <div className="chat-message--friend">
      <span className="material-icons chat-message__avatar--friend">face</span>
      <div className="chat-message__box--friend">
        <p className="chat-message__text--friend">{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
