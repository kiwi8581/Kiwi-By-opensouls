"use client";

import Link from "next/link";

interface BackButtonProps {
  href?: string;
}

export function BackButton({ href = "/" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="text-zinc-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer hover:gap-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <span className="font-medium">Back</span>
    </Link>
  );
}
