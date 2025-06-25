import React from 'react';
import videoSrc from '../assets/video/home.mp4';

const VideoBackground = ({ children }) => {
  return (
    <div className="video-container">
      <video
        className="video-bg"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
      {children}
    </div>
  );
};

export default VideoBackground;
