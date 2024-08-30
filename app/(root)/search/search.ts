"use server";

import { createClient } from "@/utils/supabase/server";
import { formatDate } from "date-fns";
import OpenAI from "openai";
import { ko } from "date-fns/locale";

export const search = async (query: string) => {
  const supabase = createClient();
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API Key is not provided");
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });

  // Array of embedding
  const embedding = embeddingResponse.data[0].embedding;

  // Do the search with the embedding
  const { data, error } = await supabase.rpc("get_similar_activities", {
    query_embedding: embedding,
    similarity_threshold: 0.0,
    max_results: 5,
  });

  console.log(data);

  if (error) {
    return { error: error.message };
  }

  // Generate response with the context of description, metadata
  const chatResponse = openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "system",
        content: `You are an AI that answers the question of the user.
          You should response based on the following context and question.
          You should not contain any information outside of the context.
          If there's no information in the context, answer "No information available".
          Today is ${
          formatDate(new Date(), "yyyy-MM-dd", { locale: ko })
        }. Reponse in Korean.

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

  const message = (await chatResponse).choices[0].message.content || "";

  return {
    error: null,
    message,
  };
};
