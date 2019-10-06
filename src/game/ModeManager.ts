import Phaser from "phaser";

import { isKeyPressed } from "./KeyHelper";

export enum Mode {
  NORMAL = "NORMAL",
  INSERT = "INSERT",
  COMMAND = "COMMAND"
}

class ModeManager {
  public mode: Mode = Mode.NORMAL;

  private insertKey?: Phaser.Input.Keyboard.Key;
  private escapeKey?: Phaser.Input.Keyboard.Key;
  private colonKey?: Phaser.Input.Keyboard.Key;

  public create() {
    this.insertKey = window.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.I
    );
    this.escapeKey = window.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
    this.colonKey = window.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.COLON
    );
  }

  public update() {
    if (isKeyPressed(this.insertKey!) && this.mode === Mode.NORMAL) {
      this.setMode(Mode.INSERT);
    }

    if (isKeyPressed(this.colonKey!) && this.mode === Mode.NORMAL) {
      console.log("command mode");
      this.setMode(Mode.COMMAND);
    }

    if (
      isKeyPressed(this.escapeKey!) &&
      (this.mode === Mode.INSERT || this.mode === Mode.COMMAND)
    ) {
      this.setMode(Mode.NORMAL);
    }
  }

  private setMode = (mode: Mode) => {
    this.mode = mode;
  };
}

export default ModeManager;
