const { GoogleGenerativeAI } = require('@google/generative-ai');

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

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const formatNewsWithLinks = (newsArray) => {
    return newsArray.map(item => `• ${item.title}\n  🔗 ${item.link}`).join('\n');
  };
  
  const prompt = `Translate these tech news to Georgian. Add a short PRACTICAL HINT at the end of each category.

=== 🤖 AI & ML ===
${formatNewsWithLinks(aiMlNews)}
💡 HINT: AI helps with code review, documentation, and repetitive tasks.

=== 🔷 .NET ===
${formatNewsWithLinks(dotnetNews)}
💡 HINT: Native AOT for microservices, traditional JIT for complex apps.

=== 💻 LANGUAGES ===
${formatNewsWithLinks(langNews)}
💡 HINT: Rust for performance, Go for backend, TypeScript for frontend.

=== 🏗️ ARCHITECTURE ===
${formatNewsWithLinks(archNews)}
💡 HINT: Monolith for small teams, microservices for 10+ developers.

=== 📚 SKILLS ===
${formatNewsWithLinks(skillsToLearn)}
💡 HINT: Start with AI/Cloud fundamentals, then specialize.

=== 🎯 EXPERIENCES ===
${formatNewsWithLinks(experiencesToGain)}
💡 HINT: Begin with good-first-issues, contribute documentation.

=== 📦 FRONTEND ===
${formatNewsWithLinks(frontendNews)}
💡 HINT: React for large teams, Vue for smaller projects.

=== 🛠️ DEVOPS ===
${formatNewsWithLinks(devopsNews)}
💡 HINT: Automate with GitHub Actions, start simple.

=== 🧪 TESTING ===
${formatNewsWithLinks(testingNews)}
💡 HINT: TDD for complex logic, test after for UI.

=== 🔒 SECURITY ===
${formatNewsWithLinks(securityNews)}
💡 HINT: Validate input, use parameterized queries.

Respond in Georgian only. Keep format: "• Title 🔗 URL" then 💡 HINT at category end.`;
  
  const result = await model.generateContent(prompt);
  const output = result.response.text();
  
  // მხოლოდ კონსოლში გამოტანა (GitHub Actions ლოგში)
  console.log(output);
}

getNews().catch(console.error);