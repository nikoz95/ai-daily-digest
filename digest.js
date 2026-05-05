const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function getNews() {
  // ტესტური სიახლეები - მოგვიანებით შეგიძლიათ RSS-ით ჩაანაცვლოთ
  const newsItems = [
    "GitHub Copilot launches new agent mode for autonomous coding",
    "Google releases Gemini 2.5 Pro with 1M token context",
    "OpenAI introduces GPT-5 with reasoning capabilities",
    "Meta open-sources Llama 4 with 400B parameters",
    "Claude 4 adds computer use API for automation"
  ];
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `Translate these tech news headlines to Georgian and summarize them in Georgian:
  
  ${newsItems.join('\n')}
  
  Respond in Georgian language only. Format: 
  1. სათაური ქართულად - მოკლე შეჯამება (2-3 სიტყვა)
  2. ...
  
  Also add a short overall summary at the end.`;
  
  const result = await model.generateContent(prompt);
  console.log('📰 დღევანდელი დეველოპერული სიახლეები:');
  console.log('=========================================');
  console.log(result.response.text());
}

getNews().catch(console.error);
