/**
 * Mood Tracker Subprocess
 * 
 * Runs in the background to track user mood and conversation sentiment.
 * Helps Kiwi respond appropriately to emotional cues.
 */

import { MentalProcess, useActions, useProcessMemory } from "@opensouls/engine";
import internalMonologue from "../cognitiveSteps/internalMonologue";

export type MoodState = "positive" | "neutral" | "concerned" | "excited";

interface MoodAnalysis {
  mood: MoodState;
  confidence: number;
  indicators: string[];
}

const moodTracker: MentalProcess = async ({ workingMemory }) => {
  const { log } = useActions();
  const moodMemory = useProcessMemory<MoodAnalysis>("moodState");

  // Analyze current mood from recent messages
  const [withAnalysis, analysis] = await internalMonologue(
    workingMemory,
    `Analyze the user's current emotional state. 
     Look for: excitement, frustration, curiosity, sadness, or neutral vibes.
     Consider tone, word choice, and context.`,
    { model: "gpt-4o-mini" }
  );

  // Parse mood indicators
  const currentMood = parseMoodFromAnalysis(analysis);
  
  // Compare with previous mood
  const previousMood = moodMemory.current;
  if (previousMood && previousMood.mood !== currentMood.mood) {
    log(`Mood shifted: ${previousMood.mood} -> ${currentMood.mood}`);
  }

  // Store updated mood
  moodMemory.current = currentMood;

  return withAnalysis;
};

function parseMoodFromAnalysis(analysis: string): MoodAnalysis {
  const lowerAnalysis = analysis.toLowerCase();
  
  const indicators: string[] = [];
  let mood: MoodState = "neutral";
  let confidence = 0.5;

  // Simple keyword-based mood detection
  if (lowerAnalysis.includes("excited") || lowerAnalysis.includes("happy") || lowerAnalysis.includes("great")) {
    mood = "excited";
    confidence = 0.8;
    indicators.push("positive language detected");
  } else if (lowerAnalysis.includes("frustrated") || lowerAnalysis.includes("worried") || lowerAnalysis.includes("stressed")) {
    mood = "concerned";
    confidence = 0.7;
    indicators.push("concern indicators present");
  } else if (lowerAnalysis.includes("good") || lowerAnalysis.includes("nice") || lowerAnalysis.includes("chill")) {
    mood = "positive";
    confidence = 0.6;
    indicators.push("generally positive tone");
  }

  return { mood, confidence, indicators };
}

export default moodTracker;
