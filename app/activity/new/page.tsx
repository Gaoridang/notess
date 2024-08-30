"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { generateEmbedding } from "./generate-embedding";
import { useRouter } from "next/navigation";

const CreateActivityPage = () => {
  const [activity, setActivity] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const response = await generateEmbedding(activity);

    if (response.error) {
      console.error(response.error);
      setLoading(false);
      return;
    }

    setActivity("");
    setLoading(false);

    router.push("/search");
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-4">
        <p className="text-3xl font-semibold">오늘 무엇을 했나요?</p>
        <Label htmlFor="textarea" className="text-slate-500">
          형식의 제한 없이 자유롭게 적어보세요.
        </Label>
        <Textarea
          id="textarea"
          className="w-[500px]"
          rows={10}
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          활동 추가
        </Button>
      </div>
    </div>
  );
};

export default CreateActivityPage;
