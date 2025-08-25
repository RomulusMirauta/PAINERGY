// Auto-crop logo1.png to keep only the text logo: "PAINERGY"
// Requires: npm install sharp

const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'src', 'img', 'logo1.png');
const outputPath = path.join(__dirname, 'src', 'img', 'logo1_cropped.png');

// Auto-crop: detect the bounding box of non-transparent pixels
sharp(inputPath)
  .trim()
  .toFile(outputPath)
  .then(() => {
    console.log('Cropped logo saved to', outputPath);
  })
  .catch(err => {
    console.error('Error cropping logo:', err);
  });
