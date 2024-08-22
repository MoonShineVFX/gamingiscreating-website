import React,{useEffect, useState} from 'react'
import { motion,AnimatePresence } from 'framer-motion';
const BigwinAnimation = ({setShowBanner}) => {
  const [isMobile, setIsMobile] = useState(false);

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
  return (
    <>
     {isMobile ? (
      <AnimatePresence initial={true}>
      <motion.div  
        initial={{ opacity: 0  }} 
        animate={{ opacity: 1 }}
        exit={{   opacity: 0 }} 
        className=' fixed top-0 left-0  z-[999] w-full h-screen  bg-purple-600/0  overflow-hidden '>


        <motion.div 
          initial={{ opacity: 0 ,y:'-50%',scale:1.5 }} 
          animate={{ opacity: 1,y:'-50%',scale:1.24  }}
          exit={{   opacity: 0,y:'-50%',scale:1.24}} 
          transition={{ type: 'spring', stiffness: 1030, damping: 80,delay: 0.1 }} 
          className=' fixed  top-1/2 left-0 w-full z-0 bg-red-600/0 '
        >
        <img src={process.env.PUBLIC_URL+'/images/mb/final_win_banner_02.png'} alt=""  className='w-full'/>
          <motion.div 
            initial={{ opacity: 0,scale:2,y:100,x:'-50%'}} 
            animate={{ opacity: 1,scale:1,y:0,x:0 }}
            exit={{   opacity: 0,scale:2 ,y:100,x:'-50%'}} 
            transition={{ type: 'spring', stiffness: 1030, damping: 70,delay: 0.5 }} 
            className=' fixed top-[49%] -left-[40%] w-[120%] z-10  origin-top '
          >
            <img src={process.env.PUBLIC_URL+'/images/win_glare.png'} alt=""  className='w-full'/>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 ,scale:1 ,y:-100,x:'50%' }} 
            animate={{ opacity: 1,scale:1,y:'0' ,x:0}}
            exit={{   opacity: 0 ,scale:1,y:-100,x:'50%' }} 
            transition={{ type: 'spring', stiffness: 1030, damping: 70,delay: 0.5 }} 
            className=' fixed -top-[3%] right-[-32%] w-[120%] z-10'
          >
          <img src={process.env.PUBLIC_URL+'/images/win_glare.png'} alt=""  className='w-full'/>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0,scale:0  }} 
            animate={{ opacity: 1,x:0,y:'0%',scale:1 }}
            exit={{   opacity: 0 }} 
            transition={{ type: 'spring', stiffness: 1200, damping: 80,delay: 0.5 }} 
            className=' absolute top-[40%] left-[8%] w-[16%]'
          >
          <img src={process.env.PUBLIC_URL+'/images/win_star.png'} alt=""  className='w-full'/>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0,scale:0  }} 
            animate={{ opacity: 1,x:0,y:'0%',scale:1 }}
            exit={{   opacity: 0 }} 
            transition={{ type: 'spring', stiffness: 1200, damping: 80,delay: 0.5 }} 
            className=' absolute top-[34%] right-[17%] w-[16%]'
          >
          <img src={process.env.PUBLIC_URL+'/images/win_star.png'} alt=""  className='w-full'/>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0,x:'0%',y:'0%'  }} 
            animate={{ opacity: 1,x:0,y:'0%' }}
            exit={{   opacity: 0 ,y:'10%'}} 
            // whileHover={{scale:1.1}}
            // whileTap={{scale:1.1}}
            transition={{ type: 'spring', stiffness: 130, damping: 20,delay: 1 }} 
            className=' absolute top-[5%] right-[16%] z-50 w-[18%] cursor-pointer'
            onClick={()=>{setShowBanner(false)}}
          >
          <img src={process.env.PUBLIC_URL+'/images/bigwin_closebtn2x.png'} alt=""  className='w-full'/>
          </motion.div>
        </motion.div>





        


      </motion.div>
      </AnimatePresence>
     ):(
      <motion.div  
        initial={{ opacity: 0,x:"-50%",y:'-50%'  }} 
        animate={{ opacity: 1,x:"-50%",y:'-50%' }}
        exit={{   opacity: 0 ,x:"-50%",y:'-50%'}} 
        className=' absolute top-1/2 left-1/2 z-[999] w-[50%]    bg-purple-600/0  md:overflow-visible '>
        <motion.div 
          initial={{ opacity: 0,x:'-20%',y:'20%'  }} 
          animate={{ opacity: 1,x:0,y:'0%' }}
          exit={{   opacity: 0 ,y:'10%'}} 
          // whileHover={{scale:1.1}}
          // whileTap={{scale:1.1}}
          transition={{ type: 'spring', stiffness: 130, damping: 20,delay: 1.5 }} 
          className=' absolute top-[11%] right-[23%] z-50 w-[12%] cursor-pointer'
          onClick={()=>{setShowBanner(false)}}
        >
        <img src={process.env.PUBLIC_URL+'/images/bigwin_closebtn2x.png'} alt=""  className='w-full drop-shadow-xl'/>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0,x:'-20%',y:'20%'  }} 
          animate={{ opacity: 1,x:0,y:'0%' }}
          exit={{   opacity: 0 ,y:'10%'}} 
          transition={{ type: 'spring', stiffness: 130, damping: 20,delay: 0.5 }} 
          className=' absolute top-[22%] left-[22.5%] w-[34%]'
        >
        <img src={process.env.PUBLIC_URL+'/images/win_text_top.png'} alt=""  className='w-full'/>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0,x:'-20%',y:'20%'  }} 
          animate={{ opacity: 1,x:0,y:'0%' }}
          exit={{   opacity: 0 ,y:'10%'}} 
          transition={{ type: 'spring', stiffness: 130, damping: 20,delay: 0.5 }} 
          className=' absolute bottom-[8%] left-[22.5%] w-1/2'
        >
        <img src={process.env.PUBLIC_URL+'/images/win_text_bottom.png'} alt=""  className='w-full'/>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0,x:'50%',y:'-30%'  }} 
          animate={{ opacity: 1,x:0,y:'0%' }}
          exit={{   opacity: 0 ,y:'10%'}} 
          transition={{ type: 'spring', stiffness: 1030, damping: 80,delay: 0 }} 
          className=' absolute top-[26%] left-[22%] w-[45%]'
        >
        <img src={process.env.PUBLIC_URL+'/images/win_bigwin_top.png'} alt=""  className='w-full'/>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0,x:'-50%',y:'40%'  }} 
          animate={{ opacity: 1,x:0,y:'0%' }}
          exit={{   opacity: 0 ,y:'10%'}} 
          transition={{ type: 'spring', stiffness: 1030, damping: 80,delay: 0 }} 
          className=' absolute top-[52%] left-[22%] w-[45%]'
        >
        <img src={process.env.PUBLIC_URL+'/images/win_bigwin_bottom.png'} alt=""  className='w-full'/>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0,scale:2}} 
          animate={{ opacity: 1,scale:1 }}
          exit={{   opacity: 0,scale:2 }} 
          transition={{ type: 'spring', stiffness: 530, damping: 70,delay: 0.5 }} 
          className=' absolute top-[49%] left-[-43%] w-[125%] z-10  '
        >
          <img src={process.env.PUBLIC_URL+'/images/win_glare.png'} alt=""  className='w-full'/>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 ,scale:1  }} 
          animate={{ opacity: 1,scale:1 }}
          exit={{   opacity: 0 ,scale:1 }} 
          transition={{ type: 'spring', stiffness: 530, damping: 70,delay: 0.5 }} 
          className=' absolute top-[-11%] right-[-27%] w-[125%] z-10'
        >
        <img src={process.env.PUBLIC_URL+'/images/win_glare.png'} alt=""  className='w-full'/>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0,scale:0  }} 
          animate={{ opacity: 1,x:0,y:'0%',scale:1 }}
          exit={{   opacity: 0 }} 
          transition={{ type: 'spring', stiffness: 1200, damping: 80,delay: 0.5 }} 
          className=' absolute top-[44%] left-[6%] w-[16%]'
        >
        <img src={process.env.PUBLIC_URL+'/images/win_star.png'} alt=""  className='w-full'/>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0,scale:0  }} 
          animate={{ opacity: 1,x:0,y:'0%',scale:1 }}
          exit={{   opacity: 0 }} 
          transition={{ type: 'spring', stiffness: 1200, damping: 80,delay: 0.5 }} 
          className=' absolute top-[31%] right-[19%] w-[16%]'
        >
        <img src={process.env.PUBLIC_URL+'/images/win_star.png'} alt=""  className='w-full'/>
        </motion.div>
        
        <div className=' w-full'>
        <img src={process.env.PUBLIC_URL+'/images/win_back.png'} alt=""  className='w-full'/>
        </div>

      </motion.div>

     )}
    </>

  )
}

export default BigwinAnimation