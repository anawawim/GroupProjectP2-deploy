import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { VolumeUp, VolumeOff } from "@mui/icons-material";

const GameMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("/audio/game-music.mp3"));

  useEffect(() => {
    audio.loop = true; // Musik akan berputar berulang kali
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <IconButton
      onClick={toggleMusic}
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
      }}
    >
      {isPlaying ? <VolumeUp /> : <VolumeOff />}
    </IconButton>
  );
};

export default GameMusic;
