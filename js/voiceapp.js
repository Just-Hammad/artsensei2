const express = require('express');
const app = express();
const port = 9090;
app.use(express.json());

app.post('/generate-audio', async (req, res) => {
  try {
    const { text, voice_id, model_id, voice_settings } = req.body;
    const elevenLabsApiUrl = 'https://api.elevenlabs.io/v1/text-to-speech';
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;

    if (!text || !voice_id) {
      return res.status(400).json({ error: 'Text and voice_id are required!' });
    }

    console.log('Making request to ElevenLabs with voice_id:', voice_id);
    
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('ElevenLabs API error:', errorData);
      return res.status(response.status).json(errorData);
    }

    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).json({ error: 'Error generating audio' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});