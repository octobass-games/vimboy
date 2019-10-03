import Phaser from "phaser";
import "./index.css";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "./constants/constants";
import { Colours } from "./constants/colours";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export class GameScene extends Phaser.Scene {
  private vimboy?: Phaser.GameObjects.Sprite;
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    this.load.image("vimboy", process.env.PUBLIC_URL + "/images/vimboy.png");
  }

  public create() {
    this.add.grid(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      CELL_SIZE,
      CELL_SIZE,
      Colours.BLACK,
      undefined,
      Colours.GREEN
    );

    this.vimboy = this.add.sprite(
      CELL_SIZE / 2,
      GAME_HEIGHT - CELL_SIZE / 2,
      "vimboy"
    );
  }

  public update() {
    // TODO
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: GameScene
};

new Phaser.Game(config);
