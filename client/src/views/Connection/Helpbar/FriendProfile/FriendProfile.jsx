import React from 'react';
import './FriendProfile.css';

const FriendProfile = ({ friend }) => {
  return (
    <div className="friend-profile">
      {friend.avatar && friend.avatar !== '' ? (
        <img
          src={friend.avatar}
          alt={friend.avatar}
          className="friend-profile__avatar"
        ></img>
      ) : (
        <span className="material-icons friend-profile__avatar">face</span>
      )}
      <p className="friend-profile__name">{friend.username}</p>
      {friend.bio ? (
        <p className="friend-profile__bio">{friend.tagline}</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default FriendProfile;
