import { CELL_SIZE, PLAY_ZONE_HEIGHT } from "../constants/game";
import Movement from "./Movement";
import WordAttack from "./WordAttack";

class VimBoy {
  private movement?: Movement;
  private wordAttack: WordAttack;
  private vimboy?: Phaser.GameObjects.Sprite;

  constructor() {
    this.wordAttack = new WordAttack();
  }

  public preload = () => {
    window.scene.load.image(
      "vimboy",
      process.env.PUBLIC_URL + "/images/vimboy.png"
    );
  };

  public create = () => {
    this.movement = new Movement();
    this.wordAttack.create();

    this.vimboy = window.scene.add.sprite(
      CELL_SIZE / 2,
      PLAY_ZONE_HEIGHT - CELL_SIZE / 2,
      "vimboy"
    );
  };

  public update = () => {
    this.movement!.update(this.vimboy!);
    this.wordAttack.update(this.vimboy!.x, this.vimboy!.y - CELL_SIZE / 2);
  };
}

export default VimBoy;
