import {
  GAME_HEIGHT,
  CELL_SIZE,
  GAME_WIDTH,
  BOTTOM_BAR_Y
} from "../constants/game";

import { Colours } from "../constants/colours";
import { FONT, FONT_SIZE } from "../constants/text";
import { Mode } from "./ModeManager";

const modeNames = {
  [Mode.NORMAL]: "-- NORMAL --",
  [Mode.COMMAND]: "-- NORMAL --",
  [Mode.INSERT]: "-- INSERT --"
};

class StatusLine {
  private graphics: Phaser.GameObjects.Graphics;
  private modeText?: Phaser.GameObjects.Text;
  private commandText?: Phaser.GameObjects.Text;

  private storedCommand: string = "";

  constructor(graphics: Phaser.GameObjects.Graphics) {
    this.graphics = graphics;
  }

  public create = () => {
    const rect = new Phaser.Geom.Rectangle(
      0,
      GAME_HEIGHT - CELL_SIZE,
      GAME_WIDTH,
      CELL_SIZE
    );
    this.graphics.fillStyle(Colours.BLACK);
    this.graphics.fillRectShape(rect);

    this.modeText = window.scene.add.text(
      this.getTextXPosition(),
      BOTTOM_BAR_Y + CELL_SIZE / 2,
      this.modeString(),
      {
        fontFamily: FONT,
        fontSize: FONT_SIZE / 3
      }
    );

    this.commandText = window.scene.add.text(0, BOTTOM_BAR_Y, "asd", {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    });
  };

  public update = () => {
    if (this.modeText!.text !== this.modeString()) {
      this.modeText!.setText(this.modeString()).setX(this.getTextXPosition());
    }

    if (this.mode() === Mode.COMMAND) {
      this.renderCommand();
    }
  };

  private renderCommand = () => {
    this.modeText!.setText(":" + this.storedCommand);
  };

  private modeString = (): string => modeNames[this.mode()];

  private mode = () => window.scene.modeManager.mode;

  private getTextXPosition = () => GAME_WIDTH - this.modeString().length * 8;
}

export default StatusLine;
