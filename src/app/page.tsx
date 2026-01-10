"use client";

import { useState, useCallback } from "react";
import { CatAvatar } from "@/components/CatAvatar";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatInput } from "@/components/ChatInput";
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
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-end gap-4 max-w-2xl mx-auto">
          {/* X (Twitter) */}
          <a
            href="https://x.com/kiwithecat66559"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/kiwi8581/Kiwi-By-opensouls.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
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
          powered by <a href="https://github.com/kiwi8581/Kiwi-By-opensouls" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">OpenSouls</a>
        </p>
      </footer>
    </div>
  );
}
