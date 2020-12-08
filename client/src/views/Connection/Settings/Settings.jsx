import React, { useState } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import './Settings.css';
import { FormInput } from '../../../components/formInput/style';
import { AccentButton } from '../../../components/button';

const Settings = ({ user, loading }) => {
  const initUser = {
    username: '',
    email: '',
    password: '',
    avatar: '',
    bio: '',
    tagline: '',
  };
  const [userData, setUserData] = useState(user || initUser);
  const [settingsTopic, setSettingsTopic] = useState('General');

  const onChange = e =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  return (
    user && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className="settings"
      >
        <p className="settings__title">Settings</p>
        <article className="settings__container">
          <section className="settings__categories">
            <div
              className="category__container"
              onClick={() => setSettingsTopic('General')}
            >
              <span className="material-icons category__icon">person</span>
              <p className="category__description">General</p>
            </div>
            <div
              className="category__container"
              onClick={() => setSettingsTopic('Password')}
            >
              <span className="material-icons category__icon">vpn_key</span>
              <p className="category__description">Password</p>
            </div>
            <div
              className="category__container"
              onClick={() => setSettingsTopic('Interests')}
            >
              <span className="material-icons category__icon">psychology</span>
              <p className="category__description">Interests</p>
            </div>
          </section>
          <p className="category__title">{settingsTopic}</p>
          <section className="settings__options">
            <FormInput
              className="settings__input"
              placeholder="Change email"
              name="email"
              type="email"
              value={userData.email || user.email}
              onChange={onChange}
            ></FormInput>
            <FormInput
              className="settings__input"
              placeholder="Tagline"
              name="tagline"
              type="text"
              value={userData.tagline || user.tagline}
              onChange={onChange}
            ></FormInput>
            <FormInput
              className="settings__input"
              placeholder="Bio"
              name="bio"
              type="text"
              value={userData.bio || user.bio}
              onChange={onChange}
              required
            ></FormInput>
          </section>
        </article>
        <AccentButton className="settings__button"> Update</AccentButton>
      </motion.div>
    )
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Settings);
