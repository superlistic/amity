import React from 'react';
import { connect } from 'react-redux';

import './Profile.css';

const Profile = ({ user, loading }) => {
  if (loading) return <p>Loading..</p>;

  return (
    <div className="profile">
      <img className="profile__avatar" src={user.avatar} alt={user.avatar} />
      <p className="profile__title">{user.username}</p>
      <hr className="profile__divider" />
      <p className="profile__text">{`Tagline: ${user.tagline}`}</p>
      <p className="profile__text">{`Bio: ${user.bio}`}</p>
      <p className="profile__text">{`Contact: ${user.email}`}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Profile);
