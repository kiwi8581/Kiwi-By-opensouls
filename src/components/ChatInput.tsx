"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type a message...",
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass rounded-full px-4 sm:px-5 py-3 flex items-center gap-3 transition-all duration-300 focus-within:border-violet-500/50 focus-within:shadow-lg focus-within:shadow-violet-500/10">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent text-white text-base sm:text-sm outline-none placeholder:text-zinc-500 font-medium min-w-0"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="w-10 h-10 sm:w-9 sm:h-9 flex-shrink-0 rounded-full bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:opacity-50 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 cursor-pointer disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      </button>
    </div>
  );
}
