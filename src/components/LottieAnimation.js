import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from '../animation.json';

const LottieAnimation = () => {
  useEffect(() => {
    const container = document.getElementById('lottie-container');
    
    if (container) {
      // Set up the animation
      const anim = lottie.loadAnimation({
        container,
        renderer: 'svg', // Use 'svg' or 'canvas'
        loop: true,
        autoplay: true,
        animationData,
      });

      // Optional: Set animation speed
      anim.setSpeed(1.5);
    }
  }, []);

  return <div id="lottie-container" style={{ width: '100%', height: '100%' }} />;
};

export default LottieAnimation;