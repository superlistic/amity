import React from 'react';
import { motion } from 'framer-motion';

import './Banner.css';
import { AccentButton, GrayOutlinedButton } from '../../../components/button';
import { variantLanding, variantLandingHeader } from '../../../animations';

const Banner = () => {
  return (
    <div className="banner">
      <motion.p
        className="banner__title"
        variants={variantLandingHeader}
        initial="initial"
        animate="animate"
      >
        Welcome to <span className="banner__primary">Amity</span>
      </motion.p>
      <div className="banner__container">
        <p className="banner__intro">
          We are putting <span className="banner__secondary">social</span> back
          into your worklife.
        </p>
      </div>
      <motion.section
        className="cards"
        variants={variantLanding}
        initial="initial"
        animate="animate"
      >
        <AccentButton to="/register" className="banner__margin">
          Join Now
        </AccentButton>
        <GrayOutlinedButton to="/login" className="banner__margin">
          Login
        </GrayOutlinedButton>
      </motion.section>
      <motion.div
        className="banner__container"
        variants={variantLanding}
        initial="initial"
        animate="animate"
      >
        <p className="banner__text">
          We are social beings living in a digital era, why should working
          remotely stop us from beeing social with our colleges? It should not!
        </p>
      </motion.div>
    </div>
  );
};

export default Banner;

// <p className="banner__text">
// Meet with your friends and family over the internet or find new friends via our 'matcher'. You can chat by text, audio or video, discuss interesting topics, solve puzzles or play games together.
// </p>

// <p className="banner__intro">This is where digital meets occur.</p>;
