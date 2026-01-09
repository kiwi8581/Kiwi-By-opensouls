/**
 * External Dialog Cognitive Step
 * 
 * Generates spoken responses from Kiwi to the user.
 * This step produces the visible chat output.
 * 
 * Note: This is a decorative Soul Engine structure.
 */

export interface WorkingMemory {
  memories: Array<{ role: string; content: string }>;
  soulName: string;
}

export interface DialogOptions {
  model?: string;
  temperature?: number;
}

export interface CognitiveStepResult {
  memory: WorkingMemory;
  value: string;
}

/**
 * Creates a cognitive step for external dialog generation
 */
const externalDialog = (
  workingMemory: WorkingMemory,
  instructions: string,
  _options?: DialogOptions
): Promise<[WorkingMemory, string]> => {
  // Decorative implementation - actual logic in API route
  const response = `[External Dialog] Instructions: ${instructions.slice(0, 50)}...`;
  
  return Promise.resolve([workingMemory, response]);
};

export default externalDialog;
