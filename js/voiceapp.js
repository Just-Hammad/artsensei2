const express = require('express');
const app = express();
const port = 9090;

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST');
    return res.status(200).json({});
  }
  next();
});

app.post('/generate-audio', async (req, res) => {
  try {
    const { text, voice_id, model_id, voice_settings } = req.body;
    const elevenLabsApiUrl = 'https://api.elevenlabs.io/v1/text-to-speech';
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;

    if (!text || !voice_id) {
      return res.status(400).json({ error: 'Text and voice_id are required!' });
    }

    const response = await fetch(`${elevenLabsApiUrl}/${voice_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsApiKey,
      },
      body: JSON.stringify({
        text,
        model_id,
        voice_settings
      }),
    });

    console.log(`${elevenLabsApiUrl}/${voice_id}`);
    console.log(JSON.stringify({
      text,
      model_id,
      voice_settings
    }));

    if (!response.ok) {
      const errorData = await response.json();
      console.error('ElevenLabs API error:', errorData);
      return res.status(response.status).json(errorData);
    }

    // Get the audio content from ElevenLabs
    const audioBuffer = await response.arrayBuffer();

    // Set appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).json({ error: 'Error generating audio.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});