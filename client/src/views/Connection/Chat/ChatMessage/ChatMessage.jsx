import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, client }) => {
  return !client ? (
    <div className="chat-message">
      <span className="material-icons chat-message__avatar">face</span>
      <div className="chat-message__box">
        <p className="chat-message__text">{message.message}</p>
        <p className="chat-message__text">
          {new Date(message.date).toLocaleTimeString()}
        </p>
      </div>
    </div>
  ) : (
    <div className="chat-message--friend">
      <span className="material-icons chat-message__avatar--friend">face</span>
      <div className="chat-message__box--friend">
        <p className="chat-message__text--friend">{message.message}</p>
        <p className="chat-message__text--friend">
          {new Date(message.date).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
