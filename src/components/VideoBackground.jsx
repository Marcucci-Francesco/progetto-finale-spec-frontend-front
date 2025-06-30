import React from 'react';
import videoSrc from '../assets/video/home.mp4';

const VideoBackground = ({ children, overlayClassName = 'bg-dark opacity-50' }) => (
  <div className="position-relative w-100 vh-100 overflow-hidden">
    <video
      className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
    />
    <div className={`position-absolute top-0 start-0 w-100 h-100 ${overlayClassName}`} />
    <div className="position-relative z-1 h-100">
      {children}
    </div>
  </div>
);

export default VideoBackground;
