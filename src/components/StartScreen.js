import React, { useState } from "react";

const StartScreen = ({ setLevel, setGameState }) => {
  const [selectedLevel, setSelectedLevel] = useState("normal");

  const handleStart = () => {
    setLevel(selectedLevel);
    setGameState("playing");
  };

  return (
    <div className="start-container">
      <div className="start-card">
        <h2 className="title">Choose Game Level</h2>
        <div className="level-selection">
          <label htmlFor="level" className="label">
            Select Level:
          </label>
          <select
            id="level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="level-dropdown"
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button onClick={handleStart} className="start-button">
          Start Play
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
