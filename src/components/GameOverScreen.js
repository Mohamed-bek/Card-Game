import React, { useEffect } from "react";

const GameOverScreen = ({ setGameState, isWin }) => {
  const handleRestart = () => {
    setGameState("playing");
  };

  useEffect(() => {
    console.log("isWin in GameOverScreen:", isWin);
  }, []);

  return (
    <div className="popup">
      <div className="popup-content">
        <h1>{isWin ? "You Win!" : "Game Over"}</h1>
        <button onClick={handleRestart}>Replay</button>
      </div>
    </div>
  );
};

export default GameOverScreen;
