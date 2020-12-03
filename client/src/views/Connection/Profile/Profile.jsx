import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import './Profile.css';
import { WideAccentOutlinedButton } from '../../../components/button';

const Profile = ({ user, loading }) => {
  if (loading) return <p>Loading..</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="profile"
    >
      <img className="profile__avatar" src={user.avatar} alt={user.avatar} />
      <p className="profile__title">{user.username}</p>
      <hr className="profile__divider" />
      <p className="profile__text">{`Tagline: ${user.tagline}`}</p>
      <p className="profile__text">{`Bio: ${user.bio}`}</p>
      <p className="profile__text">{`Contact: ${user.email}`}</p>
      <WideAccentOutlinedButton to="/settings">
        Change info
      </WideAccentOutlinedButton>
    </motion.div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Profile);
