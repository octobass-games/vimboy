import Phaser from "phaser";
import "./index.css";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "./constants/constants";
import Movement from "./Movement";
import Background from "./Background";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export class GameScene extends Phaser.Scene {
  private vimboy?: Phaser.GameObjects.Sprite;
  private movement?: Movement;

  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    this.load.image("vimboy", process.env.PUBLIC_URL + "/images/vimboy.png");
  }

  public create() {
    const graphics = this.add.graphics({ x: 0, y: 0 });
    new Background(graphics).drawBackground();
    this.add.text(0, 0, "Hello World", {
      fontFamily: '"Consolas"',
      fontSize: CELL_SIZE
    });

    this.vimboy = this.add.sprite(
      CELL_SIZE / 2,
      GAME_HEIGHT - CELL_SIZE / 2,
      "vimboy"
    );

    this.movement = new Movement(this.vimboy, this.input);
  }

  public update() {
    this.movement!.checkKeys();
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
