const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set in the environment variables.');
  process.exit(1);
}

// Configure CORS (restrict to specific origins if needed)
const allowedOrigins = ['http://localhost:3000']; // Add your frontend URL here
app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512'
    });
    res.json({ imageUrl: response.data.data[0].url });
  } catch (err) {
    console.error('Error generating image:', err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
