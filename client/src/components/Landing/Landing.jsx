import React from 'react';
import { connect } from 'react-redux';
import './Landing.css';
import Banner from './Banner/Banner';

const Landing = () => {
  return (
    <div>
      <Banner />
      <div className="landing__video container">
        <div className="fullscreen-video-wrap">
          <div className="landing__overlay">
            <video
              src="./static/landing.mp4"
              autoplay="true"
              loop
              muted
              height="60vh"
              width="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  //Login?
});

export default connect(mapStateToProps, {})(Landing);

// <div>
//       <div className="landing">
//         <p className="landing__title">Welcome to Togetherness</p>
//         <section className="cards">
//           <div className="card">
//             <button className="landing__login">Login</button>
//           </div>
//           <div className="card">
//             <button className="landing__register">Register for free</button>
//           </div>
//         </section>
//         <div className="landing__container">
//           <p className="landing__text">
//             Togetherness is where digital meets occur.
//           </p>
//           <p className="landing__text">
//             We are social beings living in a digital era, let us be more social
//             together!
//           </p>
//         </div>
//       </div>
//       <div className="landing__video container">
//         <div className="fullscreen-video-wrap">
//           <div className="landing__overlay">
//             <video
//               src="./static/landing.mp4"
//               autoplay="true"
//               loop
//               muted
//               height="60vh"
//               width="100vw"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
