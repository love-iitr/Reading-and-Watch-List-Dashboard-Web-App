// src/llmClient.js
import { CreateMLCEngine } from "@mlc-ai/web-llm";

let engine = null;

export async function summarizeWithWebLLM(text) {
  if (!engine) {
    engine = await CreateMLCEngine("gemma-2-2b-it-q4f32_1-MLC", {
      initProgressCallback: (p) =>
        console.log(`Model loading: ${Math.round(p.progress * 100)}%`)
    });
  }

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: `Summarize this:\n\n${text}` }
  ];

  const result = await engine.chat.completions.create({ messages });
  return result.choices[0].message.content;
}
