import { OpenAI } from "openai";
import { Groq } from "groq-sdk";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateParagraph(language: string, difficulty: string) {
  const prompt = `Generate an EXTRA LONG typing practice paragraph in ${language} for a professional typing examination. 
  Difficulty: ${difficulty}. 
  Length: 350-500 words. 
  Topic: Professional workplace scenarios, computer technology history, or academic literature.
  The content MUST be extremely detailed, continuous, and flowing. 
  It must be a single large block of text. Avoid any headers, lists, or quotes.
  Output ONLY the paragraph text.`;


  try {
    console.log(`Generating ${language} paragraph via Groq...`);
    if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is missing");
    
    const groqResponse = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 2048,
    });

    const content = groqResponse.choices[0]?.message?.content || "";
    if (content) return content;
    throw new Error("Groq returned empty content");
  } catch (error) {
    console.error("Groq fail:", error);
    
    try {
      if (!process.env.OPEN_AI_API_KEY) throw new Error("OPEN_AI_API_KEY is missing");
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.choices[0]?.message?.content || "";
      if (content) return content;
      throw new Error("OpenAI returned empty content");
    } catch (oaError) {
      console.error("AI Generation Critical Failure:", oaError);
      throw new Error(`AI Providers failed. Groq: ${error instanceof Error ? error.message : 'Unknown'}. OpenAI: ${oaError instanceof Error ? oaError.message : 'Unknown'}`);
    }
  }
}

/**
 * OpenAI Text-to-Speech for Dictation Mode
 * Converts the paragraph into a high-quality audio stream for the user to listen and type.
 */
export async function getDictationAudio(text: string) {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova", // nova, shimmer, echo, onyx are available
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer;
  } catch (error) {
    console.error("OpenAI TTS Error:", error);
    return null;
  }
}
