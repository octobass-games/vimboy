import { CELL_SIZE } from "../constants/constants";

class Movement {
  private vimboy: Phaser.GameObjects.Sprite;
  private upKey: Phaser.Input.Keyboard.Key;
  private downKey: Phaser.Input.Keyboard.Key;
  private input: Phaser.Input.InputPlugin;

  constructor(
    vimboy: Phaser.GameObjects.Sprite,
    input: Phaser.Input.InputPlugin
  ) {
    this.vimboy = vimboy;
    this.input = input;
    this.upKey = this.input.keyboard.addKey("K");
    this.downKey = this.input.keyboard.addKey("J");
  }

  public checkKeys() {
    const isMovingUp = this.input.keyboard.checkDown(this.upKey, 500);
    if (isMovingUp) {
      this.vimboy!.setY(this.vimboy!.y - CELL_SIZE);
    }

    const isMovingDown = this.input.keyboard.checkDown(this.downKey!, 500);
    if (isMovingDown) {
      this.vimboy!.setY(this.vimboy!.y + CELL_SIZE);
    }
  }
}

export default Movement;
