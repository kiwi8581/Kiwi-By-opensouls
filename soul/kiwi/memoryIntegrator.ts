/**
 * Memory Integrator
 * 
 * Handles memory consolidation and context management for Kiwi.
 * This module manages working memory and conversation history.
 * 
 * @see https://github.com/opensouls/opensouls
 */

import { WorkingMemory, createCognitiveStep, indentNicely } from "@opensouls/engine";

export interface MemoryContext {
  conversationHistory: string[];
  userMood?: string;
  topicsDiscussed: string[];
  lastInteractionTime: number;
}

const DEFAULT_CONTEXT: MemoryContext = {
  conversationHistory: [],
  userMood: undefined,
  topicsDiscussed: [],
  lastInteractionTime: Date.now(),
};

/**
 * Updates working memory with new context from the conversation
 */
export const updateMemoryContext = createCognitiveStep(
  (existingContext: MemoryContext, newMessage: string) => {
    return {
      instructions: indentNicely`
        Analyze the conversation and update Kiwi's memory context.
        
        Current context:
        ${JSON.stringify(existingContext, null, 2)}
        
        New message to process:
        "${newMessage}"
        
        Consider:
        - User's current mood/vibe
        - Topics being discussed
        - Any crypto-related interests
      `,
      schema: {
        type: "object",
        properties: {
          userMood: { type: "string" },
          newTopics: { type: "array", items: { type: "string" } },
          shouldRemember: { type: "boolean" },
        },
      },
    };
  }
);

/**
 * Retrieves relevant memories for the current conversation
 */
export const retrieveRelevantMemories = async (
  workingMemory: WorkingMemory,
  currentTopic?: string
): Promise<string[]> => {
  const memories: string[] = [];
  
  // In a full implementation, this would query a vector database
  // or use the Soul Engine's built-in memory systems
  
  if (currentTopic?.toLowerCase().includes("crypto")) {
    memories.push("User shows interest in crypto topics");
  }
  
  return memories;
};

/**
 * Compresses conversation history to fit within context limits
 */
export const compressHistory = (
  history: string[],
  maxLength: number = 10
): string[] => {
  if (history.length <= maxLength) {
    return history;
  }
  
  // Keep first message for context, recent messages for relevance
  return [
    history[0],
    "...[earlier conversation summarized]...",
    ...history.slice(-maxLength + 2),
  ];
};

export { DEFAULT_CONTEXT };
