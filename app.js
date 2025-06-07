const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const iconsDir = path.join(__dirname, 'public', 'svg', 'icons');

app.use(express.static('public'));

app.get('/', (req, res) => {
  fs.readdir(iconsDir, (err, files) => {
    if (err) {
      console.error("Gagal membaca direktori ikon:", err);
      return res.status(500).render('index', { 
        svgFiles: [],
        error: "Tidak dapat memuat ikon dari direktori." 
      });
    }

    // Filter untuk hanya mengambil file dengan ekstensi .svg
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');

    res.render('index', { svgFiles: svgFiles });
  });
});

app.listen(port, () => {
  console.log(`Aplikasi EJS berjalan di http://localhost:${port}`);
});