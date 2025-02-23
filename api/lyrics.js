const express = require('express');
const axios = require('axios');
const router = express.Router();

// API Endpoint to fetch lyrics
router.get('/api/lyrics', async (req, res) => {
  const text = req.query.text; // Access the query parameter 'text'

  if (!text) {
    return res.status(400).json({ 
      error: true, 
      message: 'No query parameter (text) provided' 
    });
  }

  try {
    // Make a GET request to the dark-yasiya lyrics API
    const apiUrl = `https://www.dark-yasiya-api.site/other/lyrics?text=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);

    // Check if the API response is successful
    if (response.data.status) {
      const { artists, album, lyric } = response.data.result; // Extract required data

      // Send the response back to the user
      res.status(200).json({
        owner: "@Zaynix-XD",
        success: true,
        message: "Lyrics fetched successfully",
        lyrics: {
          artists,
          album,
          lyric,
        },
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: "Lyrics not found" 
      });
    }
  } catch (error) {
    console.error('Error fetching lyrics:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data from lyrics API',
    });
  }
});

module.exports = router;
