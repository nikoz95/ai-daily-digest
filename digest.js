const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getNews() {
  // ... თქვენი არსებული კოდი (aiMlNews, dotnetNews, etc.) ...
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const formatNewsWithLinks = (newsArray) => {
    return newsArray.map(item => `• ${item.title}\n  🔗 ${item.link}`).join('\n');
  };
  
  const prompt = `Translate these tech news to Georgian. Add practical hints.

=== 🤖 AI & ML ===
${formatNewsWithLinks(aiMlNews)}
💡 HINT: Explain how AI can help with daily coding tasks.

=== 🔷 .NET ===
${formatNewsWithLinks(dotnetNews)}
💡 HINT: When to use Native AOT vs traditional compilation.

Respond in Georgian only. Format: "Georgian title 🔗 URL" then hint.`;
  
  const result = await model.generateContent(prompt);
  const output = result.response.text();
  
  console.log('📰 Output:');
  console.log(output);
  
  // ✅ დარწმუნდით, რომ ფაილი იქმნება
  const outputPath = path.join(process.env.GITHUB_WORKSPACE || '.', 'digest-output.txt');
  fs.writeFileSync(outputPath, output);
  console.log(`✅ File saved to: ${outputPath}`);
  
  // ასევე შეამოწმეთ ფაილი არსებობს
  if (fs.existsSync(outputPath)) {
    console.log(`✅ File exists, size: ${fs.statSync(outputPath).size} bytes`);
  } else {
    console.log(`❌ File was not created!`);
  }
}

getNews().catch(console.error);
