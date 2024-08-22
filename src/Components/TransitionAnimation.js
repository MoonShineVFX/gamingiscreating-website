import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const TransitionAnimation = ({isMobile,showAnimation,jsonData}) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (!isMobile && showAnimation) {
      lottie.loadAnimation({
        container: animationContainer.current,
        animationData: jsonData,
        animType: 'svg',
        autoplay: true,
        loop: false, // 根据需要设置循环
        rendererSettings:{
          preserveAspectRatio: 'none'
        }
   
      });
    }
  }, [isMobile, showAnimation]);

  return (
    <div className=' fixed top-0 left-0 z-[999] w-full   pointer-events-none ' >
      <div className='w-full h-screen ' ref={animationContainer}></div>
    </div>
  )
}

export default TransitionAnimation