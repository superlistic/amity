import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Settings.css';
import { FormInput } from '../../../components/formInput/style';

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
  console.log(user);
  // if (user) {
  //   const { email, avatar, bio, tagline } = user;
  //   console.log(email);
  // }

  // if (userId) {
  //   console.log(email);
  //   console.log(bio);
  // }
  // const { username, email, password, password2 } = registerData;

  const onClick = e => console.log(e);
  const onChange = e =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  // const onRegister = e => {
  //   e.preventDefault();
  //   if (password !== password2) {
  //     alert('Passwords do not match.', 'danger');
  //   } else if (password.length < 6 || password2.length < 6) {
  //     alert('Password should be longer than 6 characters.', 'danger');
  //   } else {
  //     register({ username, email, password });
  //   }
  //   setRegisterData(initState);
  // };
  // if (loading || !user) ;

  return (
    user && (
      <div className="settings">
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
      </div>
    )
  );
};

const mapStateToProps = state => ({
  // isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Settings);

//  <FormInput
//    className="settings__input"
//    placeholder="Change email"
//    name="email"
//    type="email"
//    value={''}
//    onChange={''}
//    required
//  ></FormInput>;
