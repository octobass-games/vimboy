import {
  GAME_HEIGHT,
  CELL_SIZE,
  GAME_WIDTH,
  BOTTOM_BAR_Y
} from "../constants/game";

import { Colours } from "../constants/colours";
import { FONT, FONT_SIZE } from "../constants/text";
import CommandMode from "./mode/CommandMode";

const padding = 10;

class StatusLine {
  private modeText?: Phaser.GameObjects.Text;
  private commandText?: Phaser.GameObjects.Text;

  public create = () => {
    this.initBackground();
    this.initMode();
    this.initCommandText();
  };

  public update = () => {
    if (this.modeText!.text !== this.modeString()) {
      this.modeText!.setText(this.modeString());
    }

    if (this.mode().name === "command") {
      this.renderCommand();
    } else {
      this.hideCommand();
    }
  };

  private hideCommand = () => {
    this.commandText!.setText("");
  };

  private renderCommand = () => {
    const mode = window.scene.modeManager.mode as CommandMode;
    this.commandText!.setText(":" + mode.getCommand());
  };

  private modeString = (): string => window.scene.modeManager.mode.display;

  private mode = () => window.scene.modeManager.mode;

  private initBackground = () => {
    const rect = new Phaser.Geom.Rectangle(
      0,
      GAME_HEIGHT - CELL_SIZE * 2,
      GAME_WIDTH,
      CELL_SIZE * 2
    );
    window.scene.graphics!.fillStyle(Colours.BLACK);
    window.scene.graphics!.fillRectShape(rect);
  };

  private initMode = () => {
    this.modeText = window.scene.add.text(
      padding,
      GAME_HEIGHT - CELL_SIZE / 2 - padding,
      this.modeString(),
      {
        fontFamily: FONT,
        fontSize: FONT_SIZE / 2
      }
    );
  };

  private initCommandText = () => {
    this.commandText = window.scene.add.text(0, BOTTOM_BAR_Y, "", {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    });
  };
}

export default StatusLine;
