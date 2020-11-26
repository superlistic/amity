import React from 'react';
import './Helpbar.css';
import FriendProfile from './FriendProfile/FriendProfile';
import Suggestions from './Suggestions/Suggestions';
import Controller from './Controller/Controller';

//action on load for fetching friend + suggestions.

const friend = {
  name: 'Bengan',
  bio: 'Love coding in C++ ofc..',
  img: '',
};

const Helpbar = () => {
  return (
    <div className="helpbar">
      <p className="helpbar__title">You have connected with..</p>
      <FriendProfile friend={friend} />
      <Suggestions />
      <Controller />
    </div>
  );
};

export default Helpbar;

//   <HelpbarInput />;
