"use client";

import { useState, useCallback } from "react";
import { CatAvatar } from "@/components/CatAvatar";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatInput } from "@/components/ChatInput";
import { BackButton } from "@/components/BackButton";
import { useAudio } from "@/hooks/useAudio";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hey! I'm Kiwi the cat! 🐱",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const { isPlaying, speakText } = useAudio({
    onError: (error) => console.error("TTS Error:", error),
  });

  const handleSend = useCallback(
    async (userMessage: string) => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        content: userMessage,
        isUser: true,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const chatHistory = messages.slice(-10).map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.content,
        }));

        chatHistory.push({
          role: "user",
          content: userMessage,
        });

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: chatHistory }),
        });

        const data = await response.json();

        if (data.reply) {
          const botMsg: Message = {
            id: `bot-${Date.now()}`,
            content: data.reply,
            isUser: false,
          };
          setMessages((prev) => [...prev, botMsg]);
          speakText(data.reply).catch(() => {});
        } else if (data.error) {
          const errorMsg: Message = {
            id: `error-${Date.now()}`,
            content: "Meow! Something went wrong. Try again? 🐱",
            isUser: false,
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      } catch (error) {
        console.error("Chat error:", error);
        const errorMsg: Message = {
          id: `error-${Date.now()}`,
          content: "Meow! Something went wrong. Try again? 🐱",
          isUser: false,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, speakText]
  );

  const latestBotMessage = [...messages].reverse().find((m) => !m.isUser);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">

      {/* Header */}
      <header className="relative z-10 mx-3 sm:mx-4 mt-3 sm:mt-4">
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between max-w-2xl mx-auto">
          <BackButton href="/" />
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white text-sm transition-colors cursor-pointer"
          >
            TikTok
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 gap-4 sm:gap-6 relative z-10">
        {/* Chat Bubble */}
        <div className="min-h-[60px] sm:min-h-[80px] flex items-end justify-center w-full">
          <ChatBubble message={latestBotMessage?.content || "Hey! I'm Kiwi the cat! 🐱"} />
        </div>

        {/* Cat Avatar */}
        <CatAvatar isSpeaking={isPlaying} />

        {/* Loading indicator */}
        {isLoading && (
          <div className="glass-purple rounded-full px-4 py-2">
            <p className="text-violet-300 text-sm font-medium">Thinking...</p>
          </div>
        )}

        {/* Chat Input */}
        <div className="w-full max-w-md mt-2 sm:mt-4 px-2 sm:px-0">
          <ChatInput
            onSend={handleSend}
            disabled={isLoading || isPlaying}
            placeholder="Say something to Kiwi..."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center">
        <p className="text-zinc-500 text-xs font-medium tracking-wide">
          powered by <a href="https://github.com/opensouls/opensouls" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">Soul Engine</a>
        </p>
      </footer>
    </div>
  );
}
