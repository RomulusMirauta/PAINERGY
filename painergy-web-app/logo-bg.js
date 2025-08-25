// Update logo1_cropped.png background to #0d1117 and save as logo1_cropped_bg.png
// Requires: npm install sharp

const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'src', 'img', 'logo1_cropped.png');
const outputPath = path.join(__dirname, 'src', 'img', 'logo1_cropped_bg.png');

sharp(inputPath)
  .metadata()
  .then(({ width, height }) => {
    return sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 13, g: 17, b: 23, alpha: 1 }
      }
    })
      .composite([{ input: inputPath }])
      .png()
      .toFile(outputPath);
  })
  .then(() => {
    console.log('Logo with forced background saved to', outputPath);
  })
  .catch(err => {
    console.error('Error updating logo background:', err);
  });
