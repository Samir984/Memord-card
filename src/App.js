import { useState, useEffect } from "react";
import "./App.css";
import apple from "./asset/apple.png";
import spider from "./asset/spider.png";
import bomb from "./asset/bomb.png";
import happy from "./asset/happy.png";
import sad from "./asset/sad.png";
import ironman from "./asset/ironman.png";
import monkey from "./asset/moneky.png";
import mouse from "./asset/mouse.png";
import demon from "./asset/demon.png";
import dimond from "./asset/dimond.png";
import glowbulb from "./asset/glow_bulb.png";
import bulb from "./asset/bulb.png";

const images = [
  [monkey, 2, false],
  [spider, 3, false],
  [apple, 1, false],
  [mouse, 4, false],
  [apple, 1, false],
  [ironman, 5, false],
  [spider, 3, false],
  [bomb, 7, false],
  [happy, 8, false],
  [sad, 9, false],
  [demon, 10, false],
  [dimond, 6, false],
  [ironman, 5, false],
  [sad, 9, false],
  [monkey, 2, false],
  [bomb, 7, false],
  [demon, 10, false],
  [mouse, 4, false],
  [happy, 8, false],
  [dimond, 6, false],
];

const shuffleImg = function () {
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
};

shuffleImg();

function App() {
  return (
    <div className="app">
      <Header />
      <Game />
    </div>
  );
}

function Header() {
  return <div className="header">Memory Card</div>;
}

let flipCardIdx = [];
let flipCount = 0;

function Game() {
  const [flipId, setFlipId] = useState(null);
  const [timer, setTimer] = useState(100);
  const [gameOver, setGameOver] = useState(false);

  const showFace = (idx) => (images[idx][2] = true);
  const hideFace = (idx) => (images[idx][2] = false);

  useEffect(() => {
    let countdown;

    countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(countdown);
        setGameOver(true);
        alert("Game Over!");
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  const handleFlip = function (id, idx) {
    if (gameOver) {
      return;
    }

    flipCount++;
    showFace(idx);
    flipCardIdx.push(idx);

    // Card matched, turn on
    setFlipId((cur) => {
      if (cur === id) {
        flipCardIdx = [];
        return null;
      } else {
        return id;
      }
    });

    // Card not matched, turn off
    if (flipCardIdx.length === 2 && flipId !== id) {
      setTimeout(() => {
        hideFace(flipCardIdx[0]);
        hideFace(flipCardIdx[1]);
        flipCardIdx = [];
        setFlipId(null);
      }, 500);
    }
  };

  return (
    <div className="game">
      <GameInfo flipCount={flipCount} timer={timer} />
      <GameMain onFlip={handleFlip} gameOver={gameOver} />
    </div>
  );
}

function GameInfo({ flipCount, timer }) {
  return (
    <div className="gameinfo" style={{ color: "green" }}>
      <div>
        Flips: <span className="flip__count">{flipCount}</span>
      </div>
      <div style={{ color: "#df040b" }}>
        Time: <span>{timer} sec</span>
      </div>
    </div>
  );
}

function GameMain({ onFlip, gameOver }) {
  return (
    <ul className="gamemain">
      {images.map((img, i) => {
        return (
          <Card
            imgName={img[0]}
            id={img[1]}
            idx={i}
            rotateState={img[2]}
            onFlip={onFlip}
            key={i}
            gameOver={gameOver}
          />
        );
      })}
    </ul>
  );
}

function Card({ imgName, id, rotateState, onFlip, idx, gameOver }) {
  const [ishover, setIshover] = useState(false);

  return (
    <li
      className={`card ${rotateState ? "rotate" : ""}`}
      onClick={() => !rotateState && !gameOver && onFlip(id, idx)}
    >
      <div
        className="card-front"
        onMouseEnter={() => setIshover(true)}
        onMouseLeave={() => setIshover(false)}
      >
        <img src={ishover === true ? glowbulb : bulb} alt="img" />
      </div>
      <div className="card-back">
        <img src={imgName} alt="img" />
      </div>
    </li>
  );
}

export default App;
