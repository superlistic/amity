import React from 'react';
import { connect } from 'react-redux';

import './Profile.css';

const Profile = ({ user, loading }) => {
  if (loading) return <p>Loading..</p>;

  return (
    <div className="profile">
      <p className="profile__title">{user.username}</p>
      <p className="profile__text">{user.avatar}</p>
      <img src={user.avatar} alt={user.avatar} />
      <p className="profile__text">{user.tagline}</p>
      <p className="profile__text">{user.bio}</p>
      <p className="profile__text">{user.username}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Profile);
