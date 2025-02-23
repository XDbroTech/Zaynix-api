// api/gpt-endpoint.js

const { GPT3 } = require('gpt-in-terminal');

module.exports = async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).send({ error: 'No prompt provided' });
  }

  try {
    // Initialize the GPT instance
    const gpt = new GPT3({ apiKey: 'your-openai-api-key' }); // Replace with your OpenAI API key

    // Use GPT3 to get a response for the given prompt
    const gptResponse = await gpt.ask(prompt);

    // Send the AI response back as a JSON response
    res.status(200).json({
      success: true,
      prompt,
      gptResponse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate GPT response'
    });
  }
};
