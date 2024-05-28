"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { detectTypeImage, positiveFeedback } from '../../../helpers/fileHelper';
import Loading from './Loading';
import YoloObject from './YoloObject';
import Swal from 'sweetalert2';


let image_server_path = [''];
let classes = [''];
let videoUrl = [];
//car, human, sign

function UploadIVideo() {
  const [image, setImage] = useState(null);
  const [c, setc] = useState(0)
  const [fileType, setFileType] = useState(null);
  const [loading, setloading] = useState(false);
  const [allowToUploaad, setUploadBtton] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const del = () => {
    axios.post('http://127.0.0.1:5000/delete', { data: image_server_path })
      .then(response => {
        console.log(response);
        console.log("deleted successfully");
      })
      .catch(error => {
        
        console.error('Error deleting:', error);
      });
  }

  const store = () => {
    axios.post('http://127.0.0.1:5000/store', { data: image_server_path })
      .then(response => {
        console.log(response.data);
        setLoading2(false);
        positiveFeedback("Saved on cloud");
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error deleting:', error);
      });
  }

  const popUp = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      allowOutsideClick: false // Prevent closing without a choice
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setLoading2(true);
        store();
       
      } else if (result.isDenied) {
        del();
      }
    });
  };

  useEffect(() => {
    setUploadBtton(fileType == "VIDEO")
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
      console.log(response);
      image_server_path = response.data.ret;
      videoUrl = response.data.ret;
      console.log(image_server_path);
      popUp();
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
          <div>
    
           {
            image_server_path.map((el, idx) => {
              return(
                <video controls width="640" height="360" key={`${el}`}>
                <source src={el} type="video/webm" />
                Your browser does not support the video tag.
              </video>
              )
            })
           }
         

          </div>
        )
      }

      {
        (loading2)?(
          < Loading />
        ):(
          ""
        )
      }
    </div>
  );
}

export default UploadIVideo;
