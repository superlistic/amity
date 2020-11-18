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
      <p className="register__intro">
        To register is simple, free and takes approximately 2 minutes of your
        time. We think it is well spent though!
      </p>
      <FacebookLoginWithButton
        appId="285110689541236"
        autoLoad
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        icon="fa-facebook"
      />
      <GoogleLogin
        clientId="488673817389-a3ri9lr2c6r19qre1lh1ma90rkhegvif.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      <form className="register__form">
        <input type="text" value="5"></input>
      </form>
    </div>
  );
};

export default Register;
