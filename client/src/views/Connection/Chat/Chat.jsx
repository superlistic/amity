import React from 'react';
import { connect } from 'react-redux';

import './Chat.css';
import ChatInput from './ChatInput/ChatInput';
import ChatMessage from './ChatMessage/ChatMessage';

const Chat = ({ sendMessage, messages }) => {
  return (
    <div className="chat">
      <div className="chat__container">
        <section className="chat__messages">
          {messages.map(message => (
            <ChatMessage
              message={message}
              client={message.client}
              key={`${message.client}-${message.date}`}
            />
          ))}
        </section>
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

const mapStateToProps = state => ({
  messages: state.connection.messages,
});

export default connect(mapStateToProps, {})(Chat);
