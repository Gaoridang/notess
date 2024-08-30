"use server";

import { createClient } from "@/utils/supabase/server";
import OpenAI from "openai";

export const generateEmbedding = async (activity: string) => {
  const supabase = createClient();
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API Key is not provided");
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const responese = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: activity,
  });

  // Array of embedding
  const embedding = responese.data[0].embedding;

  // Get the current time in Korean time
  const now = new Date();
  const GMTNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const koreanDiff = 9 * 60 * 60 * 1000;
  const koreanNow = new Date(GMTNow.getTime() + koreanDiff);

  // Insert the data into tables
  const { data, error: INSERT_ACTIVITY_ERROR } = await supabase.from(
    "activities",
  ).insert({
    description: activity,
    metadata: { date: "2024-08-01" },
  }).select("id").single();

  if (INSERT_ACTIVITY_ERROR) {
    return {
      error: INSERT_ACTIVITY_ERROR.message,
    };
  }

  const { error: INSERT_EMBEDDING_ERROR } = await supabase.from(
    "activity_embeddings",
  ).insert({
    embedding,
    activity_id: data.id,
  });

  if (INSERT_EMBEDDING_ERROR) {
    return {
      error: INSERT_EMBEDDING_ERROR.message,
    };
  }

  return {
    error: null,
  };
};
