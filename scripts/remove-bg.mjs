import { Jimp } from "jimp";

const BG = 0x5b1a1fff; // app burgundy

const img = await Jimp.read("/Users/user/Downloads/lumen-icon.png");

img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
  const r = this.bitmap.data[idx];
  const g = this.bitmap.data[idx + 1];
  const b = this.bitmap.data[idx + 2];
  // Replace white and near-white pixels with burgundy
  if (r > 220 && g > 220 && b > 220) {
    this.bitmap.data[idx]     = 0x5b;
    this.bitmap.data[idx + 1] = 0x1a;
    this.bitmap.data[idx + 2] = 0x1f;
    this.bitmap.data[idx + 3] = 255;
  }
});

// Save 512x512 version
img.resize({ w: 512, h: 512 });
await img.write("/Users/user/Downloads/play-store-icon-512.png");
console.log("Done — saved to ~/Downloads/play-store-icon-512.png");
