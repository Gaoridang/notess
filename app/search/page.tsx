"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { search } from "./search";

interface Message {
  id: string;
  type: "user" | "bot";
  message: string;
}

const SearchPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");

  const handleSendMessage = async () => {
    // Search with query and get response from the bot
    // add the response to the messages
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "user", message: query },
    ]);

    const response = await search(query);

    if (response.error) {
      console.error(response.error);
    }

    if (response.message) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), type: "bot", message: response.message },
      ]);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          placeholder="메시지를 입력하세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSendMessage}>전송</Button>
      </div>

      <div className="border rounded-lg p-4 mt-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.type === "user" ? "text-right" : ""}
          >
            {message.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
