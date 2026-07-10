function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const API_URL = process.env.LIVEAVATAR_API_URL?.trim() || "https://api.liveavatar.com";
export const API_KEY = required("LIVEAVATAR_API_KEY");
export const AVATAR_ID = required("LIVEAVATAR_AVATAR_ID");
export const IS_SANDBOX = process.env.LIVEAVATAR_SANDBOX !== "false";

// Optional FULL mode values retained for the existing demo routes.
export const VOICE_ID = process.env.LIVEAVATAR_VOICE_ID?.trim() || "";
export const CONTEXT_ID = process.env.LIVEAVATAR_CONTEXT_ID?.trim() || "";
export const LANGUAGE = process.env.LIVEAVATAR_LANGUAGE?.trim() || "en";

// Optional provider keys used by existing LITE connector examples.
export const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY?.trim() || "";
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim() || "";
