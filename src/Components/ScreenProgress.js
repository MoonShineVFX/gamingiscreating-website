import React, { useEffect, useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player'
import { toast } from 'react-toastify';
import { HiOutlineReply } from "react-icons/hi";
function ScreenProgress({ immediateComplete }) {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  let r2imagesurl = 'https://r2.web.moonshine.tw/opt/md/msweb/roggamercard'
  let r2gifurl = 'https://r2.web.moonshine.tw/msweb/roggamercard'
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    const waitForCssLoad = setTimeout(() => {
      setIsMobile(window.innerWidth < 768);
    }, 100); // 100ms 等待时间

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(waitForCssLoad);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const Msg =()=>(
    <div className='flex gap-2 '>
      <p >Extended wait time detected. <a className=' underline flex items-center  gap-1' href="/character"> <HiOutlineReply /> Please retry the operation.</a> </p>
      
    </div>
  )

  

  useEffect(() => {
    // 在组件加载后开始计时
    const timeoutId = setTimeout(() => {
      // 时间到达后，显示通知
      toast.info(<Msg/>, {
        autoClose: 60000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }, 120000); // 180秒 = 180000毫秒

    // 清除计时器以防止内存泄漏
    return () => clearTimeout(timeoutId);
  }, []); // 仅在组件加载时运行一次

  useEffect(() => {
    if (!immediateComplete) {
      setProgress(100);
    } else {
      // 首先，创建一个增加到80%的计时器
      const intervalTo80 = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 80) {
            return prevProgress + 1;
          } else {
            // 一旦达到80%，清除这个计时器
            clearInterval(intervalTo80);
            // 然后，设置另一个计时器从80%慢慢增加到90%
            const timeoutToStartNext = setTimeout(() => {
              const intervalTo90 = setInterval(() => {
                setProgress((prevProgress) => {
                  if (prevProgress < 99) {
                    return prevProgress + 1;
                  } else {
                    // 一旦达到90%，清除这个计时器
                    clearInterval(intervalTo90);
                    return prevProgress; // 这里保持在90%不变
                  }
                });
              }, 200); // 从80%到90%的速度也是每100毫秒增加1%
              clearTimeout(timeoutToStartNext); // 清除延时启动的计时器
            }, 500); // 假设在到达80%后，我们等待2000毫秒（2秒）再继续增加到90%
            return prevProgress; // 在达到80%时保持不变，直到下一阶段开始
          }
        });
      }, 200); // 初始阶段每100毫秒增加1%，直到达到80%
    }

  }, [immediateComplete]);

  return (
    <div           
      className=' fixed top-0 left-0 w-full h-screen  bg-black flex justify-center items-center z-[999]  bg-cover bg-center bg-no-repeat'
      style={{
        // backgroundImage: `url('${r2imagesurl+'/images/camera_bg.png'}')`,
      }}
    >
      {isMobile ? (
      <>
        {/* <div className=" fixed w-full h-[100dvh] top-0 left-0 -z-10 overflow-hidden">
          <div className=" absolute w-full h-0 top-0 left-0 pb-[177%] clear-both">
            <iframe
              src="https://player.vimeo.com/video/952184920?background=1&autoplay=1&loop=1&byline=0&title=0&quality=1080p"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Vimeo Video"
              className=' absolute top-0 left-0 w-full h-full'
            ></iframe>
          </div>
        </div> */}
        <div className="vimeo-wrapper">
          <ReactPlayer
            url="https://r2.web.moonshine.tw/msweb/roggamercard/videos/mb_loading.mp4"
            className='react-player'
            playing
            playsinline
            muted
            loop
            width='100vw'
            height='56.25vw'
            config={{ vimeo: { playerOptions: { background: true }}}}
          />
        </div>
        <motion.div 
          initial={{ opacity: 0,x:'-50%',y:-20  }} 
          animate={{ opacity: 1,x:'-50%' ,y:0}}
          exit={{   opacity: 0,x:'-50%' ,y:-20 }} 
          transition={{ type: 'spring', stiffness: 130, damping: 20,delay: 0.3 }} 
          className=' fixed bottom-10 max-w-full w-[90%]   z-40 left-1/2' 
        >
          <div className='w-full relative'>
            <div className="progress-bar flex items-center font-robotocon text-[4.5vw] text-white/80 mb-5" >
              <div>GENERATING...</div>
              {progress}%
            </div>
            <img src={r2gifurl+'/images/mb/loading_ui_mb.svg'} alt="" className='w-full' />

          </div>

        </motion.div>
      </>
      ):(
      <>
        <div className=" fixed w-full h-full top-0 left-0 -z-10 overflow-hidden">
          <div className=" absolute w-full h-0 top-0 left-0 pb-[56.2%] clear-both">
            <iframe
              src="https://player.vimeo.com/video/951924287?background=1&autoplay=1&loop=1&byline=0&title=0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Vimeo Video"
              className=' absolute top-0 left-0 w-full h-full'
            ></iframe>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0,x:'-50%',y:-20  }} 
          animate={{ opacity: 1,x:'-50%' ,y:0}}
          exit={{   opacity: 0,x:'-50%' ,y:-20 }} 
          transition={{ type: 'spring', stiffness: 130, damping: 20,delay: 0.3 }} 
          className=' absolute bottom-24 max-w-full w-4/5   z-40 left-1/2' 
        >

          <div className='w-full relative'>
            <img src={r2gifurl+'/images/loading_ui.png'} alt="" className='w-full' />
            <div className="progress-bar flex items-center font-cachet absolute bottom-5 right-0 text-[1vw]" >
              <div>GENERATING...</div>
              {progress}%
            </div>
          </div>

        </motion.div>
      </>
      
      )}


       

    </div>
  );
}

export default ScreenProgress;
