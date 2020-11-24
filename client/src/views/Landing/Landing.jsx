import React from 'react';
import { connect } from 'react-redux';

import './Landing.css';
import Banner from './Banner/Banner';
import GreetingCards from './GreetingCards/GreetingCards';

const Landing = () => {
  return (
    <div className="landing">
      <Banner />
      <div className="landing__overlay">
        <div className="fullscreen-video-wrap">
          <video
            src="./static/landingVideo.mp4"
            autoplay="true"
            loop
            muted
            height="60vh"
            width="100vw"
          />
        </div>
      </div>
      <GreetingCards />
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Login?
});

export default connect(mapStateToProps, {})(Landing);

//

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

//Video
// <div>
//       <Banner />
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

//css Video
// .landing {
// }

// .landing__video {
//   height: 60vh;
//   display: flex;
//   align-items: center;
//   z-index: -1;
// }
// .landing__container {
//   z-index: 2;
// }

// .fullscreen-video-wrap {
//   position: absolute;
//   /* top: 4.1rem; */
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 80vh;
//   overflow: hidden;
//   z-index: -1;
// }
// .fullscreen-video-wrap video {
//   min-width: 100%;
//   min-height: 100%;
//   object-fit: cover;
// }

// .landing__overlay {
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100vh;
//   width: 100vw;
//   background: #2667ff;
//   z-index: 1;
//   opacity: 0.7;
// }

//image
// <div>
// <div className="landing__bg">
//   <Banner />
//   </div>
// </div>

//CSS image

// .landing__bg {
//   position: absolute;
//   top: 0;
//   left: 0;
//   background-image: url("bg2.jpg");
//   height:70vh;
//   background-size: cover;
//   z-index: 1;
// }
