"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { generateEmbedding } from "./generate-embedding";

const CreateActivityPage = () => {
  const [activity, setActivity] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        <p className="text-slate-500 text-sm">
          형식의 제한 없이 자유롭게 적어보세요.
        </p>
        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            id="textarea"
            rows={10}
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            autoFocus
          />
          <Button type="submit" disabled={isLoading}>
            활동 추가
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateActivityPage;
