"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseAudioOptions {
  onStart?: (duration: number) => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export function useAudio(options: UseAudioOptions = {}) {
  const { onStart, onEnd, onError } = options;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playBase64 = useCallback(
    async (base64Audio: string, format: string = "mp3") => {
      try {
        stop();
        setIsLoading(true);

        const audio = new Audio(`data:audio/${format};base64,${base64Audio}`);
        audioRef.current = audio;

        audio.onplay = () => {
          setIsPlaying(true);
          setIsLoading(false);
          onStart?.(audio.duration);
        };

        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null;
          onEnd?.();
        };

        audio.onerror = () => {
          setIsPlaying(false);
          setIsLoading(false);
          audioRef.current = null;
          onError?.(new Error("Failed to play audio"));
        };

        await audio.play();
      } catch (error) {
        setIsPlaying(false);
        setIsLoading(false);
        audioRef.current = null;
        onError?.(error instanceof Error ? error : new Error("Unknown error"));
      }
    },
    [onStart, onEnd, onError, stop]
  );

  const speakText = useCallback(
    async (text: string) => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          throw new Error("Failed to synthesize speech");
        }

        const data = await response.json();
        await playBase64(data.audioContent, data.format || "mp3");
      } catch (error) {
        setIsLoading(false);
        onError?.(error instanceof Error ? error : new Error("Unknown error"));
      }
    },
    [playBase64, onError]
  );

  return { isPlaying, isLoading, speakText, stop };
}
