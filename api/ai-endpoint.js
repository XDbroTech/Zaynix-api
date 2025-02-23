// api/ai-endpoint.js

const ai = require('ai');

module.exports = async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).send({ error: 'No prompt provided' });
  }

  try {
    // Use the AI package to generate content based on the prompt
    const aiResponse = await ai.ask(prompt);

    res.status(200).json({
      success: true,
      prompt,
      aiResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI response',
    });
  }
};
