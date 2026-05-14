import { Jimp } from "jimp";

const img = await Jimp.read("/Users/user/Downloads/lumen-icon.png");
const { width, height } = img.bitmap;

// Find bounds of non-white content
let minX = width, minY = height, maxX = 0, maxY = 0;

img.scan(0, 0, width, height, function (x, y, idx) {
  const r = this.bitmap.data[idx];
  const g = this.bitmap.data[idx + 1];
  const b = this.bitmap.data[idx + 2];
  if (!(r > 240 && g > 240 && b > 240)) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
});

// Add a small padding
const pad = 10;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const cropW = maxX - minX;
const cropH = maxY - minY;

img.crop({ x: minX, y: minY, w: cropW, h: cropH });
img.resize({ w: 512, h: 512 });

await img.write("/Users/user/Downloads/play-store-icon-512.png");
console.log(`Cropped from (${minX},${minY}) size ${cropW}x${cropH} → 512x512`);
