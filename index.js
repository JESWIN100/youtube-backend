const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    res.json(response.data.items);
  } catch (error) {
    res.status(500).send(error.message);
    
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
