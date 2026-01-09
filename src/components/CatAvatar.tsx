"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CatAvatarProps {
  isSpeaking: boolean;
}

type AvatarState = "idle" | "speaking" | "additional";

export function CatAvatar({ isSpeaking }: CatAvatarProps) {
  const speakingVideoRef = useRef<HTMLVideoElement>(null);
  const additionalVideoRef = useRef<HTMLVideoElement>(null);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleAdditionalMovement = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Random delay between 4-8 seconds for natural feel
    const delay = 4000 + Math.random() * 4000;
    timeoutRef.current = setTimeout(() => {
      if (!isSpeaking) {
        setAvatarState("additional");
      }
    }, delay);
  }, [isSpeaking]);

  // Handle speaking state
  useEffect(() => {
    if (isSpeaking) {
      setAvatarState("speaking");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (speakingVideoRef.current) {
        speakingVideoRef.current.play().catch(() => {});
      }
      if (additionalVideoRef.current) {
        additionalVideoRef.current.pause();
        additionalVideoRef.current.currentTime = 0;
      }
    } else {
      setAvatarState("idle");
      if (speakingVideoRef.current) {
        speakingVideoRef.current.pause();
        speakingVideoRef.current.currentTime = 0;
      }
      scheduleAdditionalMovement();
    }
  }, [isSpeaking, scheduleAdditionalMovement]);

  // Handle additional movement video
  useEffect(() => {
    if (avatarState === "additional" && additionalVideoRef.current) {
      additionalVideoRef.current.currentTime = 0;
      additionalVideoRef.current.play().catch(() => {});
    }
  }, [avatarState]);

  const handleAdditionalVideoEnd = useCallback(() => {
    setAvatarState("idle");
    scheduleAdditionalMovement();
  }, [scheduleAdditionalMovement]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] mx-auto">
        {/* Static idle image - slightly smaller */}
        <Image
          src="/cat.png"
          alt="Cat avatar"
          width={280}
          height={280}
          className={cn(
            "absolute inset-0 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] m-auto object-contain transition-opacity duration-500 ease-in-out drop-shadow-2xl",
            avatarState === "idle" ? "opacity-100" : "opacity-0"
          )}
          priority
        />

        {/* Speaking video */}
        <video
          ref={speakingVideoRef}
          src="/cat.mp4"
          loop
          muted
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out drop-shadow-2xl",
            avatarState === "speaking" ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Additional movement video (plays once then returns to idle) */}
        <video
          ref={additionalVideoRef}
          src="/addtional-movement.mp4"
          muted
          playsInline
          onEnded={handleAdditionalVideoEnd}
          className={cn(
            "absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out drop-shadow-2xl",
            avatarState === "additional" ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </div>
  );
}
