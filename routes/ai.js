const express = require('express');
const fetch = require("node-fetch");
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required.' });
  }

  try {
    // ✅ Supported in v1 SDK
    // ✅ Supported in v1 SDK
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ message: text });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ message: 'Error communicating with AI model.' });
  }
});

module.exports = router;
