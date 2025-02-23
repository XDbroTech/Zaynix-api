// insta-fetch.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint to fetch Instagram video
router.get('/api/insta-fetch', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL query parameter is required' });
  }

  try {
    // Construct the Instagram download API URL using the provided URL
    const apiUrl = `https://bk9.fun/download/instagram2?url=${encodeURIComponent(url)}`;

    // Fetch the response from the API
    const response = await axios.get(apiUrl);

    // Check if the response is valid
    if (response.data.status) {
      const videoUrl = response.data.BK9[0].url;

      // Send the video URL back to the client
      res.json({
        owner: "@Zaynix-XD",
        videoUrl });
    } else {
      res.status(400).json({ error: 'Failed to fetch video from Instagram URL' });
    }
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
