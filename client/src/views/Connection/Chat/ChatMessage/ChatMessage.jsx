import React, { Fragment } from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, client }) => {
  return !client ? (
    <Fragment>
      <div className="chat-message">
        <span className="material-icons chat-message__avatar">face</span>
        <div className="chat-message__box">
          <p className="chat-message__text">{message.message}</p>
        </div>
      </div>
      <p className="chat-message__time">
        {`Sent ${new Date(message.date).toLocaleTimeString()}`}
      </p>
    </Fragment>
  ) : (
    <Fragment>
      <div className="chat-message--friend">
        <span className="material-icons chat-message__avatar--friend">
          face
        </span>
        <div className="chat-message__box--friend">
          <p className="chat-message__text--friend">{message.message}</p>
        </div>
      </div>
      <p className="chat-message__time-friend">
        {`Sent ${new Date(message.date).toLocaleTimeString()}`}
      </p>
    </Fragment>
  );
};

export default ChatMessage;
