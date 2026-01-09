/**
 * Internal Monologue Cognitive Step
 * 
 * Generates Kiwi's internal thoughts and reflections.
 * These thoughts are not shown to the user but guide responses.
 */

import { createCognitiveStep, WorkingMemory, ChatMessageRoleEnum, indentNicely } from "@opensouls/engine";

const internalMonologue = createCognitiveStep((instructions: string) => {
  return {
    command: ({ soulName }: WorkingMemory) => {
      return {
        role: ChatMessageRoleEnum.System,
        content: indentNicely`
          ## Internal Reflection for ${soulName}
          
          ${soulName} is reflecting internally about the conversation.
          This reflection is private and helps guide the response.
          
          ## Instructions
          ${instructions}
          
          ## Reflection Focus
          - What is the user's current emotional state?
          - What topics are they interested in?
          - How can ${soulName} be most helpful?
          - What's the best way to maintain good vibes?
        `,
      };
    },
    postProcess: async ({ memory, value }) => {
      const reflection = value.toString();
      return [memory, reflection];
    },
  };
});

export default internalMonologue;
