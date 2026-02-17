import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const deepResearchTool = createTool({
  id: "deep-research",
  description:
    "Run a deep research workflow that searches Wikipedia and the web in parallel, then synthesizes findings into enriched context with sources and follow-up questions. " +
    "Use this for complex or substantive questions where the student would benefit from a well-researched, source-backed response. " +
    "Prefer this over individual wikipedia-lookup or web-search calls when the topic warrants thorough research.",
  inputSchema: z.object({
    question: z
      .string()
      .describe(
        "The student's question to research (e.g. 'What did Nietzsche mean by eternal recurrence?', 'How does Buddhist anatta differ from Hume's bundle theory?')",
      ),
  }),
  outputSchema: z.object({
    enrichedContext: z.string().describe("Synthesized research context"),
    sources: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      }),
    ),
    suggestedFollowUps: z
      .array(z.string())
      .describe("Follow-up questions the student might explore"),
  }),
  execute: async ({ question }, { mastra }) => {
    const workflow = mastra?.getWorkflow("deepResearchWorkflow");
    if (!workflow) {
      throw new Error("deep-research workflow not registered in Mastra");
    }

    const run = await workflow.createRun();
    const result = await run.start({
      inputData: { question },
    });

    if (result.status === "success") {
      return result.result;
    }

    throw new Error(
      `Research workflow failed with status: ${result.status}`,
    );
  },
});
