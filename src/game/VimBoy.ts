import { CELL_SIZE, PLAY_ZONE_HEIGHT } from "../constants/game";
import Movement from "./Movement";
import WordAttack from "./WordAttack";

class VimBoy {
  public movement?: Movement;
  private wordAttack: WordAttack;
  public vimboy?: Phaser.GameObjects.Sprite;

  constructor() {
    this.wordAttack = new WordAttack();
  }

  public create = () => {
    this.movement = new Movement();
    this.wordAttack.create();

    this.vimboy = window.scene.add.sprite(
      50 / 2,
      PLAY_ZONE_HEIGHT - CELL_SIZE / 2,
      "vimboy"
    );

    window.scene.anims.create({
      key: "vimboy-bob",
      frames: window.scene.anims.generateFrameNumbers("vimboy", {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    });

    window.scene.anims.create({
      key: "vimboy-word-attack",
      frames: window.scene.anims.generateFrameNumbers("vimboy", {
        frames: [5]
      }),
      frameRate: 10,
      repeat: 0
    });

    window.scene.anims.create({
      key: "vimboy-up",
      frames: window.scene.anims.generateFrameNumbers("vimboy", {
        frames: [1, 2, 3]
      }),
      frameRate: 10,
      repeat: 0
    });

    window.scene.anims.create({
      key: "vimboy-down",
      frames: window.scene.anims.generateFrameNumbers("vimboy", {
        frames: [6, 7, 8]
      }),
      frameRate: 10,
      repeat: 0
    });

    window.scene.anims.create({
      key: "vimboy-pop",
      frames: window.scene.anims.generateFrameNumbers("vimboy", {
        frames: [9]
      }),
      frameRate: 10,
      repeat: 0
    });
  };

  public update = () => {
    this.movement!.update(this.vimboy!);
    this.wordAttack.update(this.vimboy!.x, this.vimboy!.y - CELL_SIZE / 2);

    if (!this.vimboy!.anims.isPlaying) {
      this.vimboy!.anims.play("vimboy-bob", true);
    }
  };

  public playWordAttack = () =>
    this.vimboy!.anims.play("vimboy-word-attack", false);

  public playUp = () => this.vimboy!.anims.play("vimboy-up", true);
  public playDown = () => this.vimboy!.anims.play("vimboy-down", true);
  public playPop = () => this.vimboy!.anims.play("vimboy-pop", true);

  public jumpToLine = (lineNumber: number) =>
    this.movement!.jumpToLine(lineNumber, this.vimboy!);

  public jumpBackNLines = (n: number) =>
    this.movement!.jumpBackNLines(n, this.vimboy!);
}

export default VimBoy;
