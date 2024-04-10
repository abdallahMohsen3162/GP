"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { detectTypeImage, positiveFeedback } from '../../../helpers/fileHelper';
import Loading from './Loading';
import YoloObject from './YoloObject';
import Swal from 'sweetalert2';


let image_server_path = [''];
let classes = [''];
//car, human, sign

function UploadIVideo() {
  const [image, setImage] = useState(null);
  const [c, setc] = useState(0)
  const [fileType, setFileType] = useState(null);
  const [loading, setloading] = useState(false);
  const [allowToUploaad, setUploadBtton] = useState(false);


  useEffect(() => {
    setUploadBtton(fileType == "VIDEO")
    console.log(fileType == "VIDEO");
  }, [fileType])

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    setImage(file);
    if (file) {
      setFileType(detectTypeImage(file.name).toLocaleUpperCase())
    }
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage(file);


    if (file) {
      setFileType(detectTypeImage(file.name).toLocaleUpperCase())
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  }


  const handleUpload = async () => {
    if(!image){
      return;
    }
    setloading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('http://127.0.0.1:5000/upload_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setloading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handlefocus = (i) => {
  //   setSpecial(i);
  // }

  return (
    <div className='images-yolo'>
      <div
        className='drag-drop'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
      >
        <p>Drag and drop a video here or click to browse</p>
        <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        <button className='button browse-btn' onClick={() => document.querySelector('input[type="file"]').click()}>Browse</button>
        {
          (fileType)?(
            <p>{fileType} File Detected</p>
          ):(
            ""
          )
        }
      </div>
      {
        (allowToUploaad)?(
          <button className='button save-btn' onClick={handleUpload}>Upload Image</button>
        ):('')
      }


      {
        (loading)?(
          < Loading />
        ):(
          ""
        )
      }
    </div>
  );
}

export default UploadIVideo;
