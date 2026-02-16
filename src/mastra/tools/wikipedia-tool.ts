import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const wikipediaLookupTool = createTool({
  id: "wikipedia-lookup",
  description:
    "Search Wikipedia for information about a philosopher, philosophical concept, movement, or historical period." +
    "Use this when you need factual details, biographical info, or want to ground your explanations in verified information.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "The search term (e.g. 'Immanuel Kant', 'Existentialism', 'Allegory of the Cave')",
      ),
  }),
  outputSchema: z.object({
    title: z.string(),
    summary: z.string(),
    url: z.string(),
  }),
  execute: async ({ query }) => {
    // Search for the most relevant article
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=1&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const results = searchData?.query?.search;
    if (!results || results.length === 0) {
      return {
        title: query,
        summary: `No Wikipedia article found for "${query}".`,
        url: "",
      };
    }

    // Get the summary of the top result
    const title = results[0].title;
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const summaryRes = await fetch(summaryUrl);
    const summaryData = await summaryRes.json();

    return {
      title: summaryData.title ?? title,
      summary: summaryData.extract ?? "No summary available.",
      url:
        summaryData.content_urls?.desktop?.page ??
        `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
    };
  },
});
