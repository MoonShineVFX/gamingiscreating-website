import React, { useState, useRef,useEffect } from 'react';

const captureImage = (videoRef, imgRef) => {
  if (!videoRef.current || !imgRef.current) {
    console.error('Video or image element is not available.');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;
  canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
  const imgUrl = canvas.toDataURL('image/png');
  imgRef.current.src = imgUrl;
};


const CameraCapture = ({ videoRef, imgRef }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    // Clean up function to stop the camera when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef]);

  return (
    <div className="  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-30" >
      <video ref={videoRef} 
        className="w-[225px] h-[400px] " 
        style={{ display: isStreaming ? 'block' : 'none'}}
        autoPlay muted />
    </div>
  );
};

export  { CameraCapture, captureImage };
