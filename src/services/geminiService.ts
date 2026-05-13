import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const MythoriaAI = {
  generateLore: async (topic: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a short, immersive fantasy lore entry for: ${topic}. Use a mystical and ancient tone.`,
        config: {
          systemInstruction: "You are the Chronicler of Mythoria, a world of high fantasy and ancient magic.",
          temperature: 0.8,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "The scrolls are currently unreadable by magical interference...";
    }
  },

  generateNPCResponse: async (npcName: string, playerMessage: string, worldContext: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `NPC: ${npcName}\nContext: ${worldContext}\nPlayer: ${playerMessage}\nResponse:`,
        config: {
          systemInstruction: `You are an NPC in the fantasy world of Mythoria. Keep your responses short, thematic, and in character as ${npcName}.`,
          temperature: 0.7,
        }
      });
      return response.text;
    } catch (error) {
      console.error("NPC Dialogue Error:", error);
      return "Greetings, traveler. I seem to have lost my voice for a moment.";
    }
  },

  generateQuest: async (playerLevel: number) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a unique fantasy quest for a level ${playerLevel} hero in Mythoria.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Easy", "Normal", "Hard", "Mythic"] },
              rewardGold: { type: Type.INTEGER },
              rewardXP: { type: Type.INTEGER }
            },
            required: ["title", "description", "difficulty", "rewardGold", "rewardXP"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Quest Generation Error:", error);
      return null;
    }
  }
};
