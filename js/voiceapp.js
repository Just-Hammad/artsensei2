const express = require('express');
const { ElevenLabsClient } = require('elevenlabs');

const app = express();
const port = 9090;

app.use(express.json());

const elevenlabs = new ElevenLabsClient({
  apiKey: "" // Make sure to replace this with your actual API key
});

app.post('/text-to-speech/:voice_id', async (req, res) => {
  try {
    const voice_id = req.params.voice_id;
    const { text, model_id, voice_settings } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required!' });
    }

    const audioStream = await elevenlabs.generate({
      text,
      voice_id,
      model_id,
      voice_settings
    });

    res.setHeader('Content-Type', 'audio/mpeg');

    audioStream.pipe(res);

    audioStream.on('end', () => {
      console.log('Audio stream ended');
    });

  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).json({ error: 'Error generating audio.' });
  }
});

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST');
    return res.status(200).json({});
  }
  next();
});

app.use((req, res) => {
  res.status(404).send(''); // Respond with a 404 for all other requests
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});