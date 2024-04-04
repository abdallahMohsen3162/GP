
"use client";
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

let arr = [''];

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [c, setc] = useState(0)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('http://127.0.0.1:80/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      arr = response.data.message;
      setc(c + 1);
      console.log(arr);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    
      <div>
        <input type="file" accept="image/*,video/*" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload Image</button>
      </div>

      <div className='images'>
      {
        (c)?(
          arr.map((el, idx) => {
            return(
              <div className='box' key={el}>
                <img src={el} alt="" />
              </div>
            )
          })
        ):(
          ""
        )
      }
      </div>
      
    </div>
  );
};

export default UploadImage;
