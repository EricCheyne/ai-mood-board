const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512'
    });
    res.json({ imageUrl: response.data.data[0].url });
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).send('Failed to generate image');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
