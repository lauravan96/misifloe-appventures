import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Gallery from "./Gallery";

const BANNER_IMAGES = [
  `${process.env.PUBLIC_URL}/images/cloeBannerImage.jpg`,
  `${process.env.PUBLIC_URL}/images/misifloeBannerImage.jpg`,
  `${process.env.PUBLIC_URL}/images/misifuBannerImage.jpg`,
];

export default function App() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // Avance automático
  useEffect(() => {
    if (BANNER_IMAGES.length < 2) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % BANNER_IMAGES.length);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Accesibilidad: controles de teclado (← →)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % BANNER_IMAGES.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to the Magical World of Misifu and Cloe</h1>

      <div
        className="banner-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="Banner de Misifú y Cloe"
      >
        <ul className="slides" aria-live="polite">
          {BANNER_IMAGES.map((src, i) => (
            <li
              key={src}
              className={`slide ${i === index ? "active" : ""}`}
              aria-hidden={i !== index}
            >
              <img className="banner" src={src} alt={i === 0 ? "Cloe" : i === 1 ? "Misifú y Cloe" : "Misifú"} loading="eager" />
            </li>
          ))}
        </ul>

        <div className="controls">
          <button
            aria-label="Anterior"
            onClick={() =>
              setIndex((i) => (i - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length)
            }
          >
            ◀
          </button>
          <span className="status">
            {index + 1}/{BANNER_IMAGES.length}
          </span>
          <button
            aria-label="Siguiente"
            onClick={() =>
              setIndex((i) => (i + 1) % BANNER_IMAGES.length)
            }
          >
            ▶
          </button>
        </div>
      </div>

      <Gallery />
    </div>
  );
}