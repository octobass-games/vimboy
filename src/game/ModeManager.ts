import Phaser from "phaser";

import { GAME_WIDTH, BOTTOM_BAR_Y, CELL_SIZE } from "../constants/constants";
import { FONT, FONT_SIZE } from "../constants/text";
import { isKeyPressed } from "./KeyHelper";

export enum Mode {
  NORMAL = "-- NORMAL -- ",
  INSERT = "-- INSERT -- "
}

class ModeManager {
  public mode: Mode = Mode.NORMAL;

  private modeText?: Phaser.GameObjects.Text;
  private insertKey?: Phaser.Input.Keyboard.Key;
  private escapeKey?: Phaser.Input.Keyboard.Key;

  public create() {
    this.modeText = window.scene.add.text(
      this.getTextXPosition(),
      BOTTOM_BAR_Y + CELL_SIZE / 2,
      this.mode,
      {
        fontFamily: FONT,
        fontSize: FONT_SIZE / 3
      }
    );

    this.insertKey = window.scene.input.keyboard.addKey("I");
    this.escapeKey = window.scene.input.keyboard.addKey("ESC");
  }

  public update() {
    if (isKeyPressed(this.insertKey!) && this.mode === Mode.NORMAL) {
      this.setMode(Mode.INSERT);
    }

    if (isKeyPressed(this.escapeKey!) && this.mode === Mode.INSERT) {
      this.setMode(Mode.NORMAL);
    }
  }

  private setMode = (mode: Mode) => {
    this.mode = mode;
    this.modeText!.setText(this.mode).setX(this.getTextXPosition());
  };

  private getTextXPosition = () => GAME_WIDTH - this.mode.length * 8;
}

export default ModeManager;
