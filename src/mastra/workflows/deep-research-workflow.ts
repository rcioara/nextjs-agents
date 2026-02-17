import { createWorkflow, createStep } from "@mastra/core/workflows";
import { Agent } from "@mastra/core/agent";
import { z } from "zod";
import { wikipediaLookupTool } from "../tools/wikipedia-tool";
import { webSearchTool } from "../tools/web-search-tool";

// --- Schemas ---

const inputSchema = z.object({
  question: z.string().describe("The student's question to research"),
});

const categoryEnum = z.enum([
  "philosopher",
  "movement",
  "concept",
  "thought-experiment",
  "text",
  "general",
]);

const classificationSchema = z.object({
  question: z.string(),
  topic: z.string().describe("The core topic extracted from the question"),
  category: categoryEnum.describe("The classified category of the topic"),
  wikipediaQuery: z.string().describe("Optimized search query for Wikipedia"),
  webSearchQuery: z.string().describe("Optimized search query for web results"),
});

const synthesizedSchema = z.object({
  enrichedContext: z
    .string()
    .describe("Synthesized research context for the agent"),
  sources: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    }),
  ),
  suggestedFollowUps: z
    .array(z.string())
    .describe("Follow-up questions based on research"),
});

const researchHelper = new Agent({
  id: "research-helper",
  name: "Research Helper",
  instructions:
    "You are a utility agent that classifies topics and synthesizes research. " +
    "Always respond with structured data as requested.",
  model: "openai/gpt-4.1-mini",
});

// --- Step 1: Classify the topic ---

const classifyTopic = createStep({
  id: "classify-topic",
  inputSchema: inputSchema,
  outputSchema: classificationSchema,
  execute: async ({ inputData }) => {
    const { question } = inputData;

    const response = await researchHelper.generate(
      `Given this student question, extract the core topic and produce optimized search queries.

        Student question: "${question}"

        - topic: the core philosophical topic, philosopher, or concept (e.g. "Nietzsche's eternal return")
        - category: classify as philosopher, movement, concept, thought-experiment, text, or general
        - wikipediaQuery: optimized search query for Wikipedia
        - webSearchQuery: optimized search query for current web discussions`,
      {
        structuredOutput: {
          schema: z.object({
            topic: z.string(),
            category: categoryEnum,
            wikipediaQuery: z.string(),
            webSearchQuery: z.string(),
          }),
        },
      },
    );

    if (!response.object) {
      throw new Error("Classification step returned no structured output");
    }

    return {
      question,
      topic: response.object.topic,
      category: response.object.category,
      wikipediaQuery: response.object.wikipediaQuery,
      webSearchQuery: response.object.webSearchQuery,
    };
  },
});

// --- Step 2a & 2b: Reuse tools as workflow steps ---

const wikipediaStep = createStep(wikipediaLookupTool);
const webSearchStep = createStep(webSearchTool);

// --- Step 3: Synthesize research into enriched context ---

const synthesizeResearch = createStep({
  id: "synthesize-research",
  inputSchema: z.object({
    "wikipedia-branch": wikipediaLookupTool.outputSchema!,
    "web-search-branch": webSearchTool.outputSchema!,
  }),
  outputSchema: synthesizedSchema,
  execute: async ({ inputData, getInitData }) => {
    const wiki = inputData["wikipedia-branch"];
    const web = inputData["web-search-branch"];
    const initData = getInitData<z.infer<typeof inputSchema>>();

    const researchSummary = `
      WIKIPEDIA ARTICLE: "${wiki.title}"
      ${wiki.summary}
      Source: ${wiki.url}
  
      WEB RESULTS:
      ${(
        web.results as Array<{
          title: string;
          url: string;
          description: string;
        }>
      )
        .map((r, i) => `${i + 1}. "${r.title}" — ${r.description} (${r.url})`)
        .join("\n")}`;

    const response = await researchHelper.generate(
      `
      Synthesize these research results to help answer: "${initData?.question}"
      - enrichedContext: a 3-5 sentence paragraph synthesizing the key findings into useful teaching context
      - sources: the most relevant sources from the research (title + url)
      - suggestedFollowUps: 3 thought-provoking follow-up questions based on the research
  
      Research: ${researchSummary}`,
      {
        structuredOutput: {
          schema: synthesizedSchema,
        },
      },
    );

    if (!response.object) {
      throw new Error("Synthesis step returned no structured output");
    }

    return response.object;
  },
});

// --- Sub-workflows for parallel branches (map classification → tool input) ---

const wikipediaBranch = createWorkflow({
  id: "wikipedia-branch",
  inputSchema: classificationSchema,
  outputSchema: wikipediaLookupTool.outputSchema!,
})
  .map(async ({ inputData }) => ({
    query: inputData.wikipediaQuery,
  }))
  .then(wikipediaStep)
  .commit();

const webSearchBranch = createWorkflow({
  id: "web-search-branch",
  inputSchema: classificationSchema,
  outputSchema: webSearchTool.outputSchema!,
})
  .map(async ({ inputData }) => ({
    query: inputData.webSearchQuery,
    count: 5,
  }))
  .then(webSearchStep)
  .commit();

// --- Main workflow ---

export const deepResearchWorkflow = createWorkflow({
  id: "deep-research-workflow",
  inputSchema: inputSchema,
  outputSchema: synthesizedSchema,
})
  .then(classifyTopic)
  .parallel([wikipediaBranch, webSearchBranch])
  .then(synthesizeResearch)
  .commit();
