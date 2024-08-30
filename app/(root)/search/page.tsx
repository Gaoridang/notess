"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { search } from "./search";
import { MessageType } from "@/types";
import Message from "./components/Message";

const SearchPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) {
      setError("메시지를 입력하세요.");
      return;
    }

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError("");
  };

  return (
    <div>
      <form className="grid" onSubmit={handleSendMessage}>
        <div className="flex gap-2">
          <Input
            placeholder="어제 뭐 먹었더라?"
            value={query}
            onChange={handleChange}
          />
          <Button type="submit">전송</Button>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>

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
