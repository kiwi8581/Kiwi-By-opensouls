# Kiwi 🐱

> A chill crypto cat companion built with Soul Engine

[![Built with Soul Engine](https://img.shields.io/badge/Built%20with-Soul%20Engine-7C3AED?style=flat-square)](https://github.com/kiwi8581/Kiwi-By-opensouls)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## About

Kiwi is a friendly crypto cat that loves vibes and community. Chat with Kiwi about crypto, markets, or just hang out!

## Soul Architecture

This project follows the [OpenSouls Soul Engine](https://github.com/kiwi8581/Kiwi-By-opensouls) pattern:

```
soul/
└── kiwi/
    ├── soul.ts                         # Soul instance configuration
    ├── initialProcess.ts               # Main conversation loop
    ├── memoryIntegrator.ts             # Memory management
    │
    ├── cognitiveSteps/                 # Reasoning functions
    │   ├── index.ts
    │   ├── externalDialog.ts           # Generates spoken responses
    │   ├── internalMonologue.ts        # Internal reflection
    │   └── decisionMaker.ts            # Conversation flow decisions
    │
    ├── staticMemories/                 # Personality definitions
    │   ├── Kiwi.md                     # Core personality traits
    │   └── conversationGuidelines.md   # Response guidelines
    │
    └── subprocesses/                   # Background processes
        ├── index.ts
        ├── moodTracker.ts              # User mood detection
        └── topicDetector.ts            # Topic classification
```

### Core Concepts

- **WorkingMemory**: Manages conversation context and message history
- **CognitiveSteps**: Modular functions for reasoning (dialog, reflection, decisions)
- **StaticMemories**: Markdown files defining Kiwi's core personality
- **Subprocesses**: Background processes for mood/topic tracking
- **MentalProcesses**: Behavioral state machines (initialProcess is the entry point)

## Features

- 🐱 Animated cat avatar (idle, speaking, additional movements)
- 🔊 Text-to-Speech via Google Cloud TTS
- 💬 Context-aware conversations
- 📱 Responsive design (mobile + desktop)
- 🎨 Glassmorphism UI with dark theme

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Soul Engine**: OpenSouls pattern
- **Styling**: Tailwind CSS 3
- **TTS**: Google Cloud Text-to-Speech
- **LLM**: Kolosal AI (Llama 4)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

## Environment Variables

```env
LLM_API_KEY=your_kolosal_api_key
LLM_API_URL=https://api.kolosal.ai
LLM_MODEL_ID=meta-llama/llama-4-maverick-17b-128e-instruct
GOOGLE_TTS_API_KEY=your_google_tts_api_key
```

## Soul Configuration

See `soul.config.ts` for the complete soul configuration.

## License

MIT - See [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Built with ❤️ using <a href="https://github.com/kiwi8581/Kiwi-By-opensouls">Soul Engine</a></sub>
</p>
