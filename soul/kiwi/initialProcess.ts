/**
 * Initial Process
 * 
 * The entry point for Kiwi's cognitive processing.
 * This mental process handles the main conversational loop.
 * 
 * @see https://github.com/opensouls/opensouls
 */

import { MentalProcess, useActions, useProcessManager } from "@opensouls/engine";
import externalDialog from "./cognitiveSteps/externalDialog";
import internalMonologue from "./cognitiveSteps/internalMonologue";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { speak, log } = useActions();
  const { invocationCount } = useProcessManager();

  // First interaction - greet the user
  if (invocationCount === 0) {
    const [withGreeting, greeting] = await externalDialog(
      workingMemory,
      "Greet the user warmly as Kiwi, a chill crypto cat. Keep it short and positive.",
      { model: "gpt-4o-mini" }
    );
    speak(greeting);
    return withGreeting;
  }

  // Internal reflection on user message
  const [withReflection, reflection] = await internalMonologue(
    workingMemory,
    "What vibe is the user giving? How can Kiwi respond authentically?",
    { model: "gpt-4o-mini" }
  );
  log("Internal reflection:", reflection);

  // Generate response
  const [withResponse, response] = await externalDialog(
    withReflection,
    "Respond as Kiwi - be chill, positive, and keep it brief. If crypto-related, share enthusiasm but no financial advice.",
    { model: "gpt-4o-mini" }
  );
  speak(response);

  return withResponse;
};

export default initialProcess;
