import Phaser from "phaser";

import { Colours, StringColours } from "../constants/colours";
import {
  GAME_WIDTH,
  CELL_SIZE,
  GAME_START_X,
  PLAY_ZONE_HEIGHT
} from "../constants/game";
import { FONT, FONT_SIZE } from "../constants/text";

class Background {
  private graphics: Phaser.GameObjects.Graphics;

  constructor(graphics: Phaser.GameObjects.Graphics) {
    this.graphics = graphics;
  }

  public drawBackground() {
    // Left bar
    const rect = window.scene.add.rectangle(
      GAME_START_X / 2,
      PLAY_ZONE_HEIGHT / 2,
      GAME_START_X,
      PLAY_ZONE_HEIGHT
    );
    rect.setFillStyle(Colours.BLACK);
    rect.setDepth(2);

    for (let step = 0; step < PLAY_ZONE_HEIGHT / CELL_SIZE; step++) {
      const y = step * CELL_SIZE;
      // draw background lines
      const rect = new Phaser.Geom.Rectangle(
        GAME_START_X,
        y,
        GAME_WIDTH,
        CELL_SIZE
      );
      this.graphics.fillStyle(
        step % 2 === 0 ? Colours.DARKER_GREEN : Colours.DARK_GREEN
      );
      this.graphics.fillRectShape(rect);

      // draw line numbers
      const text = window.scene.add.text(0, y, (step + 1).toString(), {
        fontFamily: FONT,
        fontSize: FONT_SIZE,
        align: "right",
        fixedWidth: GAME_START_X - 5,
        color: StringColours.WHITE
      });
      text.setAlpha(0.5);
      text.setDepth(3);
    }
  }
}

export default Background;
