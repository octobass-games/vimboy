import { PlayScene } from "./PlayScene";
import { CELL_SIZE, PLAY_ZONE_HEIGHT } from "../constants/constants";
import Movement from "./Movement";
import WordAttack from "./WordAttack";

class VimBoy {
  private scene: PlayScene;
  private movement?: Movement;
  private wordAttack: WordAttack; 
  private vimboy?: Phaser.GameObjects.Sprite;

  constructor(scene: PlayScene) {
    this.scene = scene;
    this.wordAttack = new WordAttack(this.scene);
  }

  public preload = () => {
    this.scene.load.image(
      "vimboy",
      process.env.PUBLIC_URL + "/images/vimboy.png"
    );
  };

  public create = () => {
    this.movement = new Movement(this.scene);
    this.wordAttack.create()

    this.vimboy = this.scene.add.sprite(
      CELL_SIZE / 2,
      PLAY_ZONE_HEIGHT - CELL_SIZE / 2,
      "vimboy"
    );
  };

  public update = () => { 
    this.movement!.checkKeys(this.vimboy!);
    this.wordAttack.update(this.vimboy!.x, this.vimboy!.y - CELL_SIZE / 2)
  };
}

export default VimBoy;
