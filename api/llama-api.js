const express = require('express');
const axios = require('axios'); // Import axios for making HTTP requests
const app = express();

// Llama AI API Endpoint
app.get('/api/llama-api', async (req, res) => {
  const query = req.query.q;  // Extract query parameter from the request
  
  if (!query) {
    return res.status(400).json({ error: 'No query provided' });
  }

  try {
    // URL of the external Llama API
    const apiUrl = `https://bk9.fun/ai/llama?q=${encodeURIComponent(query)}`;

    // Make the request to the external API
    const response = await axios.get(apiUrl);

    // Check if the response has the expected structure
    if (response.data.status) {
      res.json({
        owner: "@Zaynix-XD",
        response: response.data.BK9,  // Extract the response from the API
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch valid data from the external API' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from the Llama API', details: error.message });
  }
});

module.exports = app;
