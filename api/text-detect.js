const express = require('express');
const axios = require('axios');
const router = express.Router();

// Text Detection Endpoint
router.get('/api/text-detect', async (req, res) => {
    const query = req.query.q; // Access the query parameter 'q'

    if (!query) {
        return res.status(400).json({ 
            success: false, 
            message: "Query parameter 'q' is required" 
        });
    }

    try {
        // Call the external API with the provided query
        const apiUrl = `https://bk9.fun/tools/txtdetect?q=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        // Extract data from the response
        if (response.data.status && response.data.BK9.success) {
            const result = response.data.BK9.data;
            res.status(200).json({
                success: true,
                owner: "@Zaynix-XD",
                message: "Detection successful",
                data: {
                    inputText: result.input_text,
                    detectedLanguage: result.detected_language,
                    feedback: result.feedback,
                    specialSentences: result.specialSentences,
                    aiWords: result.aiWords,
                    fakePercentage: result.fakePercentage,
                    additionalFeedback: result.additional_feedback
                }
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: response.data.BK9.message || "Failed to process request" 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while calling the external API", 
            error: error.message 
        });
    }
});

module.exports = router;
