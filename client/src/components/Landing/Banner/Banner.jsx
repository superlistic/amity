import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <p className="banner__title">
        Welcome to <span className="banner__primary">Togetherness</span>
      </p>
      <div className="banner__container">
        <p className="banner__intro">
          We are putting the <span className="banner__secondary">social</span>{' '}
          back in social media.
        </p>
      </div>
      <section className="cards">
        <Link to="/register">
          <button className="button__highlighted">Join Now</button>
        </Link>
        <Link to="/login">
          <button className="button__outlined">Login</button>
        </Link>
      </section>
      <div className="banner__container">
        <p className="banner__text">
          We are social beings living in a digital era, somehow we are more
          disconnected from each other than ever before. Put aside some
          scheduled time or join a social pairing freely. Let us be more social
          together!
        </p>
      </div>
    </div>
  );
};

export default Banner;

// <p className="banner__text">
// Meet with your friends and family over the internet or find new friends via our 'matcher'. You can chat by text, audio or video, discuss interesting topics, solve puzzles or play games together.
// </p>

// <p className="banner__intro">This is where digital meets occur.</p>;
