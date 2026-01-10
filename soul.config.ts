/**
 * Soul Configuration
 * 
 * Root configuration file for the Soul Engine.
 * Defines the soul's identity, capabilities, and runtime settings.
 * 
 * @see https://github.com/kiwi8581/Kiwi-By-opensouls
 * @see https://docs.souls.chat
 */

interface SoulConfig {
  name: string;
  organization: string;
  version: string;
  soulPath: string;
  entity: { name: string; description: string };
  settings: {
    model: string;
    workingMemory: { maxMessages: number };
    subprocesses: { enabled: boolean };
  };
  hooks: {
    beforeProcess: (input: unknown) => Promise<unknown>;
    afterProcess: (output: unknown) => Promise<unknown>;
  };
}

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
