import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <p className="banner__title">Welcome to Togetherness</p>
      <section className="cards">
        <button className="banner__login">Login</button>
        <button className="banner__register">Register</button>
      </section>
      <div className="banner__container">
        <p className="banner__text">
          Togetherness is where digital meets occur.
        </p>
        <p className="banner__text">
          We are social beings living in a digital era, let us be more social
          together!
        </p>
      </div>
    </div>
  );
};

export default Banner;
