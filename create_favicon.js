#!/usr/bin/env node
/**
 * Create proper favicon files from the Intelllx logo
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicons() {
  const sourceLogo = 'public/images/logo/Intelllxherologo.png';
  
  if (!fs.existsSync(sourceLogo)) {
    console.error(`Error: Source logo not found at ${sourceLogo}`);
    process.exit(1);
  }
  
  try {
    console.log('Creating favicons from Intelllx logo...\n');
    
    // Create 16x16 favicon
    console.log('Creating 16x16 favicon...');
    await sharp(sourceLogo)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/favicon-16x16.png');
    
    // Create 32x32 favicon
    console.log('Creating 32x32 favicon...');
    await sharp(sourceLogo)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/favicon-32x32.png');
    
    // Create favicon.ico (using 32x32 as base)
    console.log('Creating favicon.ico...');
    await sharp(sourceLogo)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFormat('png')
      .toFile('public/favicon.ico');
    
    // Create apple-touch-icon (180x180)
    console.log('Creating apple-touch-icon...');
    await sharp(sourceLogo)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/apple-touch-icon.png');
    
    // Create a general favicon.png (512x512)
    console.log('Creating favicon.png (512x512)...');
    await sharp(sourceLogo)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/favicon.png');
    
    console.log('\n✅ All favicons created successfully!\n');
    
    // Show file sizes
    console.log('File sizes:');
    const files = ['favicon-16x16.png', 'favicon-32x32.png', 'favicon.ico', 'apple-touch-icon.png', 'favicon.png'];
    for (const filename of files) {
      const filepath = path.join('public', filename);
      if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`  ${filename}: ${stats.size.toLocaleString()} bytes (${sizeKB} KB)`);
      }
    }
    
  } catch (error) {
    console.error('Error creating favicons:', error);
    process.exit(1);
  }
}

createFavicons();

