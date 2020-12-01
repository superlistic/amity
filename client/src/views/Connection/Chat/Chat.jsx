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

//  <section className="chat__messages">
//    {sentMessages.map(message => (
//      <ChatMessage message={message} client={message.client} />
//    ))}
//  </section>;

// USER:
// {
// id : ID
// fbToken:String
// gToken:String
// username: String
// email:String
// passhash: String
// call history: List CALL
// settings: SETTINGS
// usedSuggestions: List SUGGESTION_ID
// updated: Date
// }

// CALL:
// {
// date: Date
// duration : Int
// participants: List USER
// usedSuggestions: List SUGGESTION_ID
// }

// SETTINGS:
// {
// optOutTopics: List String
// preferedTopics: List String
// }

// SUGGESTIONS:
// {
// category:String
// topics
// }
