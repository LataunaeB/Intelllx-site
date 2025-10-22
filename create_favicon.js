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
    
    // Create 48x48 for better ICO quality
    console.log('Creating 48x48 favicon...');
    const favicon48Buffer = await sharp(sourceLogo)
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toBuffer();
    
    // For .ico, we'll use the 32x32 PNG (browsers accept PNG format in .ico files)
    const favicon32Buffer = await sharp(sourceLogo)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    
    fs.writeFileSync('public/favicon.ico', favicon32Buffer);
    fs.writeFileSync('src/app/favicon.ico', favicon32Buffer);
    
    // Create icon.png for Next.js App Router (32x32)
    console.log('Creating icon.png for Next.js App Router...');
    await sharp(sourceLogo)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile('src/app/icon.png');
    
    // Create apple-touch-icon (180x180)
    console.log('Creating apple-touch-icon...');
    await sharp(sourceLogo)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/apple-touch-icon.png');
    
    // Also create apple-touch-icon in src/app
    await sharp(sourceLogo)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('src/app/apple-icon.png');
    
    // Create 192x192 for PWA
    console.log('Creating 192x192 icon...');
    await sharp(sourceLogo)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/icon-192x192.png');
    
    // Create 512x512 for PWA
    console.log('Creating 512x512 icon...');
    await sharp(sourceLogo)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/icon-512x512.png');
    
    console.log('\n✅ All favicons created successfully!\n');
    
    // Show file sizes
    console.log('File sizes:');
    const files = [
      'public/favicon-16x16.png',
      'public/favicon-32x32.png',
      'public/favicon.ico',
      'src/app/favicon.ico',
      'src/app/icon.png',
      'src/app/apple-icon.png',
      'public/apple-touch-icon.png',
      'public/icon-192x192.png',
      'public/icon-512x512.png'
    ];
    
    for (const filepath of files) {
      if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`  ${filepath}: ${stats.size.toLocaleString()} bytes (${sizeKB} KB)`);
      }
    }
    
  } catch (error) {
    console.error('Error creating favicons:', error);
    process.exit(1);
  }
}

createFavicons();
