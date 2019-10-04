import Phaser from "phaser";

import { PlayScene } from "./PlayScene";
import { GAME_WIDTH, BOTTOM_BAR_Y, CELL_SIZE } from "../constants/constants";
import { FONT, FONT_SIZE } from "../constants/text";

export enum Mode {
  NAVIGATION = " -- NAVIGATION --",
  INSERT = " -- INSERT --"
}

class ModeManager {
  public mode: Mode = Mode.NAVIGATION;

  private modeText?: Phaser.GameObjects.Text;
  private scene: PlayScene;
  private insertKey?: Phaser.Input.Keyboard.Key;

  public constructor(scene: PlayScene) {
    this.scene = scene;
  }

  public create() {
    this.modeText = this.scene.add.text(
      this.getTextXPosition(),
      BOTTOM_BAR_Y + CELL_SIZE / 2,
      this.mode,
      {
        fontFamily: FONT,
        fontSize: FONT_SIZE / 3
      }
    );

    this.insertKey = this.scene.input.keyboard.addKey("I");
  }

  public update() {
    const insertKeyPressed = this.scene.input.keyboard.checkDown(
      this.insertKey!,
      500
    );

    if (insertKeyPressed) {
      this.mode = Mode.INSERT;
      this.modeText!.setText(this.mode).setX(this.getTextXPosition());
    }
  }

  private getTextXPosition = () => GAME_WIDTH - this.mode.length * 8;
}

export default ModeManager;
