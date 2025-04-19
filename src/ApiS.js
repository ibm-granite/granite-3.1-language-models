const axios = require('axios');
const { getApiKey } = require('./cfg');

async function callLLMApi(prompt, context) {
  const apiKey = getApiKey();
  const apiUrl = 'https://api.example.com/llm-endpoint';

  try {
    const response = await axios.post(apiUrl, {
      prompt,
      context,
      apiKey,
    });

    return response.data;
  } catch (error) {
    console.error('Error calling LLM API:', error);
    return null;
  }
}

module.exports = { callLLMApi };
