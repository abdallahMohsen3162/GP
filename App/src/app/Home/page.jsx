"use client";
import Image from 'next/image'
import UploadImage from '../components/Upload_image';
import UploadIVideo from '../components/Upload_video';
import "@/style/home.css"
// import UploadImage from '././components/Upload_image';


export default function Home() {
  return (
    <div className='container-fluid'>
      

      
      <UploadImage />

      
      <UploadIVideo />


      

     

    </div>
  )
}
