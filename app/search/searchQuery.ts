"use server";

import { createClient } from "@/utils/supabase/server";
import OpenAI from "openai";

export const search = async (query: string) => {
  const supabase = createClient();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });

  const embedding = response.data[0].embedding;

  const { data, error } = await supabase.rpc("semtic_search", {
    query: query,
    embedding: embedding,
    match_date: "2024-08-29",
    match_count: 5,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  const chatResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "system",
        content: `You are an AI that answers the question of the user.
          You should response based on the following context and question.
          You should not contain any information outside of the context.
          If there's no information in the context, answer "No information available".
          Today is 2024-08-29. Reponse in Korean.

          Context: ${
          data.map((d: any) =>
            `Date: ${d.metadata.date} Content: ${d.description}`
          )
            .join("\n\n")
        }

          Question: ${query}
        `,
      },
    ],
  });

  const message = chatResponse.choices[0].message.content || "";

  return {
    error: null,
    message,
  };
};
