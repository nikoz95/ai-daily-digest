const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getNews() {
  try {
    console.log('Starting digest generation...');
    
    // ... თქვენი არსებული კოდი (aiMlNews, dotnetNews, prompt, etc.) ...
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `Translate these tech news to Georgian and add practical hints...`; // თქვენი prompt
    
    console.log('Calling Gemini API...');
    const result = await model.generateContent(prompt);
    const output = result.response.text();
    
    console.log('API response received, length:', output.length);
    
    // ✅ ფაილის შექმნა
    fs.writeFileSync('digest-output.txt', output);
    console.log('✅ digest-output.txt created successfully');
    
    // აჩვენე პირველი 500 სიმბოლო
    console.log('First 500 chars:', output.substring(0, 500));
    
  } catch (error) {
    console.error('❌ Error in getNews:', error.message);
    if (error.stack) console.error(error.stack);
    
    // შექმენი შეცდომის ფაილი რომ Issue არ გაფუჭდეს
    fs.writeFileSync('digest-output.txt', `Error: ${error.message}\n\nCheck GitHub Actions logs for details.`);
    throw error;
  }
}

getNews().catch(console.error);