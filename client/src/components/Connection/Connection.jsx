import React from 'react';
import './Connection.css';
import Sidebar from '../Sidebar/Sidebar';
import Chat from './Chat/Chat';
import Helpbar from './Helpbar/Helpbar';

const Connection = () => {
  return (
    <div className="connection">
      <Sidebar />
      <Chat />
      <Helpbar />
    </div>
  );
};

export default Connection;
