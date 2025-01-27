

const express = require('express');
const cors = require('cors');
const PromptEngine = require('./models/promptEngine');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const promptEngine = new PromptEngine(process.env.GEMINI_API_KEY);

// Endpoint to add training examples
app.post('/train', async (req, res) => {
  const { domain, input, output } = req.body;
  try {
    trainingData.find(d => d.domain === domain)
      .examples.push({ input, output });
    res.json({ status: 'Training example added', domain });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for chatbot queries
app.post('/chat', async (req, res) => {
  const { domain, query } = req.body;
  try {
    const response = await promptEngine.generateResponse(domain, query);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Chatbot training server running on port ${PORT}`);
});
