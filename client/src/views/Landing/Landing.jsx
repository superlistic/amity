import React from 'react';
import { connect } from 'react-redux';

import './Landing.css';
import Banner from './Banner/Banner';
import BannerFooter from './BannerFooter/BannerFooter';

const Landing = () => {
  return (
    <div className="landing">
      <div className="fullscreen-video-wrap">
        <video
          className="landing__video"
          src="./static/landingVideo.mp4"
          autoPlay
          loop
          muted
          height="100vh"
          width="100vw"
        />
        <div className="landing__overlay"></div>
        <Banner />
        <span className="material-icons landing__down-arrow">
          keyboard_arrow_down
        </span>
      </div>
      <BannerFooter />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Landing);

// <div className="landing">
//     <Banner />
//     <div className="landing__overlay">
//       <div className="fullscreen-video-wrap">
//         <video
//           src="./static/landingVideo.mp4"
//           autoPlay
//           loop
//           muted
//           height="66vh"
//           width="100vw"
//         />
//       </div>
//     </div>
//     <GreetingCards />
