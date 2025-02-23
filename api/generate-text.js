// api/generate-text.js

const { createCanvas } = require('canvas');

module.exports = (req, res) => {
  const { text, textColor, bgColor, fontSize } = req.query;

  // Default values if not provided
  const canvasWidth = 600;
  const canvasHeight = 400;
  const fontSizeValue = fontSize || 50;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Set the background color
  ctx.fillStyle = bgColor || '#ffffff';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Set the text styles
  ctx.font = `${fontSizeValue}px Arial`;
  ctx.fillStyle = textColor || '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Apply text effect (like shadow)
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 6;

  // Draw the text
  ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

  // Return the image as a PNG
  res.setHeader('Content-Type', 'image/png');
  res.send(canvas.toBuffer('image/png'));
};
