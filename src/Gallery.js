import React from 'react';
import './Gallery.css'; 

const photos = [
  { src: '/images/cloePlaying.jpg', alt: 'Cloe playing' },
  { src: '/images/misiSleeping.jpg', alt: 'Misifu sleeping' },
  { src: '/images/misiANDcloe.jpg', alt: 'Misifu and Cloe together' },
  { src: '/images/misiReading.jpg', alt: 'Misifu reading' },
    
];

function Gallery() {
  return (
    <div className="gallery">
      <h2>Photo Gallery</h2>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.src} alt={photo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;