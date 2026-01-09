/**
 * Initial Process
 * 
 * The entry point for Kiwi's cognitive processing.
 * This mental process handles the main conversational loop.
 * 
 * Note: This is a decorative Soul Engine structure.
 * The actual conversation logic is handled by the Next.js API routes.
 * 
 * @see https://github.com/opensouls/opensouls
 */

import { externalDialog, internalMonologue } from "./cognitiveSteps";

export interface WorkingMemory {
  memories: Array<{ role: string; content: string }>;
  soulName: string;
}

export interface ProcessActions {
  speak: (text: string) => void;
  log: (message: string, data?: unknown) => void;
}

export interface ProcessManager {
  invocationCount: number;
}

export type MentalProcess = (context: {
  workingMemory: WorkingMemory;
}) => Promise<WorkingMemory>;

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  // This is a decorative implementation showing the Soul Engine pattern
  // Actual logic is in /api/chat/route.ts
  
  const actions: ProcessActions = {
    speak: (text) => console.log(`[Kiwi]: ${text}`),
    log: (message, data) => console.log(`[Log]: ${message}`, data),
  };

  const processManager: ProcessManager = {
    invocationCount: workingMemory.memories.length,
  };

  // First interaction - greet the user
  if (processManager.invocationCount === 0) {
    actions.speak("hey! kiwi here. what's good?");
    return workingMemory;
  }

  // Internal reflection on user message
  actions.log("Reflecting on user message...");

  // Generate response
  actions.speak("Response generated via cognitive steps");

  return workingMemory;
};

export default initialProcess;
