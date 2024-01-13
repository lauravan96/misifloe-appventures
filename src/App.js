import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [gatos, setGatos] = useState([]);

  useEffect(() => {
    fetch('/api/gatos')
      .then(res => res.json())
      .then(data => setGatos(data.gatos))
      .catch(error => console.error('Error al obtener la lista de gatos', error));
  }, []);

  return (
    <div className="App">
      {/* Encabezado h1 */}
      <h1>Bienvenido al Mundo Mágico de Misifu y Cloe</h1>

      {/* Banner */}
      <div className="banner-container">
        <img className="banner" src={process.env.PUBLIC_URL + '/cloeBannerImage.jpg'} alt="Cloe" />
        <img className="banner" src={process.env.PUBLIC_URL + '/misifloeBannerImage.jpg'} alt="Cloe" />
        <img className="banner" src={process.env.PUBLIC_URL + '/misifuBannerImage.jpg'} alt="Misifu" />
      </div>

      {/* Párrafo p */}
      <p>Aventuras de gatos: {gatos.join(', ')}</p>
    </div>
  );
}

export default App;
