// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Datos mock (coinciden con tus imágenes en /public/images)
const PHOTOS = [
  { id: 'p1', src: '/images/cloePlaying.jpg',  alt: 'Cloe playing',              tags: ['cloe'] },
  { id: 'p2', src: '/images/misiSleeping.jpg', alt: 'Misifu sleeping',           tags: ['misifu'] },
  { id: 'p3', src: '/images/misiANDcloe.jpg',  alt: 'Misifu and Cloe together',  tags: ['misifu','cloe','both'] },
  { id: 'p4', src: '/images/misiReading.jpg',  alt: 'Misifu reading',            tags: ['misifu'] },
];

// Salud
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'misifloe-api', ts: Date.now() }));

// Listado de fotos
app.get('/api/photos', (req, res) => {
  const { tag } = req.query; // e.g. /api/photos?tag=cloe
  if (!tag) return res.json(PHOTOS);
  const lower = String(tag).toLowerCase();
  return res.json(PHOTOS.filter(p => p.tags.includes(lower)));
});

// Una foto (por si quieres ampliar)
app.get('/api/photos/:id', (req, res) => {
  const photo = PHOTOS.find(p => p.id === req.params.id);
  if (!photo) return res.status(404).json({ error: 'Not found' });
  res.json(photo);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
