# PhiloSophia

An AI-powered philosophy tutor that guides you through 2,500 years of philosophical thought. Built with [Mastra](https://mastra.ai), [Next.js](https://nextjs.org), and OpenAI.

## Teaching Modes

- **Socratic Dialogue** - Guided questioning to challenge assumptions and deepen understanding
- **Debate & Argumentation** - Devil's advocate reasoning to sharpen critical thinking
- **Essay Assistance** - Help structuring papers and analyzing philosophical arguments
- **Exploration & Explanation** - Comprehensive coverage of philosophy across eras and traditions

## Tech Stack

- **Framework**: [Mastra](https://mastra.ai) (AI agent framework)
- **Frontend**: Next.js 16, React 19, Material-UI, Tailwind CSS
- **LLM**: OpenAI GPT-4 mini
- **Search**: Brave Search API + Wikipedia API
- **Memory**: LibSQL vector database with semantic embeddings
- **Streaming**: Vercel AI SDK

## Getting Started

### Prerequisites

- Node.js 20+
- An [OpenAI API key](https://platform.openai.com/api-keys)
- A [Brave Search API key](https://brave.com/search/api/)

### Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file and add your keys:

```bash
cp .env.example .env
```

```
OPENAI_API_KEY=sk-...
BRAVE_API_KEY=...
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to start chatting.

## Project Structure

```
src/
  app/                    # Next.js frontend
    api/philosophia/      # Chat API route
    components/           # UI components (Hero, Chat, Features, etc.)
  mastra/
    agents/               # PhiloSophia agent definition
    tools/                # Deep research, Wikipedia lookup, web search
    workflows/            # Multi-step research workflow
```

## How It Works

1. You ask a question in the chat interface
2. The Mastra agent classifies your question and decides which tools to use
3. The deep research workflow runs Wikipedia and web searches in parallel
4. Results are synthesized into a contextual, source-backed response
5. Conversation memory persists across messages using semantic recall

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start dev server on port 3001      |
| `npm run build` | Build for production               |
| `npm run start` | Start production server            |
| `npm run lint`  | Run ESLint                         |
