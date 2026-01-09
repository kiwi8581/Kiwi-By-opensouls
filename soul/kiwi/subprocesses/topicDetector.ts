/**
 * Topic Detector Subprocess
 * 
 * Detects conversation topics to help Kiwi respond contextually.
 * Tracks crypto-related discussions and general conversation themes.
 */

import { MentalProcess, useActions, useProcessMemory } from "@opensouls/engine";

export type TopicCategory = "crypto" | "general" | "personal" | "technical" | "community";

interface TopicState {
  currentTopics: TopicCategory[];
  recentKeywords: string[];
  cryptoMentions: number;
}

const CRYPTO_KEYWORDS = [
  "bitcoin", "btc", "ethereum", "eth", "crypto", "token", "nft",
  "defi", "dex", "wallet", "chain", "mint", "airdrop", "stake",
  "hodl", "diamond hands", "moon", "pump", "dump", "fud",
  "bull", "bear", "market", "trading", "price", "gas"
];

const topicDetector: MentalProcess = async ({ workingMemory }) => {
  const { log } = useActions();
  const topicMemory = useProcessMemory<TopicState>("topicState");

  // Get last user message
  const messages = workingMemory.memories;
  const lastUserMessage = messages
    .filter(m => m.role === "user")
    .pop();

  if (!lastUserMessage) {
    return workingMemory;
  }

  const messageText = lastUserMessage.content.toString().toLowerCase();
  const detectedTopics: TopicCategory[] = [];
  const keywords: string[] = [];

  // Detect crypto mentions
  const cryptoMatches = CRYPTO_KEYWORDS.filter(kw => messageText.includes(kw));
  if (cryptoMatches.length > 0) {
    detectedTopics.push("crypto");
    keywords.push(...cryptoMatches);
    log(`Crypto keywords detected: ${cryptoMatches.join(", ")}`);
  }

  // Detect personal topics
  if (messageText.includes("i feel") || messageText.includes("my ") || 
      messageText.includes("i'm") || messageText.includes("me ")) {
    detectedTopics.push("personal");
  }

  // Detect community topics
  if (messageText.includes("community") || messageText.includes("discord") ||
      messageText.includes("twitter") || messageText.includes("friends")) {
    detectedTopics.push("community");
  }

  // Default to general if no specific topic
  if (detectedTopics.length === 0) {
    detectedTopics.push("general");
  }

  // Update topic memory
  const prevState = topicMemory.current || { 
    currentTopics: [], 
    recentKeywords: [], 
    cryptoMentions: 0 
  };
  
  topicMemory.current = {
    currentTopics: detectedTopics,
    recentKeywords: [...keywords, ...prevState.recentKeywords.slice(0, 10)],
    cryptoMentions: prevState.cryptoMentions + cryptoMatches.length,
  };

  return workingMemory;
};

export default topicDetector;
