const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getNews() {
  // 🚀 AI & ML
  const aiMlNews = [
    { title: "GitHub Copilot launches new agent mode for autonomous coding", link: "https://github.blog/news/copilot-agent-mode-2026/" },
    { title: "Google releases Gemini 2.5 Pro with 1M token context", link: "https://developers.googleblog.com/gemini-2-5-pro/" },
    { title: "OpenAI introduces GPT-5 with reasoning capabilities", link: "https://openai.com/blog/gpt-5" },
    { title: "Meta open-sources Llama 4 with 400B parameters", link: "https://ai.meta.com/blog/llama-4" },
    { title: "Claude 4 adds computer use API for automation", link: "https://anthropic.com/news/claude-4-computer-use" }
  ];
  
  // 🔷 .NET Ecosystem
  const dotnetNews = [
    { title: ".NET 10 Preview 3 with Native AOT improvements", link: "https://devblogs.microsoft.com/dotnet/dotnet-10-preview3/" },
    { title: "C# 14: collection expressions, params collections", link: "https://devblogs.microsoft.com/dotnet/csharp-14-features/" },
    { title: "ASP.NET Core Blazor United and minimal APIs", link: "https://devblogs.microsoft.com/aspnet/blazor-united/" },
    { title: ".NET Aspire 2.0 for cloud-native apps", link: "https://devblogs.microsoft.com/dotnet/dotnet-aspire-2/" }
  ];
  
  // 💻 Programming Languages
  const langNews = [
    { title: "Rust 2026 edition: async traits, improved borrowing", link: "https://blog.rust-lang.org/2026/rust-2026/" },
    { title: "Go 1.25: generics enhancements", link: "https://go.dev/blog/go1.25" },
    { title: "Python 3.14: JIT compiler improvements", link: "https://docs.python.org/3.14/whatsnew/" },
    { title: "TypeScript 6.0: better type inference", link: "https://devblogs.microsoft.com/typescript/typescript-6-0/" },
    { title: "Zig 0.15: self-hosted compiler", link: "https://ziglang.org/news/0.15.0/" }
  ];
  
  // 🏗️ Architecture
  const archNews = [
    { title: "Microservices vs Modular Monolith trends", link: "https://martinfowler.com/articles/microservices-trends-2026.html" },
    { title: "Domain-Driven Design tools updates", link: "https://domaindrivendesign.org/news-2026" },
    { title: "Clean Architecture templates for major frameworks", link: "https://blog.cleancoder.com/templates-2026" }
  ];
  
  // 📚 SKILLS TO LEARN
  const skillsToLearn = [
    { title: "AI/ML integration - Prompt engineering and LLM APIs", link: "https://www.deeplearning.ai/courses/prompt-engineering/" },
    { title: "Cloud-native development - Kubernetes, Docker, Serverless", link: "https://kubernetes.io/docs/tutorials/" },
    { title: "Rust programming for systems development", link: "https://doc.rust-lang.org/book/" },
    { title: "WebAssembly (WASM) for high-performance web apps", link: "https://webassembly.org/getting-started/" },
    { title: "GraphQL API design and implementation", link: "https://www.graphql.com/tutorials/" }
  ];
  
  // 🎯 EXPERIENCES TO GAIN
  const experiencesToGain = [
    { title: "Contribute to open-source projects", link: "https://goodfirstissues.com/" },
    { title: "Set up complete CI/CD pipeline", link: "https://docs.github.com/en/actions/learn-github-actions" },
    { title: "Deploy and manage cloud infrastructure", link: "https://aws.amazon.com/getting-started/hands-on/" },
    { title: "Build production full-stack application", link: "https://www.freecodecamp.org/learn/full-stack-developer/" }
  ];
  
  // 📦 Frontend
  const frontendNews = [
    { title: "React 20: Server Components stable", link: "https://react.dev/blog/2026/react-20" },
    { title: "Vue 4: Composition API improvements", link: "https://blog.vuejs.org/posts/vue-4" }
  ];
  
  // 🛠️ DevOps
  const devopsNews = [
    { title: "GitHub Actions reusable workflows improvements", link: "https://github.blog/actions-reusable-workflows/" },
    { title: "Kubernetes 1.33 features", link: "https://kubernetes.io/blog/2026/kubernetes-1-33/" }
  ];
  
  // 🧪 Testing
  const testingNews = [
    { title: "Vitest 4: faster ESM support", link: "https://vitest.dev/blog/vitest-4" },
    { title: "Playwright 2.0: mobile emulation", link: "https://playwright.dev/docs/release-notes-2-0" }
  ];
  
  // 🔒 Security
  const securityNews = [
    { title: "OWASP Top 10 2026 updates", link: "https://owasp.org/Top10-2026/" },
    { title: "SBOM becomes standard", link: "https://www.cisa.gov/sbom" }
  ];

  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
  
  const formatNewsWithLinks = (newsArray) => {
    return newsArray.map(item => `• ${item.title}\n  🔗 ${item.link}`).join('\n');
  };
  
  const prompt = `Translate these tech news to Georgian. For each category, add a PRACTICAL HINT at the end explaining when/how to use this knowledge.

=== 🤖 AI & ML ===
${formatNewsWithLinks(aiMlNews)}

💡 HINT for AI/ML category (in Georgian): Explain how AI agents and LLMs can help with daily coding tasks, code review, documentation generation.

=== 🔷 .NET ECOSYSTEM ===
${formatNewsWithLinks(dotnetNews)}

💡 HINT for .NET category (in Georgian): When to use Native AOT vs traditional compilation, and how new C# features simplify code.

=== 💻 PROGRAMMING LANGUAGES ===
${formatNewsWithLinks(langNews)}

💡 HINT for Languages category (in Georgian): Which language to choose for which project type (Rust for performance, Go for backend, TypeScript for frontend).

=== 🏗️ ARCHITECTURE ===
${formatNewsWithLinks(archNews)}

💡 HINT for Architecture category (in Georgian): When to choose microservices vs monolith for your project size and team.

=== 📚 SKILLS TO LEARN ===
${formatNewsWithLinks(skillsToLearn)}

💡 HINT for Skills category (in Georgian): Prioritize which skills matter most for your career path (backend, frontend, ML, DevOps).

=== 🎯 EXPERIENCES TO GAIN ===
${formatNewsWithLinks(experiencesToGain)}

💡 HINT for Experiences category (in Georgian): How to start with open source - find good-first-issues, contribute documentation first.

=== 📦 FRONTEND ===
${formatNewsWithLinks(frontendNews)}

💡 HINT for Frontend category (in Georgian): When to use React vs Vue for your next project based on team size and requirements.

=== 🛠️ DEVOPS ===
${formatNewsWithLinks(devopsNews)}

💡 HINT for DevOps category (in Georgian): Automate repetitive tasks with GitHub Actions - start with simple workflows.

=== 🧪 TESTING ===
${formatNewsWithLinks(testingNews)}

💡 HINT for Testing category (in Georgian): Write tests before code (TDD) for complex logic, after for UI components.

=== 🔒 SECURITY ===
${formatNewsWithLinks(securityNews)}

💡 HINT for Security category (in Georgian): Always validate user input and use parameterized queries to prevent injection attacks.

FORMAT REQUIREMENTS:
1. Translate titles to Georgian, keep 🔗 and URLs unchanged
2. Each category ends with 💡 HINT (in Georgian)
3. Keep hints short (2-3 sentences) but practical
4. Overall Georgian language throughout

Example format:
[Georgian title] 🔗 URL
💡 HINT: Practical advice in Georgian...`;
  
  const result = await model.generateContent(prompt);
  const output = result.response.text();
  
  console.log('📰 დღევანდელი დეველოპერის სიახლეები (Hint-ებით):');
  console.log('=========================================');
  console.log(output);
  
  fs.writeFileSync('digest-output.txt', output);
}

getNews().catch(console.error);
