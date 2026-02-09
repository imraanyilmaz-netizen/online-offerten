import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicPath = path.join(rootDir, 'public');

const sourceImage = path.join(publicPath, 'favicon-source.jpg');
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'favicon-192x192.png' },
  { size: 512, name: 'favicon-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

async function generateFavicons() {
  try {
    if (!fs.existsSync(sourceImage)) {
      console.error('❌ Source image not found:', sourceImage);
      process.exit(1);
    }

    console.log('🔄 Generating favicon files from source image...');

    for (const { size, name } of sizes) {
      const outputPath = path.join(publicPath, name);
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      console.log(`✅ Created ${name} (${size}x${size})`);
    }

    console.log('✅ All favicon files generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

