import { CELL_SIZE, PLAY_ZONE_HEIGHT } from "../constants/game";
import Movement from "./Movement";
import { Images } from "./loaders/ImageLoader";
import { Animations } from "./loaders/AnimationLoader";

class VimBoy {
  public movement?: Movement;
  public vimboy?: Phaser.GameObjects.Sprite;

  public create = () => {
    this.movement = new Movement();

    this.vimboy = window.scene.add.sprite(
      50 / 2,
      PLAY_ZONE_HEIGHT - CELL_SIZE / 2,
      Images.VIMBOY
    );
  };

  public update = () => {
    this.movement!.update(this.vimboy!);

    if (!this.vimboy!.anims.isPlaying) {
      this.vimboy!.anims.play(Animations.VIMBOY_BOB, true);
    }
  };

  public playWordAttack = () =>
    this.vimboy!.anims.play(Animations.VIMBOY_WORD_ATTACK, true);

  public playUp = () => this.vimboy!.anims.play(Animations.VIMBOY_UP, true);
  public playDown = () => this.vimboy!.anims.play(Animations.VIMBOY_DOWN, true);
  public playPop = () => this.vimboy!.anims.play(Animations.VIMBOY_POP, true);

  public jumpToLine = (lineNumber: number) =>
    this.movement!.jumpToLine(lineNumber, this.vimboy!);

  public jumpBackNLines = (n: number) =>
    this.movement!.jumpBackNLines(n, this.vimboy!);

  public currentLine = () => this.movement!.currentLine(this.vimboy!);
}

export default VimBoy;
