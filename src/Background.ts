import Phaser from "phaser";

import { Colours } from "./constants/colours";
import { GAME_WIDTH, CELL_SIZE, GAME_HEIGHT } from "./constants/constants";

class Background {
  private graphics: Phaser.GameObjects.Graphics;

  constructor(graphics: Phaser.GameObjects.Graphics) {
    this.graphics = graphics;
  }

  public drawBackground() {
    for (let step = 1; step <= GAME_HEIGHT / CELL_SIZE; step++) {
      const rect = new Phaser.Geom.Rectangle(
        0,
        step * CELL_SIZE,
        GAME_WIDTH,
        CELL_SIZE
      );
      this.graphics.fillStyle(
        step % 2 === 0 ? Colours.DARKER_GREEN : Colours.DARK_GREEN
      );
      this.graphics.fillRectShape(rect);
    }
  }
}

export default Background;
