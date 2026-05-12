import { Jimp } from "jimp";

const SIZE = 1024;

// Background color: deep burgundy #5b1a1f
const BG = 0x5b1a1fff;
// Gold color: #c9a84c
const GOLD = 0xc9a84cff;
// Light gold highlight: #f0d080
const GOLD_LIGHT = 0xf0d080ff;

const img = new Jimp({ width: SIZE, height: SIZE, color: BG });

// Draw a rounded rectangle feel by darkening corners slightly
// (pure jimp, no canvas — we'll keep it geometric)

// --- Draw cross ---
const CX = SIZE / 2;
const CY = SIZE / 2 - 30;
const ARM_W = 80;        // thickness of cross arms
const VERT_H = 420;      // vertical arm height
const HORIZ_W = 300;     // horizontal arm width
const HORIZ_Y_OFFSET = -60; // horizontal bar position (above center)

// Vertical arm
for (let x = CX - ARM_W / 2; x < CX + ARM_W / 2; x++) {
  for (let y = CY - VERT_H / 2; y < CY + VERT_H / 2; y++) {
    img.setPixelColor(GOLD, Math.round(x), Math.round(y));
  }
}

// Horizontal arm
for (let x = CX - HORIZ_W / 2; x < CX + HORIZ_W / 2; x++) {
  for (let y = CY + HORIZ_Y_OFFSET - ARM_W / 2; y < CY + HORIZ_Y_OFFSET + ARM_W / 2; y++) {
    img.setPixelColor(GOLD, Math.round(x), Math.round(y));
  }
}

// Add a subtle highlight line down the center of the vertical arm
for (let y = CY - VERT_H / 2 + 10; y < CY + VERT_H / 2 - 10; y++) {
  img.setPixelColor(GOLD_LIGHT, CX, Math.round(y));
  img.setPixelColor(GOLD_LIGHT, CX + 1, Math.round(y));
}

// Add a subtle highlight on horizontal arm
for (let x = CX - HORIZ_W / 2 + 10; x < CX + HORIZ_W / 2 - 10; x++) {
  img.setPixelColor(GOLD_LIGHT, Math.round(x), CY + HORIZ_Y_OFFSET);
  img.setPixelColor(GOLD_LIGHT, Math.round(x), CY + HORIZ_Y_OFFSET + 1);
}

// --- "LUMEN" text area — draw a simple arc of dots / decorative base line ---
// Draw a thin golden line under the cross as a decorative separator
const LINE_Y = CY + VERT_H / 2 + 40;
for (let x = CX - 180; x < CX + 180; x++) {
  for (let dy = 0; dy < 4; dy++) {
    img.setPixelColor(GOLD, Math.round(x), LINE_Y + dy);
  }
}

await img.write("assets/icon.png");
console.log("Icon written to assets/icon.png");
