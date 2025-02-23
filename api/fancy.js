const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fancy Text API Endpoint
router.get('/api/fancy', async (req, res) => {
  const text = req.query.text; // Get the 'text' parameter

  // Validate the input
  if (!text) {
    return res.status(400).json({ success: false, message: 'No text parameter provided' });
  }

  try {
    // Call the external API
    const response = await axios.get(`https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(text)}`);
    const styles = response.data.result; // Extract styles from the response

    // If no styles returned
    if (!styles || styles.length === 0) {
      return res.status(404).json({ success: false, message: 'No styles found' });
    }

    // Return the styled text
    res.status(200).json({
      success: true,
      owner: "@Zaynix-XD",
      originalText: text,
      styles,
      owner: "@Zaynix-XD",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching styled text',
      error: error.message,
    });
  }
});

module.exports = router;
