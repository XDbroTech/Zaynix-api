function generateTextEffect() {
    const text = document.getElementById('textInput').value;
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text styles
    ctx.font = '50px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Apply text effect: gradient or shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 6;

    // Draw the text on canvas
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}
