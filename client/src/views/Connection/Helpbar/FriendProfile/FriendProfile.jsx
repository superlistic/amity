import React from 'react';
import './FriendProfile.css';

const FriendProfile = ({ friend }) => {
  return (
    <div className="friend-profile">
      <img
        src={friend.avatar}
        alt={friend.avatar}
        className="friend-profile__avatar"
      ></img>
      <p className="friend-profile__username">{friend.username}</p>
      {friend.tagline ? (
        <p className="friend-profile__bio">{friend.tagline}</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default FriendProfile;
