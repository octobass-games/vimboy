import Phaser from "phaser";
import "./index.css";
import { GAME_WIDTH, GAME_HEIGHT } from "./constants/constants";
import { PlayScene } from "./game/PlayScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: PlayScene
};

new Phaser.Game(config);
