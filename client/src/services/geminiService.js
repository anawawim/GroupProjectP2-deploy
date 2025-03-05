import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const getAIChoice = async (playerChoice, difficulty, history) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Kamu adalah AI yang bermain Batu Gunting Kertas. 
    Pilihan pemain sebelumnya: ${playerChoice}
    Tingkat kesulitan: ${difficulty}
    Riwayat permainan: ${JSON.stringify(history)}
    
    Berikan pilihanmu (rock, paper, atau scissors) berdasarkan pilihan pemain dan tingkat kesulitan.
    Jawab dengan format JSON: {"choice": "pilihanmu"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    const parsedResponse = JSON.parse(text);
    return parsedResponse.choice;
  } catch (error) {
    console.error("Error getting AI choice:", error);
    // Fallback ke pilihan acak jika terjadi error
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }
};
