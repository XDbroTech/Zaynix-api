// ephoto-api.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint to generate ephoto image
router.get('/api/ephoto1', async (req, res) => {
  const { text, url } = req.query;

  if (!text || !url) {
    return res.status(400).json({ error: 'Both "text" and "url" query parameters are required' });
  }

  try {
    // Construct the ephoto API URL
    const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    // Fetch the response from the ephoto API
    const response = await axios.get(apiUrl);

    // Check if the response contains the image URL
    if (response.data.status) {
      const imageUrl = response.data.BK9;

      // Send the image URL back to the client
      res.json({
        sucess: "true",
        owner: "@Romek-XD",
        imageUrl });
    } else {
      res.status(400).json({ error: 'Failed to generate the ephoto image' });
    }
  } catch (error) {
    console.error('Error fetching ephoto data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
