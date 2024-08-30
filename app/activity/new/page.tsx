"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { generateEmbedding } from "./generate-embedding";

const CreateActivityPage = () => {
  const [activity, setActivity] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // generate embeddings and insert the data into tables
    const response = await generateEmbedding(activity);

    if (response.error) {
      console.error(response.error);
    }

    setActivity("");
    setLoading(false);
  };

  return (
    <div className="w-full">
      <Label htmlFor="textarea">활동 입력</Label>
      <Textarea
        id="textarea"
        className="w-[500px]"
        rows={10}
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <Button onClick={handleSubmit} className="mt-4" disabled={isLoading}>
        활동 추가
      </Button>
    </div>
  );
};

export default CreateActivityPage;
