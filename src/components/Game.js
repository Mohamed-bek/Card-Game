import React, { useState, useEffect } from "react";
import GameOverScreen from "./GameOverScreen";

const elementsData = [
  { id: 1, head: "angular", img: "images/angular.png" },
  { id: 2, head: "vue", img: "images/vue.png" },
  { id: 3, head: "css", img: "images/css.png" },
  { id: 4, head: "html", img: "images/html.png" },
  { id: 5, head: "js", img: "images/js.png" },
  { id: 6, head: "sass", img: "images/sass.png" },
  { id: 7, head: "github", img: "images/github.png" },
  { id: 8, head: "python", img: "images/python.png" },
  { id: 9, head: "java", img: "images/java.png" },
  { id: 10, head: "kotlin", img: "images/kotlin.png" },
];

const shuffleArray = (array) => {
  let count = array.length;
  while (count > 0) {
    const random = Math.floor(Math.random() * count);
    count--;
    [array[count], array[random]] = [array[random], array[count]];
  }
  return array;
};

const getUniqueElements = (elementsData) => {
  const secondBatch = elementsData.map((item) => ({
    ...item,
    id: item.id + elementsData.length,
  }));
  return [...elementsData, ...secondBatch];
};

const Game = ({ setGameState, level }) => {
  const getChances = (level) => {
    switch (level) {
      case "easy":
        return 40;
      case "normal":
        return 30;
      case "hard":
        return 20;
      default:
        return 20;
    }
  };

  const [elements, setElements] = useState(
    shuffleArray(getUniqueElements(elementsData))
  );
  const [flippedElements, setFlippedElements] = useState([]);
  const [matchedElements, setMatchedElements] = useState([]);
  const [chances, setChances] = useState(getChances(level));
  const [isWin, setisWin] = useState(null);

  useEffect(() => {
    if (flippedElements.length === 2) {
      const [first, second] = flippedElements;

      if (first.head === second.head) {
        setMatchedElements((prevMatched) => [
          ...prevMatched,
          first.id,
          second.id,
        ]);

        const success = new Audio("/audios/succ.wav");
        success.play();
      } else {
        setTimeout(() => {
          setElements((prevElements) =>
            prevElements.map((elem) =>
              elem.id === first.id || elem.id === second.id
                ? { ...elem, flipped: false }
                : elem
            )
          );

          const fail = new Audio("/audios/fail.mp3");
          fail.play();
        }, 700);
      }

      setChances((prev) => prev - 1);
      setFlippedElements([]);
    }
  }, [flippedElements]);

  useEffect(() => {
    // If all elements are matched, player wins
    if (matchedElements.length === elements.length && elements.length > 0) {
      setisWin(true);
      const win = new Audio("/audios/succ.wav");
      win.play();
    }

    // If chances are 0 and not all elements are matched, player loses
    if (chances === 0 && matchedElements.length !== elements.length) {
      setisWin(false);
      const lose = new Audio("/audios/lose.mp3");
      lose.play();
    }
  }, [matchedElements, chances, elements.length]);

  useEffect(() => {
    if (isWin !== null) {
      setTimeout(() => {
        setGameState("gameOver");
      }, 500);
    }
  }, [isWin, setGameState]);

  const handleClick = (elem) => {
    if (
      flippedElements.length < 2 &&
      !elem.flipped &&
      !matchedElements.includes(elem.id) &&
      !flippedElements.includes(elem)
    ) {
      setElements((prevElements) =>
        prevElements.map((e) =>
          e.id === elem.id ? { ...e, flipped: true } : e
        )
      );
      setFlippedElements((prev) => [...prev, elem]);
    }
  };

  return (
    <div>
      <div className="profile">
        <div className="chance">Chances: {chances}</div>
      </div>
      <div className="container">
        {elements.map((elem) => (
          <div
            key={elem.id}
            className={`element ${elem.flipped ? "flipped" : ""} ${
              matchedElements.includes(elem.id) ? "matched" : ""
            }`}
            onClick={() => handleClick(elem)}
          >
            <div className="back">
              <img src={elem.img} alt={elem.head} />
            </div>
            <div className="face"></div>
          </div>
        ))}
      </div>
      {isWin !== null && (
        <GameOverScreen setGameState={setGameState} isWin={isWin} />
      )}
    </div>
  );
};

export default Game;
