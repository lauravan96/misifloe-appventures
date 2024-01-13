// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/gatos', (req, res) => {
  res.json({ gatos: ['Misifu', 'Cloe'] });
});

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
