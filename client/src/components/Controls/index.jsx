import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { AIContext } from "../../context/AIContext";
import rock_right_hand_img from "../../images/rock_right_hand.png";
import paper_right_hand_img from "../../images/paper_right_hand.png";
import scissors_right_hand_img from "../../images/scissors_right_hand.png";
import styles from "./styles.module.css";

function Controls() {
  const [option, setOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { socket, room } = useContext(SocketContext);
  const { handleAIChoice, adjustDifficulty } = useContext(AIContext);

  useEffect(() => {
    if (room.players[socket.id].optionLock) {
      setOption(room.players[socket.id].option);
    } else {
      setOption("");
    }
  }, [room]);

  const handleChange = async ({ currentTarget: input }) => {
    const playerChoice = input.value;
    setOption(playerChoice);
    room.players[socket.id].option = playerChoice;
    room.players[socket.id].optionLock = true;

    // Jika bermain melawan AI
    if (room.type === "ai") {
      setIsLoading(true);
      try {
        const aiChoice = await handleAIChoice(playerChoice);
        room.players["ai"].option = aiChoice;
        room.players["ai"].optionLock = true;

        // Sesuaikan tingkat kesulitan berdasarkan skor
        adjustDifficulty(
          room.players[socket.id].score,
          room.players["ai"].score
        );
      } catch (error) {
        console.error("Error handling AI choice:", error);
      } finally {
        setIsLoading(false);
      }
    }

    socket.emit("room:update", room);
  };

  return (
    <div className={styles.container}>
      <button
        disabled={room.players[socket.id].optionLock || isLoading}
        className={
          option === "rock"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        value="rock"
      >
        <img
          src={rock_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
      <button
        disabled={room.players[socket.id].optionLock || isLoading}
        className={
          option === "paper"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        value="paper"
      >
        <img
          src={paper_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
      <button
        disabled={room.players[socket.id].optionLock || isLoading}
        className={
          option === "scissors"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        value="scissors"
      >
        <img
          src={scissors_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
    </div>
  );
}

export default Controls;
