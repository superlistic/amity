import React, { useEffect, useRef } from 'react';
import './Video.css';

const Video = ({ localVideo }) => {
  // const localVideo = useRef();
  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then(stream => {
  //       localVideo.current.srcObject = stream;
  //     });
  // }, []);

  return (
    <div className="video">
      <video
        autoPlay
        muted
        className="local-video"
        id="local-video"
        ref={localVideo}
      />
    </div>
  );
};

export default Video;
