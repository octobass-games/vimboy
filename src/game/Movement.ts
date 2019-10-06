import { CELL_SIZE, BOTTOM_BAR_Y, PLAY_ZONE_HEIGHT } from "../constants/game";
import { Mode } from "./ModeManager";
import { isKeyPressed, onKeyCombo, COMBO_DEFAULTS } from "./KeyHelper";

class Movement {
  private up: Phaser.Input.Keyboard.Key;
  private down: Phaser.Input.Keyboard.Key;
  private topOfFile: Phaser.Input.Keyboard.KeyCombo;
  private bottomOfFile: Phaser.Input.Keyboard.Key;

  constructor() {
    this.up = window.scene.input.keyboard.addKey("k");
    this.down = window.scene.input.keyboard.addKey("j");
    this.topOfFile = window.scene.input.keyboard.createCombo(
      "gg",
      COMBO_DEFAULTS
    );
    this.bottomOfFile = window.scene.input.keyboard.addKey("G");
  }

  public checkKeys(vimboy: Phaser.GameObjects.Sprite) {
    if (window.scene.modeManager.mode === Mode.NORMAL) {
      if (isKeyPressed(this.up)) {
        this.upALine(vimboy);
      }

      if (isKeyPressed(this.down)) {
        this.downALine(vimboy);
      }

      if (isKeyPressed(this.bottomOfFile) && this.bottomOfFile.shiftKey) {
        this.jumpToLine(PLAY_ZONE_HEIGHT / CELL_SIZE, vimboy);
      }

      onKeyCombo(this.topOfFile, () => this.jumpToLine(1, vimboy));
    }
  }

  private downALine(vimboy: Phaser.GameObjects.Sprite) {
    if (vimboy.y + CELL_SIZE >= BOTTOM_BAR_Y) {
      return;
    }
    vimboy.setY(vimboy.y + CELL_SIZE);
  }

  private upALine(vimboy: Phaser.GameObjects.Sprite) {
    if (vimboy.y - CELL_SIZE <= 0) {
      return;
    }
    vimboy.setY(vimboy.y - CELL_SIZE);
  }

  private jumpToLine(line: number, vimboy: Phaser.GameObjects.Sprite) {
    vimboy.setY(line * CELL_SIZE - CELL_SIZE / 2);
  }
}

export default Movement;
