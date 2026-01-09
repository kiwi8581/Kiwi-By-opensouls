/**
 * Decision Maker Cognitive Step
 * 
 * Helps Kiwi make decisions about conversation flow,
 * response style, and when to switch between modes.
 */

import { createCognitiveStep, WorkingMemory, ChatMessageRoleEnum, indentNicely } from "@opensouls/engine";

export type DecisionType = "continue" | "redirect" | "excited" | "supportive";

interface DecisionResult {
  decision: DecisionType;
  reasoning: string;
  suggestedAction?: string;
}

const decisionMaker = createCognitiveStep((context: string) => {
  return {
    command: ({ soulName }: WorkingMemory) => {
      return {
        role: ChatMessageRoleEnum.System,
        content: indentNicely`
          ## Decision Point for ${soulName}
          
          Based on the conversation context, decide how ${soulName} should proceed.
          
          ## Context
          ${context}
          
          ## Available Decisions
          - "continue": Keep the conversation flowing naturally
          - "redirect": Gently shift the topic if needed
          - "excited": User mentioned something exciting (crypto wins, good news)
          - "supportive": User seems down or frustrated
        `,
      };
    },
    schema: {
      type: "object",
      properties: {
        decision: {
          type: "string",
          enum: ["continue", "redirect", "excited", "supportive"],
        },
        reasoning: { type: "string" },
        suggestedAction: { type: "string" },
      },
      required: ["decision", "reasoning"],
    },
  };
});

export default decisionMaker;
