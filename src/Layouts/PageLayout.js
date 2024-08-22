import React from 'react'
import { Outlet,useLocation,Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PageLayout = () => {
  return (
    <div className='min-h-[100dvh] relative bg-black text-white bg-no-repeat bg-center bg-cover '>
      <Outlet/>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default PageLayout