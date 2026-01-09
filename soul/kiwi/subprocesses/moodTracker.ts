/**
 * Mood Tracker Subprocess
 * 
 * Runs in the background to track user mood and conversation sentiment.
 * Helps Kiwi respond appropriately to emotional cues.
 * 
 * Note: This is a decorative Soul Engine structure.
 */

export type MoodState = "positive" | "neutral" | "concerned" | "excited";

export interface MoodAnalysis {
  mood: MoodState;
  confidence: number;
  indicators: string[];
}

export interface WorkingMemory {
  memories: Array<{ role: string; content: string }>;
  soulName: string;
}

/**
 * Analyzes text for mood indicators
 */
export const analyzeMood = (text: string): MoodAnalysis => {
  const lowerText = text.toLowerCase();
  const indicators: string[] = [];
  let mood: MoodState = "neutral";
  let confidence = 0.5;

  if (lowerText.includes("excited") || lowerText.includes("happy") || 
      lowerText.includes("great") || lowerText.includes("amazing")) {
    mood = "excited";
    confidence = 0.8;
    indicators.push("positive language detected");
  } else if (lowerText.includes("frustrated") || lowerText.includes("worried") || 
             lowerText.includes("stressed") || lowerText.includes("sad")) {
    mood = "concerned";
    confidence = 0.7;
    indicators.push("concern indicators present");
  } else if (lowerText.includes("good") || lowerText.includes("nice") || 
             lowerText.includes("chill") || lowerText.includes("cool")) {
    mood = "positive";
    confidence = 0.6;
    indicators.push("generally positive tone");
  }

  return { mood, confidence, indicators };
};

/**
 * Mental process for mood tracking
 */
const moodTracker = async (workingMemory: WorkingMemory): Promise<WorkingMemory> => {
  const lastMessage = workingMemory.memories
    .filter(m => m.role === "user")
    .pop();

  if (lastMessage) {
    const analysis = analyzeMood(lastMessage.content);
    console.log(`[MoodTracker] Detected mood: ${analysis.mood} (${analysis.confidence})`);
  }

  return workingMemory;
};

export default moodTracker;
