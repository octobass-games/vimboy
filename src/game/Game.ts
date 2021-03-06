import { GAME_WIDTH, GAME_HEIGHT } from "../constants/game";

import { Menu } from "./scene/Menu";
import { PlayScene } from "./scene/PlayScene";
import { End } from "./scene/End";

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
  scene: Menu
};

var game: Phaser.Game;

export const initGame = () => {
  game = new Phaser.Game(config);
  game.scene.add("Game", PlayScene);
  game.scene.add("End", End);
};
