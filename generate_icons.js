import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generate() {
  const svgPath = path.resolve('public/icon.svg');
  const out192 = path.resolve('public/icon-192.png');
  const out512 = path.resolve('public/icon-512.png');
  const faviconIco = path.resolve('public/favicon.ico');

  console.log('Generating PNG icons from SVG...');
  
  // Create 192x192 PNG
  await sharp(svgPath)
    .resize(192, 192)
    .png()
    .toFile(out192);
  console.log('Generated icon-192.png');

  // Create 512x512 PNG
  await sharp(svgPath)
    .resize(512, 512)
    .png()
    .toFile(out512);
  console.log('Generated icon-512.png');

  // Create 32x32 Favicon ICO
  await sharp(svgPath)
    .resize(32, 32)
    .png()
    .toFile(faviconIco);
  console.log('Generated favicon.ico (as PNG named .ico for browser compatibility)');

  console.log('All icons generated successfully!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
