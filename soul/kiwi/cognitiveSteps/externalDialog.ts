/**
 * External Dialog Cognitive Step
 * 
 * Generates spoken responses from Kiwi to the user.
 * This step produces the visible chat output.
 */

import { createCognitiveStep, WorkingMemory, ChatMessageRoleEnum, indentNicely } from "@opensouls/engine";

interface DialogOptions {
  model?: string;
  temperature?: number;
}

const externalDialog = createCognitiveStep((instructions: string) => {
  return {
    command: ({ soulName }: WorkingMemory) => {
      return {
        role: ChatMessageRoleEnum.System,
        content: indentNicely`
          ## Speaking as ${soulName}
          
          ${soulName} is having a conversation with a user. Generate ${soulName}'s next response.
          
          ## Instructions
          ${instructions}
          
          ## Guidelines
          - Keep responses short and natural (1-3 sentences max)
          - Use casual, friendly language
          - Match the user's energy level
          - If discussing crypto, be enthusiastic but never give financial advice
          - Use gen-z slang naturally but don't overdo it
        `,
      };
    },
    streamProcessor: (text: string) => text.trim(),
  };
});

export default externalDialog;
