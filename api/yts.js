const express = require('express');
const axios = require('axios');
const router = express.Router();

const YOUTUBE_API_KEY = 'AIzaSyBNwvGJG3lOwQ1brCuIxXfIXO9XYgOw95I'; // Replace with your API Key

// Search Endpoint
router.get('/api/yts', async (req, res) => {
  const query = req.query.q; // Search query
  const maxResults = req.query.maxResults || 5; // Default to 5 results

  if (!query) {
    return res.status(400).json({ error: 'Search query (q) is required' });
  }

  try {
    // Make a request to YouTube Data API
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          owner: "@Zaynix-XD",
          part: 'snippet',
          q: query,
          maxResults,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    // Respond with search results
    res.status(200).json({
      success: true,
      data: response.data.items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch data from YouTube API',
      details: error.message,
    });
  }
});

module.exports = router;
