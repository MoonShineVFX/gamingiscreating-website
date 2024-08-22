import React, { useState, useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';

const HomeCarousel = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [showData, setShowData] = useState(data[index]);
  let r2url = 'https://r2.web.moonshine.tw/msweb/roggamercard/'
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % data.length);
    }, 3000); // 3秒钟切换一次图片

    return () => clearInterval(intervalId);
  }, [data.length]);

  useEffect(() => {
    // 检查是否需要更新 showData
    if (showData.id !== data[index].id) {
      setShowData(data[index]);
    }
  }, [index, data, showData]);
  return (
    <div className="relative w-full h-full">
      <AnimatePresence initial={true}>
      {showData && (
        <motion.img
          key={showData.id}
          src={`${r2url}templates/character/${showData.type}/${showData.name}.png`}
          alt="mbti avatar"
          className="w-full origin-top"
          initial={{ opacity: 0,x:'-60%' , scale:1.5,y:'10%' }} 
          animate={{ opacity: 1,x:'-60%', scale:1.5,y:'10%', transition:{delay:'0.3',type: 'spring', stiffness: 200, damping: 50} }}
          exit={{   opacity: 0,x:'-60%', scale:1.5,y:'10%', transition:{delay:0,type: 'spring'} }} 
        />
      )}
      </AnimatePresence>
    </div>
  )
}

export default HomeCarousel