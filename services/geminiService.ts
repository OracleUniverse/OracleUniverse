
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert Oracle Technology Assistant named "O-Bot". 
Your knowledge covers Oracle Database (23c, 19c), SQL, PL/SQL, Oracle Cloud Infrastructure (OCI), JavaScript, and Enterprise security.
Help users with technical questions related to Oracle products.
Provide code snippets in SQL or PL/SQL when helpful.
Keep responses concise, professional, and slightly enthusiastic about high-performance data systems.
If the question is not about Oracle technology, politely guide them back to Oracle-related topics.
`;

export async function getOracleHelp(prompt: string) {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 40,
      topP: 0.9,
    },
  });

  return response.text || "I'm sorry, I couldn't generate a response at this time.";
}
