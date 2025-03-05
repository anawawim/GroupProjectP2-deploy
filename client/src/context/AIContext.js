import { createContext, useState, useContext } from "react";
import { SocketContext } from "./SocketContext";
import { getAIChoice } from "../services/geminiService";

const AIContext = createContext();

const AIContextProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState("medium");
  const [aiHistory, setAiHistory] = useState([]);
  const { socket, room, player_1 } = useContext(SocketContext);

  const adjustDifficulty = (playerScore, aiScore) => {
    const scoreDiff = playerScore - aiScore;
    let newDifficulty = difficulty;

    if (scoreDiff >= 2) {
      newDifficulty = "hard";
    } else if (scoreDiff <= -1) {
      newDifficulty = "easy";
    }

    setDifficulty(newDifficulty);
    return newDifficulty;
  };

  const handleAIChoice = async (playerChoice) => {
    try {
      const aiChoice = await getAIChoice(playerChoice, difficulty, aiHistory);
      setAiHistory([...aiHistory, { player: playerChoice, ai: aiChoice }]);
      return aiChoice;
    } catch (error) {
      console.error("Error handling AI choice:", error);
      // Fallback ke pilihan acak jika terjadi error
      const choices = ["rock", "paper", "scissors"];
      return choices[Math.floor(Math.random() * choices.length)];
    }
  };

  return (
    <AIContext.Provider
      value={{
        difficulty,
        setDifficulty,
        adjustDifficulty,
        handleAIChoice,
        aiHistory,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export { AIContext, AIContextProvider };
