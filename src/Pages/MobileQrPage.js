import React,{useEffect} from 'react'
import { analytics } from '../firebaseConfig/fireanalytics';
import {logEvent} from "firebase/analytics";
const MobileQrPage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const a = urlParams.get('a');
  const b = urlParams.get('b');
  useEffect(()=>{
    logEvent(analytics, 'Enter_QRPage',{
      location:window.location
    })
  },[])
  return (
    <div className='h-[100vh] w-full bg-gradient-to-t from-red-900 relative sm:w-1/2 mx-auto'  >
      
      <div className='px-4 py-5 relative   bg-gradient-to-t from-red-900 via-red-900/80  bg-black'>
        <img src={process.env.PUBLIC_URL+'/images/mb/qr_top.png'} alt="" className='w-full  top-0 left-0' />
        <div 
          className=' px-8  h-full   relative bg-contain  '
          style={{
            backgroundImage: ` url('${process.env.PUBLIC_URL+'/images/mb/qr_center.png'}')`,
            backgroundRepeat:'repeat-y  ',
            backgroundOrigin:'border-box',
            backgroundClip:'padding-box'

          }}
        >

          <div className='  w-full  '>
            <img src={process.env.PUBLIC_URL+'/images/mb/qr_logo.svg'} alt="" />
            <div className='mt-5 flex flex-col gap-10'>
              {
                a ? 
                <div className='w-full aspect-[16/8] bg-slate-500 overflow-hidden rounded-md'>
                  <img src={a} alt=""  className=' object-cover'/>
                </div>
                
                :
                <div className=' bg-slate-400 w-full aspect-[16/9] '></div>
              }
              {
                b?
                <div className='  w-full aspect-[600/750] overflow-hidden rounded-md '>
                  <img src={b} alt="" className=' object-cover w-full h-full' />
                </div>
                 :
                <div className=' bg-slate-400 w-full aspect-[600/750] '></div>

              }
            </div>

          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/images/mb/qr_bottom.png'} alt="" className='w-full  top-0 left-0' />

        
      </div>
    </div>
  )
}

export default MobileQrPage