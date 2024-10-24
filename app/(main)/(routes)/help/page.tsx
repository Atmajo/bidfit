"use client";

import React, { useEffect, useRef, useState } from "react";
import Wrapper from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { emitKeypressEvents } from "readline";

interface TextType {
  text: string;
  type: "user" | "bot";
}

const Page = () => {
  const [text, setText] = useState<TextType[]>([
    { text: "How can I help you?", type: "bot" },
    { text: "What is BidFit?", type: "user" },
  ]);
  const links = ["Privacy Policy", "Terms of Use"];
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [text]);

  const onSend = () => {
    setText([...text, { text: input, type: "user" }]);
    setInput("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <section className="flex justify-center items-center h-full">
      <Wrapper className="h-full">
        <h1 className="text-lg font-bold">Live Chat</h1>
        <div className="flex flex-col py-10">
          <h1 className="text-lg">Auction Support</h1>
          <p className="text-gray-300">
            Hello, I&apos;m here to help with any concerns you have. What can I
            assist you with today?
          </p>
        </div>
        <div className="w-full h-96 overflow-hidden overflow-y-scroll">
          {text &&
            text.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "py-1",
                  item.type === "user" ? "flex justify-end items-end" : ""
                )}
              >
                <p
                  className={cn(
                    "px-4 py-2 w-max",
                    item.type === "user"
                      ? "bg-sky-600 rounded-r-lg"
                      : "bg-sky-800 rounded-l-lg"
                  )}
                >
                  {item.text}
                </p>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center bg-[#1A2633] px-5 py-2 mt-5 border border-gray-600 rounded-lg">
          <MessageSquare size={24} className="mr-2 text-gray-500" />
          <Input
            className="relative w-full bg-[#1A2633] outline-none border-none focus-within:border-none"
            placeholder="Search for anything"
            onKeyDown={handleKeyPress}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="ml-2 bg-sky-600 hover:bg-sky-800"
            size={"sm"}
            onClick={onSend}
          >
            Send
          </Button>
        </div>
        <div className="w-full flex justify-evenly items-center py-10">
          {links.map((link, index) => (
            <Link key={index} className="text-sm" href={`/${link.toLowerCase().replace(" ", "-")}`}>
              {link}
            </Link>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default Page;
