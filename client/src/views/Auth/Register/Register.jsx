import React, { useState } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';

import './Register.css';
import { register } from '../../../actions/auth';
import { AccentButton } from '../../../components/button';
import { FormInput } from '../../../components/formInput/style';
import { variantForm } from '../../../animations';

const Register = ({ register, isAuthenticated }) => {
  const initState = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };
  const [registerData, setRegisterData] = useState(initState);
  const { username, email, password, password2 } = registerData;

  const onChange = e =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const onRegister = e => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match.', 'danger');
    } else if (password.length < 6 || password2.length < 6) {
      alert('Password should be longer than 6 characters.', 'danger');
    } else {
      register({ username, email, password });
    }
    setRegisterData(initState);
  };

  if (isAuthenticated) return <Redirect to="/connection" />;

  return (
    <div className="register">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <p className="register__title">Create your account below.</p>
      </motion.div>
      <motion.div variants={variantForm} initial="initial" animate="animate">
        <form className="register__form">
          <p className="register__intro">Fill in your details</p>
          <FormInput
            className="register__input"
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          ></FormInput>
          <FormInput
            className="register__input"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            required
          ></FormInput>
          <FormInput
            className="register__input"
            placeholder="Choose a password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            required
          ></FormInput>
          <FormInput
            className="register__input"
            placeholder="Confirm password"
            name="password2"
            type="password"
            value={password2}
            onChange={onChange}
            required
          ></FormInput>
          <p className="register__intro">
            By registering, you agree to our Terms and Privacy Policy.
          </p>
          <AccentButton className="register__button" onClick={onRegister}>
            Register
          </AccentButton>
        </form>
      </motion.div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
