const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getNews() {
  const news = [
    "GitHub Copilot launches new agent mode for autonomous coding",
    "Google releases Gemini 2.5 Pro with 1M token context",
    "OpenAI introduces GPT-5 with reasoning capabilities",
    "Meta open-sources Llama 4 with 400B parameters",
    "Claude 4 adds computer use API for automation"
  ];
  
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
  
  const prompt = `Translate these tech news headlines to Georgian and summarize them in Georgian:
  
  ${news.join('\n')}
  
  Respond in Georgian language only. Format: 
  1. სათაური ქართულად - მოკლე შეჯამება
  2. ...
  
  Add a short overall summary at the end.`;
  
  const result = await model.generateContent(prompt);
  const output = result.response.text();
  
  console.log('📰 დღევანდელი დეველოპერული სიახლეები:');
  console.log('=========================================');
  console.log(output);
  
  // ფაილში შენახვა Issue-სთვის
  fs.writeFileSync('digest-output.txt', output);
}

getNews().catch(console.error);
