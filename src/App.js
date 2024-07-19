import React from 'react';
import './App.css';
import Gallery from './Gallery';


function App() {
  return (
    <div className="App">
      <h1>Welcome to the Magical World of Misifu and Cloe</h1>
      
      <div className="banner-container">
        <img className="banner" src={'/images/cloeBannerImage.jpg'} alt="Cloe" />
        <img className="banner" src={'/images/misifloeBannerImage.jpg'} alt="Cloe" />
        <img className="banner" src={'/images/misifuBannerImage.jpg'} alt="Misifu" />
      </div>      

      <Gallery />

    </div>
  );
}

export default App;