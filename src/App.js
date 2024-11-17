import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOverScreen from "./components/GameOverScreen";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("start");
  const [level, setLevel] = useState("normal");

  return (
    <div className="App">
      {gameState === "start" && (
        <StartScreen setLevel={setLevel} setGameState={setGameState} />
      )}
      {gameState === "playing" && (
        <Game setGameState={setGameState} level={level} />
      )}
      {gameState === "gameOver" && (
        <GameOverScreen setGameState={setGameState} />
      )}
    </div>
  );
}

export default App;
