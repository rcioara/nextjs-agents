import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const webSearchTool = createTool({
  id: "web-search",
  description:
    "Search the web for current philosophical discussions, academic papers, essays, or contemporary takes on philosophical topics." +
    "Use this when Wikipedia is not enough or you need recent, diverse sources.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "The search query (e.g. 'trolley problem contemporary criticisms', 'philosophy of AI consciousness 2024')",
      ),
    count: z
      .number()
      .min(1)
      .max(10)
      .default(5)
      .describe("Number of results to return (1-10)"),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        description: z.string(),
      }),
    ),
  }),
  execute: async ({ query, count }) => {
    const apiKey = process.env.BRAVE_API_KEY;
    if (!apiKey) {
      return {
        results: [
          {
            title: "Error",
            url: "",
            description:
              "BRAVE_API_KEY is not set. Please add it to your .env file.",
          },
        ],
      };
    }

    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${count}`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": apiKey,
      },
    });

    if (!res.ok) {
      return {
        results: [
          {
            title: "Search Error",
            url: "",
            description: `Brave Search returned status ${res.status}.`,
          },
        ],
      };
    }

    const data = await res.json();
    const webResults = data?.web?.results ?? [];

    return {
      results: webResults.map(
        (r: { title: string; url: string; description: string }) => ({
          title: r.title ?? "",
          url: r.url ?? "",
          description: r.description ?? "",
        }),
      ),
    };
  },
});
