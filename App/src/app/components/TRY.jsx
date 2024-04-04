// components/ImageGallery.js
import React, { useState, useEffect } from 'react';



const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
   let s = "97801121021103"

   console.log(s.split('').reverse().join(''));
    // Fetch the list of image paths from the server
    const fetchImages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/fet');
        if (response.ok) {
          const data = await response.json();
          setImages(data.images);
        } else {
          console.error('Error fetching images');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      {images.map((image, index) => (
        <>
          
          <img key={index} src={image} alt={`Image ${index + 1}`} style={{ maxWidth: '300px', margin: '10px' }} />
        </>
      ))}
    </div>
  );
};

export default ImageGallery;
