import { Jimp } from "jimp";

const W = 1024;
const H = 500;
const BG = 0x3a0f12ff;       // deep dark burgundy
const BURGUNDY = 0x5b1a1fff;
const GOLD = 0xc9a84cff;

// Background
const img = new Jimp({ width: W, height: H, color: BG });

// Subtle gradient-like center glow — lighten center pixels
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const dx = (x - W / 2) / (W / 2);
    const dy = (y - H / 2) / (H / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const glow = Math.max(0, 1 - dist * 1.2);
    if (glow > 0) {
      const r = Math.min(255, 0x3a + Math.round(glow * 0x25));
      const g = Math.min(255, 0x0f + Math.round(glow * 0x0a));
      const b = Math.min(255, 0x12 + Math.round(glow * 0x0d));
      const color = (r << 24) | (g << 16) | (b << 8) | 0xff;
      img.setPixelColor(color >>> 0, x, y);
    }
  }
}

// Load and paste the icon on the left side
const icon = await Jimp.read("/Users/user/Downloads/lumen-icon.png");
icon.resize({ w: 340, h: 340 });
img.composite(icon, 60, (H - 340) / 2);

// Draw gold decorative line to the right of icon
const lineX = 440;
for (let y = 60; y < H - 60; y++) {
  img.setPixelColor(GOLD, lineX, y);
  img.setPixelColor(GOLD, lineX + 1, y);
}

// Draw "LUMEN" text as thick gold pixels (block letters)
// We'll use a simple dot-matrix style for the title
// Instead, draw a gold horizontal bar as a design element
const barY = 160;
for (let x = 470; x < 970; x++) {
  for (let dy = 0; dy < 3; dy++) {
    img.setPixelColor(GOLD, x, barY + dy);
  }
}

// Draw bottom gold bar
const barY2 = 310;
for (let x = 470; x < 970; x++) {
  for (let dy = 0; dy < 3; dy++) {
    img.setPixelColor(GOLD, x, barY2 + dy);
  }
}

// Small cross symbol above text area
const cx = 720, cy = 120;
for (let i = -18; i <= 18; i++) {
  for (let t = -4; t <= 4; t++) {
    img.setPixelColor(GOLD, cx + t, cy + i);
    img.setPixelColor(GOLD, cx + i, cy + t - 5);
  }
}

await img.write("/Users/user/Downloads/feature-graphic.png");
console.log("Feature graphic written to ~/Downloads/feature-graphic.png");
