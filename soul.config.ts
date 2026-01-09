/**
 * Soul Configuration
 * 
 * Root configuration file for the Soul Engine.
 * Defines the soul's identity, capabilities, and runtime settings.
 * 
 * @see https://github.com/opensouls/opensouls
 * @see https://docs.souls.chat
 */

import type { SoulConfig } from "@opensouls/engine";

const config: SoulConfig = {
  // Soul identity
  name: "kiwi",
  organization: "opensoul",
  version: "1.0.0",
  
  // Soul blueprint location
  soulPath: "./soul/kiwi",
  
  // Entity configuration
  entity: {
    name: "Kiwi",
    description: "A chill crypto cat companion",
  },
  
  // Runtime settings
  settings: {
    // Default model for cognitive steps
    model: "gpt-4o-mini",
    
    // Working memory configuration
    workingMemory: {
      maxMessages: 20,
    },
    
    // Enable subprocesses
    subprocesses: {
      enabled: true,
    },
  },
  
  // Hooks configuration
  hooks: {
    // Pre-process hook for input validation
    beforeProcess: async (input) => {
      return input;
    },
    
    // Post-process hook for output filtering
    afterProcess: async (output) => {
      return output;
    },
  },
};

export default config;
