// /api/photos.js
module.exports = (req, res) => {
  const PHOTOS = [
    { id: 'p1', src: '/images/cloePlaying.jpg',  alt: 'Cloe playing',              tags: ['cloe'] },
    { id: 'p2', src: '/images/misiSleeping.jpg', alt: 'Misifu sleeping',           tags: ['misifu'] },
    { id: 'p3', src: '/images/misiANDcloe.jpg',  alt: 'Misifu and Cloe together',  tags: ['misifu','cloe','both'] },
    { id: 'p4', src: '/images/misiReading.jpg',  alt: 'Misifu reading',            tags: ['misifu'] },
  ];

  const tag = String(req.query.tag || '').toLowerCase();
  const data = tag ? PHOTOS.filter(p => p.tags.includes(tag)) : PHOTOS;
  res.status(200).json(data);
};
