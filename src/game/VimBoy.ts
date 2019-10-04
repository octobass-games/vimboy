import { PlayScene } from "./PlayScene";
import { CELL_SIZE, PLAY_ZONE_HEIGHT } from "../constants/constants";
import Movement from "./Movement";

class VimBoy {
  private scene: PlayScene;
  private movement?: Movement;
  private vimboy?: Phaser.GameObjects.Sprite;

  constructor(scene: PlayScene) {
    this.scene = scene;
  }

  public preload = () => {
    this.scene.load.image(
      "vimboy",
      process.env.PUBLIC_URL + "/images/vimboy.png"
    );
  };

  public create = () => {
    this.movement = new Movement(this.scene);

    this.vimboy = this.scene.add.sprite(
      CELL_SIZE / 2,
      PLAY_ZONE_HEIGHT - CELL_SIZE / 2,
      "vimboy"
    );
  };

  public update = () => {
    this.movement!.checkKeys(this.vimboy!);
  };
}

export default VimBoy;
