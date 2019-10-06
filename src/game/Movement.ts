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

  public update = (vimboy: Phaser.GameObjects.Sprite) => {
    this.checkKeys(vimboy);
    this.checkKeyCombos(vimboy);
  };

  private checkKeys = (vimboy: Phaser.GameObjects.Sprite) => {
    if (window.scene.modeManager.mode === Mode.NORMAL) {
      if (isKeyPressed(this.up)) {
        this.upALine(vimboy);
      }

      if (isKeyPressed(this.down)) {
        this.downALine(vimboy);
      }

      if (isKeyPressed(this.bottomOfFile) && this.bottomOfFile.shiftKey) {
        this.jumpToLine(this.bottomLine(), vimboy);
      }
    }
  };

  private checkKeyCombos = (vimboy: Phaser.GameObjects.Sprite) => {
    onKeyCombo(this.topOfFile, () =>
      this.canMove() ? this.jumpToLine(1, vimboy) : undefined
    );
  };

  private canMove = (): boolean =>
    window.scene.modeManager.mode === Mode.NORMAL;

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

  public jumpToLine(line: number, vimboy: Phaser.GameObjects.Sprite) {
    const lineNo = this.clamp(line, 1, this.bottomLine());
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
