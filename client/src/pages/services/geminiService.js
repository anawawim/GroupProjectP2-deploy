import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const getAIChoice = async (playerChoice, difficulty, gameHistory) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Dalam permainan Batu Gunting Kertas, saya adalah AI dengan tingkat kesulitan ${difficulty}. 
    Pilihan pemain terakhir adalah ${playerChoice}. 
    Riwayat permainan terakhir: ${JSON.stringify(gameHistory.slice(-3))}
    
    Berdasarkan tingkat kesulitan saya:
    - Easy: Saya harus memilih pilihan yang kalah
    - Medium: Saya harus memilih secara acak
    - Hard: Saya harus memilih pilihan yang menang
    
    Berikan pilihan saya (rock, paper, atau scissors) dalam format JSON: {"choice": "pilihan"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonResponse = JSON.parse(text);

    return jsonResponse.choice;
  } catch (error) {
    console.error("Error getting AI choice:", error);
    // Fallback ke pilihan acak jika terjadi error
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }
};
