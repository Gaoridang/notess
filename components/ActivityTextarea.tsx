"use client";

import { generateEmbedding } from "@/app/(root)/activity/new/generate-embedding";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAnimate, useInView } from "framer-motion";
import { FormEvent, useEffect, useState, useRef } from "react";

const ActivityTextarea = () => {
  const [activity, setActivity] = useState("");
  const [isLoading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 1,
  });

  useEffect(() => {
    if (isInView) {
      textareaRef.current?.focus();
    }
  }, [isInView]);

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
  };

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          id="textarea"
          rows={10}
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="오늘의 활동을 입력하세요..."
          className="focus:shadow-md ease-in-out duration-300 outline-none focus-visible:ring-2 resize-none text-base"
          ref={textareaRef}
        />
      </form>
    </div>
  );
};

export default ActivityTextarea;
