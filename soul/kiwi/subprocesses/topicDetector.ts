/**
 * Topic Detector Subprocess
 * 
 * Detects conversation topics to help Kiwi respond contextually.
 * Tracks crypto-related discussions and general conversation themes.
 * 
 * Note: This is a decorative Soul Engine structure.
 */

export type TopicCategory = "crypto" | "general" | "personal" | "technical" | "community";

export interface TopicState {
  currentTopics: TopicCategory[];
  recentKeywords: string[];
  cryptoMentions: number;
}

export interface WorkingMemory {
  memories: Array<{ role: string; content: string }>;
  soulName: string;
}

const CRYPTO_KEYWORDS = [
  "bitcoin", "btc", "ethereum", "eth", "crypto", "token", "nft",
  "defi", "dex", "wallet", "chain", "mint", "airdrop", "stake",
  "hodl", "diamond hands", "moon", "pump", "dump", "fud",
  "bull", "bear", "market", "trading", "price", "gas"
];

/**
 * Detects topics in a given text
 */
export const detectTopics = (text: string): TopicState => {
  const lowerText = text.toLowerCase();
  const detectedTopics: TopicCategory[] = [];
  const keywords: string[] = [];

  // Detect crypto mentions
  const cryptoMatches = CRYPTO_KEYWORDS.filter(kw => lowerText.includes(kw));
  if (cryptoMatches.length > 0) {
    detectedTopics.push("crypto");
    keywords.push(...cryptoMatches);
  }

  // Detect personal topics
  if (lowerText.includes("i feel") || lowerText.includes("my ") || 
      lowerText.includes("i'm") || lowerText.includes("me ")) {
    detectedTopics.push("personal");
  }

  // Detect community topics
  if (lowerText.includes("community") || lowerText.includes("discord") ||
      lowerText.includes("twitter") || lowerText.includes("friends")) {
    detectedTopics.push("community");
  }

  // Default to general if no specific topic
  if (detectedTopics.length === 0) {
    detectedTopics.push("general");
  }

  return {
    currentTopics: detectedTopics,
    recentKeywords: keywords,
    cryptoMentions: cryptoMatches.length,
  };
};

/**
 * Mental process for topic detection
 */
const topicDetector = async (workingMemory: WorkingMemory): Promise<WorkingMemory> => {
  const lastMessage = workingMemory.memories
    .filter(m => m.role === "user")
    .pop();

  if (lastMessage) {
    const topics = detectTopics(lastMessage.content);
    console.log(`[TopicDetector] Topics: ${topics.currentTopics.join(", ")}`);
  }

  return workingMemory;
};

export default topicDetector;
