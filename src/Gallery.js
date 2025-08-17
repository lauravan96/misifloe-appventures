import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Gallery.css';

// util: persistencia simple en localStorage
const loadFavs = () => {
  try { return new Set(JSON.parse(localStorage.getItem('favPhotos') || '[]')); }
  catch { return new Set(); }
};
const saveFavs = (set) => localStorage.setItem('favPhotos', JSON.stringify([...set]));

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all'); // all | cloe | misifu | both
  const [favs, setFavs] = useState(loadFavs());
  const [loaded, setLoaded] = useState(new Set()); // para quitar el blur por imagen

  // Lightbox
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const closeBtnRef = useRef(null);
  const prevFocusRef = useRef(null);

  // Cargar fotos desde API
  useEffect(() => {
    const url = filter === 'all' ? '/api/photos' : `/api/photos?tag=${filter}`;
    fetch(url).then(r => r.json()).then(setPhotos).catch(() => setPhotos([]));
  }, [filter]);

  // Lightbox: manejo de foco y teclado
  useEffect(() => {
    if (!lbOpen) return;
    prevFocusRef.current = document.activeElement;
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKey = (e) => {
      if (e.key === 'Escape') setLbOpen(false);
      if (e.key === 'ArrowRight') setLbIndex((i) => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft')  setLbIndex((i) => (i - 1 + photos.length) % photos.length);
      // focus trap muy simple
      if (e.key === 'Tab') { e.preventDefault(); closeBtnRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocusRef.current && prevFocusRef.current.focus?.();
    };
  }, [lbOpen, photos.length]);

  const filtered = useMemo(() => photos, [photos]);

  const toggleFav = (id) => {
    const next = new Set(favs);
    next.has(id) ? next.delete(id) : next.add(id);
    setFavs(next);
    saveFavs(next);
    // mini-analytics
    console.log('[analytics] toggle_fav', { id, fav: next.has(id) });
  };

  const openLb = (startIndex) => {
    setLbIndex(startIndex);
    setLbOpen(true);
  };

  return (
    <section className="gallery">
      <h2>Photo Gallery</h2>

      {/* Filtros */}
      <div className="filters" role="toolbar" aria-label="Photo filters">
        {['all','cloe','misifu','both'].map(key => (
          <button
            key={key}
            className={`pill ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            data-testid={`filter-${key}`}
          >
            {key === 'all' ? 'Todas' :
             key === 'cloe' ? 'Cloe' :
             key === 'misifu' ? 'Misifú' : 'Ambas'}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="photo-grid">
        {filtered.map((p, i) => (
          <figure key={p.id} className="photo-item">
            <div className={`img-wrap ${loaded.has(p.id) ? 'loaded' : ''}`}>
              <img
                className="thumb blur-up"
                src={p.src}
                alt={p.alt}
                loading="lazy"
                onLoad={() =>
                setLoaded(prev => {
                  const next = new Set(prev);
                  next.add(p.id);
                  return next;
                })
  }
  onClick={() => openLb(i)}
              />
            </div>

            <figcaption className="meta">
              <span className="alt">{p.alt}</span>
              <button
                className={`fav ${favs.has(p.id) ? 'on' : ''}`}
                aria-pressed={favs.has(p.id)}
                aria-label={favs.has(p.id) ? `Quitar de favoritos: ${p.alt}` : `Agregar a favoritos: ${p.alt}`}
                onClick={() => toggleFav(p.id)}
              >
                {favs.has(p.id) ? '♥' : '♡'}
              </button>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox accesible */}
      {lbOpen && photos[lbIndex] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de la foto"
          onClick={(e) => e.target.classList.contains('lightbox') && setLbOpen(false)}
        >
          <div className="lightbox-inner" role="document">
            <img
              className="lightbox-image"
              src={photos[lbIndex].src}
              alt={photos[lbIndex].alt}
            />
            <div className="lb-controls">
              <button onClick={() => setLbIndex((i) => (i - 1 + photos.length) % photos.length)} aria-label="Anterior">◀</button>
              <button ref={closeBtnRef} onClick={() => setLbOpen(false)} aria-label="Cerrar">✕</button>
              <button onClick={() => setLbIndex((i) => (i + 1) % photos.length)} aria-label="Siguiente">▶</button>
            </div>
            <div className="lb-status">{lbIndex + 1}/{photos.length}</div>
          </div>
        </div>
      )}
    </section>
  );
}
