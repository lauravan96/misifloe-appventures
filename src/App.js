import React, { useEffect } from 'react';
import './App.css';
import Gallery from './Gallery';

function App() {
  useEffect(() => {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    }

    const interval = setInterval(nextSlide, 3000); 

    showSlide(currentIndex); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to the Magical World of Misifu and Cloe</h1>
      <div className="banner-slider">
        <div className="banner-slide">
          <img className="banner" src={'/images/cloeBannerImage.jpg'} alt="Cloe" />
        </div>
        <div className="banner-slide">
          <img className="banner" src={'/images/misifloeBannerImage.jpg'} alt="Cloe" />
        </div>
        <div className="banner-slide">
          <img className="banner" src={'/images/misifuBannerImage.jpg'} alt="Misifu" />
        </div>
      </div>
      <Gallery />
    </div>
  );
}

export default App;
