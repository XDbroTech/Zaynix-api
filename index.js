// index.js

const express = require('express');
const app = express();
const port = 3000;
const lyricsRouter = require('./api/lyrics');



// Serve the AI API endpoint
app.use('/api', require('./api/ai-endpoint'));
app.use('/api', require('./api/gpt-endpoint'));
app.use('/api', require('./api/gemini-endpoint'));
app.use('/api', require('./api/insta-fetch'));
app.use('/api', require('./api/llama-api'));  // Added Llama API
app.use('/api', require('./api/magicai-endpoint'));
app.use('/api', require('./api/ephoto1'));
app.use('/api', require('./api/yts'));
app.use('/api', require('./api/text-detect'));
app.use('/api', require('./api/fdown'));
app.use('/api', require('./api/fancy'));
app.use('/', lyricsRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
