const express = require('express');
const { ElevenLabsClient } = require('elevenlabs');

const app = express();
const port = 9090;

app.use(express.json());

const elevenlabs = new ElevenLabsClient({
  apiKey: "" // Make sure to replace this with your actual API key
});

app.post('/generate-audio', async (req, res) => {
  try {
    const { text, voice = 'Rachel', voice_id = '5vybZGXH9butYIbZLvLY' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required!' });
    }

    const audioStream = await elevenlabs.generate({
      stream: true,
      voice: voice,
      text: text,
      voice_id: voice_id,
      model_id: "eleven_monolingual_v1"
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

app.use((req, res, next) => {
    res.status(404).send(''); // Respond with a 404 for all other requests
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
