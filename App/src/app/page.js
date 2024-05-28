"use client";

import Image from 'next/image'
import ImagePage from './components/Upload_image';
import ImageGallery from './components/TRY';
import axios from 'axios';
import UploadImage from './components/Upload_image';
import Loading from './components/Loading';
import Link from 'next/link'
import UploadIVideo from './components/Upload_video';
import { useState } from 'react';



export default function Home() {
  let arr = [ // all urls exists here will be deleted by clicking the button
  "https://firebasestorage.googleapis.com/v0/b/prompt-397314.appspot.com/o/media%2Fmedia%2F532714915950080.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/prompt-397314.appspot.com/o/media%2Fmedia%2F848278619491531.jpg?alt=media"
  ];
  const del = (ur) => {
    axios.post('http://127.0.0.1:5000/deletefb', { data: [ur] }).then((response) => {
      console.log(response)
    })
  }
  return (  
    <div>
      
    {
      arr.map((el, idx) => {
        return(
          <>
          <button onClick={() => del(el)}>
          deldel
          </button>
            
          < img 
            src={el}
            width={100}
            alt='ddd'
            height={100}
          />
         </>
        )
      })
    }
     

    </div>
  )
}


// : 
// ""
// 2
// : 
// ""