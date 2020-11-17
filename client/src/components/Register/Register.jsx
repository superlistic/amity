import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="register">
      <p className="register__title">Create your account below.</p>
      <p className="register__intro">
        To register is simple, free and takes approximately 2 minutes of your
        time. We think it is well spent though!
      </p>
      <form className="register__form">
        <input type="text" value="5"></input>
      </form>
    </div>
  );
};

export default Register;
