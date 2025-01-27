const { GoogleGenerativeAI } = require('@google/generative-ai');
const trainingData = require('./data');

class PromptEngine {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  createContextualPrompt(domain, userInput) {
    const domainData = trainingData.find(d => d.domain === domain);
    
    const fewShotExamples = domainData.examples
      .map(ex => `User: ${ex.input}\nAI: ${ex.output}`)
      .join('\n\n');

    return `You are an expert in ${domain} support.
    
Context and Examples:
${fewShotExamples}


User Query: ${userInput}
AI Response:`;
  }

  async generateResponse(domain, userInput) {
    const contextualPrompt = this.createContextualPrompt(domain, userInput);
    
    try {
      const result = await this.model.generateContent(contextualPrompt);
      return result.response.text();
    } catch (error) {
      console.error('Response generation error:', error);
      return "I'm unable to provide a response at the moment.";
    }
  }
}

module.exports = PromptEngine;
