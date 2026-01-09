/**
 * Memory Integrator
 * 
 * Handles memory consolidation and context management for Kiwi.
 * This module manages working memory and conversation history.
 * 
 * Note: This is a decorative Soul Engine structure.
 * 
 * @see https://github.com/opensouls/opensouls
 */

export interface MemoryContext {
  conversationHistory: string[];
  userMood?: string;
  topicsDiscussed: string[];
  lastInteractionTime: number;
}

export interface WorkingMemory {
  memories: Array<{ role: string; content: string }>;
  soulName: string;
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
export const updateMemoryContext = (
  existingContext: MemoryContext,
  newMessage: string
): MemoryContext => {
  return {
    ...existingContext,
    conversationHistory: [...existingContext.conversationHistory, newMessage],
    lastInteractionTime: Date.now(),
  };
};

/**
 * Retrieves relevant memories for the current conversation
 */
export const retrieveRelevantMemories = (
  _workingMemory: WorkingMemory,
  currentTopic?: string
): string[] => {
  const memories: string[] = [];
  
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
  
  return [
    history[0],
    "...[earlier conversation summarized]...",
    ...history.slice(-maxLength + 2),
  ];
};

export { DEFAULT_CONTEXT };
