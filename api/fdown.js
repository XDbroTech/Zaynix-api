const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint to fetch video download link from FDown.net
router.get('/api/fdown', async (req, res) => {
    const { videoUrl } = req.body; // Video URL provided by the user

    if (!videoUrl) {
        return res.status(400).json({ 
            success: false, 
            message: "Video URL is required" 
        });
    }

    try {
        // Simulate a request to FDown.net
        const response = await axios.post('https://fdown.net/download.php', null, {
            params: {
                URLz: videoUrl // FDown.net parameter for video URL
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Parse the response to extract the video download link
        const html = response.data;
        const matches = html.match(/<a href="(.*?)"[^>]*>Download<\/a>/);

        if (matches && matches[1]) {
            const downloadUrl = matches[1];
            res.status(200).json({
                success: true,
                message: "Video download link retrieved successfully",
                downloadUrl
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Failed to extract video download link"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while processing the request", 
            error: error.message 
        });
    }
});

module.exports = router;
