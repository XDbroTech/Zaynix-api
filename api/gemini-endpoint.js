// api/gemini-endpoint.js

const axios = require('axios');

module.exports = async (req, res) => {
  const { q } = req.query; // Get query parameter from the request

  if (!q) {
    return res.status(400).json({ error: 'No query parameter (q) provided' });
  }

  try {
    // Make a GET request to the bk9 API
    const response = await axios.get(`https://bk9.fun/ai/gemini?q=${encodeURIComponent(q)}`);

    // Send the response from bk9 API back to the user
    res.status(200).json({
      owner: "@Zaynix-XD",
      success: true,
      prompt: q,
      geminiResponse: response.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data from bk9 API'
    });
  }
};
