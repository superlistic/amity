import React from 'react';
import './Register.css';
import FacebookLoginWithButton from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const Register = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  const componentClicked = () => {
    console.log('Clicked!');
  };

  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className="register">
      <p className="register__title">Create your account below.</p>
      <form className="register__form">
        <p className="register__intro">To register is simple and free</p>
        <input type="text" value="5"></input>
        <input type="password" value="5"></input>
        <button className="register__button">Register</button>

        <p className="register__intro">
          Or skip registering and connect directly via
        </p>
        <div className="register__alternative-methods">
          <FacebookLoginWithButton
            appId="285110689541236"
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            icon="fa-facebook"
          />
          <GoogleLogin
            className="register__google"
            clientId="488673817389-a3ri9lr2c6r19qre1lh1ma90rkhegvif.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme="dark"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
