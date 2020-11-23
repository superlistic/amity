import React from 'react';
import './Helpbar.css';
import FriendProfile from './FriendProfile/FriendProfile';
import HelpbarInfo from './HelpbarInfo/HelpbarInfo';
import Controller from './Controller/Controller';

const friend = {
  name: 'Bengan',
  bio: 'Love coding in C++ ofc..',
};

const Helpbar = () => {
  return (
    <div className="helpbar">
      <FriendProfile friend={friend} />
      <HelpbarInfo suggestion={'What is your favorite candy?'} />
      <Controller />
    </div>
  );
};

export default Helpbar;

//   <HelpbarInput />;
