import React from 'react';
import './FriendProfile.css';

const FriendProfile = ({ friend }) => {
  return (
    <div className="friend-profile">
      {friend.img && friend.img !== '' ? (
        <img src="friend.img" alt="friend.imgalt"></img>
      ) : (
        <span className="material-icons friend-profile__avatar">face</span>
      )}
      <p className="friend-profile__name">{friend.name}</p>
      <p className="friend-profile__bio">{friend.bio}</p>
    </div>
  );
};

export default FriendProfile;
