import Phaser from "phaser";
import { CELL_SIZE, GAME_WIDTH, GAME_HEIGHT } from "./constants/constants";
import { GameScene } from ".";

class TextCreator {
  private scene: Phaser.Scene;
  private words: Phaser.GameObjects.GameObject[] = [];

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  public update = () => {
    if (this.getRandomNumber(100) === 99) {
      this.add();
    }

    // TODO: destroy words on leaving scene view
  };

  private add = () => {
    const numberOfGaps = GAME_HEIGHT / CELL_SIZE;
    const y = this.getRandomNumber(numberOfGaps) * CELL_SIZE;

    const text = this.scene.add.text(GAME_WIDTH, y, "Hello World", {
      fontFamily: '"Consolas"',
      fontSize: CELL_SIZE
    });

    const textObject = this.scene.physics.world.enableBody(text);

    const body = textObject.body as Phaser.Physics.Arcade.Body;

    body.setAllowGravity(false);

    this.scene.tweens.timeline({
      targets: body.velocity,
      loop: -1,
      tweens: [{ x: -100, y: 0, duration: 2000, ease: "Stepped" }]
    });

    this.words.push(textObject);
  };

  private getRandomNumber = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));
}

export default TextCreator;
