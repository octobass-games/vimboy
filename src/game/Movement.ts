import { CELL_SIZE, BOTTOM_BAR_Y, PLAY_ZONE_HEIGHT } from "../constants/game";

class Movement {
  public update = (vimboy: Phaser.GameObjects.Sprite) => {};

  public downALine(vimboy: Phaser.GameObjects.Sprite) {
    if (vimboy.y + CELL_SIZE >= BOTTOM_BAR_Y) {
      return;
    }
    window.scene.vimboy.playDown();

    vimboy.setY(vimboy.y + CELL_SIZE);
  }

  public upALine(vimboy: Phaser.GameObjects.Sprite) {
    if (vimboy.y - CELL_SIZE <= 0) {
      return;
    }
    window.scene.vimboy.playUp();
    vimboy.setY(vimboy.y - CELL_SIZE);
  }

  public jumpToLine(line: number, vimboy: Phaser.GameObjects.Sprite) {
    const lineNo = this.clamp(line, 1, this.bottomLine());
    window.scene.vimboy.playPop();
    vimboy.setY(lineNo * CELL_SIZE - CELL_SIZE / 2);
  }

  public jumpBackNLines(n: number, vimboy: Phaser.GameObjects.Sprite) {
    const line = this.currentLine(vimboy) - n;
    this.jumpToLine(line, vimboy);
  }

  private currentLine = (vimboy: Phaser.GameObjects.Sprite): number =>
    (vimboy.y + CELL_SIZE / 2) / CELL_SIZE;

  private bottomLine = (): number => PLAY_ZONE_HEIGHT / CELL_SIZE;

  private clamp = (num: number, min: number, max: number) =>
    num <= min ? min : num >= max ? max : num;
}

export default Movement;
