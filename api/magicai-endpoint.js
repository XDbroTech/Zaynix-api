// magicai-endpoint.js

const express = require('express');
const axios = require('axios');
const app = express();

// Endpoint to handle MagicAI API requests
app.get('/api/magicai-endpoint', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt query parameter is required' });
  }

  try {
    // Construct the MagicAI API URL using the prompt
    const magicaiUrl = `https://bk9.fun/ai/magicstudio?prompt=${encodeURIComponent(prompt)}`;
    
    // Fetch the generated image from MagicAI API
    const response = await axios.get(magicaiUrl, { responseType: 'arraybuffer' });

    // Set the correct content type for the response
    res.set('Content-Type', 'image/png'); // or 'image/jpeg' depending on the image format

    // Send the image data to the client
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image from MagicAI API:', error);
    res.status(500).json({ error: 'Error generating image' });
  }
});

module.exports = app;
