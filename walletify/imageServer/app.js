// Server (Node.js with Express)
import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 6000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Endpoint to upload image to Imgur
app.post('/upload-image', async (req, res) => {
  const formData = new FormData();
  formData.append('image', req.body.image);

  const imgurResponse = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      'Authorization': 'Client-ID f04da89f5a8525f', // Replace with your Imgur Client ID
      // Exclude x-requested-with header during the preflight request
    },
    body: formData,
  });

  const imgurData = await imgurResponse.json();
  res.json(imgurData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
