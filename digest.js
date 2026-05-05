name: AI Daily Digest

on:
  workflow_dispatch:
  schedule:
    - cron: '0 6 * * *'

jobs:
  digest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install @google/generative-ai
      
      - name: Generate and send to Discord
        run: |
          OUTPUT=$(node -e '
            const { GoogleGenerativeAI } = require("@google/generative-ai");
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            
            const aiMlNews = [
              { title: "GitHub Copilot launches new agent mode", link: "https://github.blog/news/copilot-agent-mode-2026/" },
              { title: "Google releases Gemini 2.5 Pro", link: "https://developers.googleblog.com/gemini-2-5-pro/" },
              { title: "OpenAI GPT-5 with reasoning", link: "https://openai.com/blog/gpt-5" }
            ];
            
            const formatNews = (items) => items.map(i => `• ${i.title}\n  🔗 ${i.link}`).join("\n");
            
            const prompt = `Translate to Georgian, keep links, add short hints:\n=== AI/ML ===\n${formatNews(aiMlNews)}`;
            
            (async () => {
              const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
              const result = await model.generateContent(prompt);
              console.log(result.response.text());
            })();
          ')
          
          ESCAPED=$(echo "$OUTPUT" | head -c 1900 | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')
          
          curl -X POST -H "Content-Type: application/json" \
            -d "{
              \"content\": \"📰 **AI ყოველდღიური სიახლეები**\",
              \"embeds\": [{
                \"title\": \"$(date +'%Y-%m-%d')\",
                \"description\": \"$ESCAPED\",
                \"color\": 5814783
              }]
            }" "${{ secrets.DISCORD_WEBHOOK_URL }}"
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}