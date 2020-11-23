import React from 'react';
import './Chat.css';
import ChatInput from './ChatInput/ChatInput';
import ChatMessage from './ChatMessage/ChatMessage';

const Chat = () => {
  return (
    <div className="chat">
      <section className="chat__messages">
        <ChatMessage text={'Hello everyboddyyy'} client={true} />
        <ChatMessage text={'YOYO'} client={false} />
      </section>
      <ChatInput />
    </div>
  );
};

export default Chat;

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
