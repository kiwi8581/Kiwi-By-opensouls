"use client";

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
}

export function ChatBubble({ message, isUser = false }: ChatBubbleProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "max-w-[85vw] sm:max-w-[320px] px-4 sm:px-5 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-300",
        isUser
          ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white ml-auto shadow-lg shadow-violet-500/20"
          : "glass-purple glow-purple-sm text-white"
      )}
    >
      {message}
    </div>
  );
}
