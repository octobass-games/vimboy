import {
  GAME_HEIGHT,
  CELL_SIZE,
  GAME_WIDTH,
  BOTTOM_BAR_Y
} from "../constants/game";

import { Colours } from "../constants/colours";
import { FONT, FONT_SIZE } from "../constants/text";
import ModeManager from "./ModeManager";
import { calculateCommand } from "./commandModeUtils";

const padding = 10;

class StatusLine {
  private graphics: Phaser.GameObjects.Graphics;
  private modeText?: Phaser.GameObjects.Text;
  private commandText?: Phaser.GameObjects.Text;
  private modeManager: ModeManager;

  private storedCommand: string = "";

  constructor(graphics: Phaser.GameObjects.Graphics, modeManager: ModeManager) {
    this.graphics = graphics;
    this.modeManager = modeManager;
  }

  public create = () => {
    this.initBackground();
    this.initMode();
    this.initCommandText();
  };

  public update = () => {
    if (this.modeText!.text !== this.modeString()) {
      this.modeText!.setText(this.modeString());
    }

    if (this.mode().name === 'command') {
      this.renderCommand();
    } else {
      this.hideCommand();
    }
  };

  private hideCommand = () => {
    this.commandText!.setText("");
  };

  private renderCommand = () => {
    this.commandText!.setText(":" + this.storedCommand);
  };

  private modeString = (): string => this.modeManager.mode.display;

  private mode = () => this.modeManager.mode;

  private initBackground = () => {
    const rect = new Phaser.Geom.Rectangle(
      0,
      GAME_HEIGHT - CELL_SIZE * 2,
      GAME_WIDTH,
      CELL_SIZE * 2
    );
    this.graphics.fillStyle(Colours.BLACK);
    this.graphics.fillRectShape(rect);
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
