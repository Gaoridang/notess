"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { search } from "./search";
import { MessageType } from "@/types";
import Message from "./components/Message";

const SearchPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [query, setQuery] = useState("");

  const handleSendMessage = async () => {
    setQuery("");

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "user", message: query },
    ]);

    const response = await search(query);

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "bot", message: response.message },
    ]);
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
          <Message
            key={message.id}
            type={message.type}
            message={message.message}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
