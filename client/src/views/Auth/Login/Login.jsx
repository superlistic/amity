import React, { useState } from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import './Login.css';
import { login } from '../../../actions/auth';
import { variantForm } from '../../../animations';
import { FormInput } from '../../../components/formInput/style';
import { AccentButton } from '../../../components/button';

const Login = ({ login, isAuthenticated }) => {
  const initState = {
    email: '',
    password: '',
  };
  const [loginData, setLoginData] = useState(initState);
  const { email, password } = loginData;

  const onChange = e =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onLogin = e => {
    e.preventDefault();
    login({ email, password });
    setLoginData(initState);
  };

  const responseFacebook = response => {
    console.log(response);
  };

  const componentClicked = () => {
    console.log('Clicked!');
  };

  const responseGoogle = response => {
    console.log(response);
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
        <p className="login__title"> Enter login details</p>
      </motion.div>
      <motion.div variants={variantForm} initial="initial" animate="animate">
        <form className="login__form">
          <FormInput
            className="login__input"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            required
          ></FormInput>
          <FormInput
            className="login__input"
            placeholder="Enter your password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            required
          ></FormInput>
          <AccentButton className="login__button" onClick={e => onLogin(e)}>
            Login
          </AccentButton>
          <p className="login__intro">Or login directly below.</p>
          <div className="register__alternative-methods">
            {/* <GoogleLogin
              className="register__google"
              clientId={process.env.REACT_APP_.GOOGLE}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              theme="dark"
            />
            <FacebookLoginWithButton
              size="small"
              appId={process.env.REACT_APP_.FACEBOOK}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
              icon="fa-facebook"
            /> */}
          </div>
        </form>
        <br />
        <p className="login__forgot">
          I forgot my password. Please give me a new one!
        </p>
      </motion.div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
