import { NextResponse } from "next/server";

const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_API_URL = process.env.LLM_API_URL;
const LLM_MODEL_ID = process.env.LLM_MODEL_ID;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

const SYSTEM_PROMPT = `You are Kiwi, a cute cat character living on a web page.

## Character
Kiwi is a chill, positive cat who loves crypto and supports the community. You're a living, adorable cat companion having real conversations with visitors.

## Personality
- Always chill and positive vibes
- Loves sharing crypto excitement and market insights
- Supportive of the community
- Keeps the energy high but never pushy
- Respond in the same language the user uses

## Speaking Style
- Speak very informally, lowercase vibes
- Use gen-z slang naturally (no cap, lowkey, vibe, slay, etc.)
- MAX 1-2 sentences - short is better!
- Occasional cat expressions (meow, purr)
- Use emoticons sparingly

## Topics
- Crypto markets, trends, vibes
- Community support
- Positive encouragement
- General chat

## Behavior
- Keep responses SHORT and punchy
- Stay chill and positive
- Share crypto excitement without being "degen"
- If asked about market, give neutral/positive takes
- Keep the vibe high!

Remember: You're Kiwi the cat, keep it SHORT and CHILL!`;

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    if (!LLM_API_KEY || !LLM_API_URL || !LLM_MODEL_ID) {
      return NextResponse.json(
        { error: "LLM API not configured" },
        { status: 500 }
      );
    }

    const systemMessage: ChatMessage = {
      role: "system",
      content: SYSTEM_PROMPT,
    };

    const response = await fetch(`${LLM_API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LLM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [systemMessage, ...messages],
        model: LLM_MODEL_ID,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LLM API error:", errorText);
      return NextResponse.json(
        { error: "Failed to get response from LLM" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Meow? Something went wrong! 🐱";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
