import Phaser from "phaser";

import "./index.css";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export class GameScene extends Phaser.Scene {
  private square?: Phaser.GameObjects.Rectangle;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff);
    this.physics.add.existing(this.square);
  }

  public update() {
    // TODO
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: GameScene
};

var game = new Phaser.Game(config);
