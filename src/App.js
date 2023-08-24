import { useState } from "react";
import "./App.css";
import apple from "./asset/apple.png";
import spider from "./asset/spider.png";
import bomb from "./asset/bomb.png";
import happy from "./asset/happy.png";
import sad from "./asset/sad.png";
import ironman from "./asset/ironman.png";
import monkey from "./asset/apple.png";
import mouse from "./asset/mouse.png";
import demon from "./asset/demon.png";
import dimond from "./asset/dimond.png";
import glowbulb from "./asset/glow_bulb.png";
import bulb from "./asset/bulb.png";

const images = [
  apple,
  monkey,
  spider,
  mouse,
  apple,
  ironman,
  spider,
  bomb,
  happy,
  sad,
  demon,
  dimond,
  ironman,
  sad,
  monkey,
  bomb,
  demon,
  mouse,
  happy,
  dimond,
];

console.time("e");
const shuffleImg = function () {
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
};
console.timeEnd("e");

shuffleImg();

console.log(images);
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

function Game() {
  return (
    <div className="game">
      <GameInfo />
      <GameMain />
    </div>
  );
}

function GameInfo() {
  // const [timer, setTimer] = useState(60);

  return (
    <div className="gameinfo">
      <div>
        Rotate: <span className="rotate__count">{0}</span>
      </div>
      <div>
        Time: <span className="time">{60} sec</span>
      </div>
    </div>
  );
}

function GameMain() {
  return (
    <div className="gamemain">
      {images.map((img, i) => {
        return <Card imageName={img} key={i} />;
      })}
    </div>
  );
}

function Card({ imageName }) {
  const [flip, setFlip] = useState(false);
  const [ishover, setIshover] = useState(false);

  return (
    <div
      className={`card ${flip ? "rotate" : ""}`}
      onClick={() => {
        setFlip(!flip);
      }}
    >
      <div
        className="card-front"
        onMouseEnter={() => setIshover(true)}
        onMouseLeave={() => setIshover(false)}
      >
        <img src={ishover === true ? glowbulb : bulb} alt="img" />
      </div>
      <div className="card-back">
        <img src={imageName} alt="img" />
      </div>
    </div>
  );
}

export default App;
