import { CELL_SIZE, BOTTOM_BAR_Y } from "../constants/game";
import { Mode } from "./ModeManager";
import { isKeyPressed } from "./KeyHelper";

class Movement {
  private upKey: Phaser.Input.Keyboard.Key;
  private downKey: Phaser.Input.Keyboard.Key;

  constructor() {
    this.upKey = window.scene.input.keyboard.addKey("K");
    this.downKey = window.scene.input.keyboard.addKey("J");
  }

  public checkKeys(vimboy: Phaser.GameObjects.Sprite) {
    if (window.scene.modeManager.mode === Mode.NORMAL) {
      if (isKeyPressed(this.upKey!)) {
        if (vimboy.y - CELL_SIZE <= 0) {
          return;
        }
        vimboy.setY(vimboy.y - CELL_SIZE);
      }

      if (isKeyPressed(this.downKey!)) {
        if (vimboy.y + CELL_SIZE >= BOTTOM_BAR_Y) {
          return;
        }
        vimboy.setY(vimboy.y + CELL_SIZE);
      }
    }
  }
}

export default Movement;
