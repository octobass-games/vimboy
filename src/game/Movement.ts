import { CELL_SIZE, BOTTOM_BAR_Y } from "../constants/constants";
import { PlayScene } from "./PlayScene";

class Movement {
  private upKey: Phaser.Input.Keyboard.Key;
  private downKey: Phaser.Input.Keyboard.Key;
  private scene: PlayScene;

  constructor(scene: PlayScene) {
    this.scene = scene;
    this.upKey = this.scene.input.keyboard.addKey("K");
    this.downKey = this.scene.input.keyboard.addKey("J");
  }

  public checkKeys(vimboy: Phaser.GameObjects.Sprite) {
    const isMovingUp = this.scene.input.keyboard.checkDown(this.upKey, 500);
    if (isMovingUp) {
      if (vimboy.y - CELL_SIZE <= 0) {
        return;
      }
      vimboy.setY(vimboy.y - CELL_SIZE);
    }

    const isMovingDown = this.scene.input.keyboard.checkDown(this.downKey, 500);
    if (isMovingDown) {
      if (vimboy.y + CELL_SIZE >= BOTTOM_BAR_Y) {
        return;
      }
      vimboy.setY(vimboy.y + CELL_SIZE);
    }
  }
}

export default Movement;
