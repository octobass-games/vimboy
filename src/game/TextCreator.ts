import Phaser from "phaser";
import {
  CELL_SIZE,
  GAME_WIDTH,
  PLAY_ZONE_HEIGHT
} from "../constants/constants";

import { PlayScene } from "./PlayScene";
import { FONT, FONT_SIZE } from "../constants/text";

interface TextItem {
  gridIndexY: number;
  body: Phaser.Physics.Arcade.Body;
  object: Phaser.GameObjects.GameObject;
}

class TextCreator {
  private scene: PlayScene;
  private words: TextItem[] = [];

  constructor(scene: PlayScene) {
    this.scene = scene;
  }

  public update = () => {
    if (this.getRandomNumber(100) === 99) {
      this.addEnemyText();
    }
    this.cleanup();
  };

  private cleanup = () => {
    this.words.forEach(({ object, body }, index) => {
      if (body.x < 0 - GAME_WIDTH) {
        object.destroy();
      }
      // TODO: need to clear from list too
    });
  };

  private addEnemyText = () => {
    const numberOfGaps = PLAY_ZONE_HEIGHT / CELL_SIZE;
    const gridIndexY = this.getRandomNumber(numberOfGaps);
    const y = this.getRandomNumber(numberOfGaps) * CELL_SIZE;
    const text = this.getRandomWord()

    this.add(GAME_WIDTH, y, text, gridIndexY, -100)
  }


  public add = (x: number, y: number, word: string, gridIndexY: number, xTween: number) => {
    
    const text = this.scene.add.text(x, y, word, {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    });

    const textObject = this.scene.physics.world.enableBody(text);

    const body = textObject.body as Phaser.Physics.Arcade.Body;

    body.setAllowGravity(false);

    this.scene.tweens.timeline({
      targets: body.velocity,
      loop: -1,
      tweens: [{ x: xTween, y: 0, duration: 2000, ease: "Stepped" }]
    });

    this.words.push({
      gridIndexY,
      body,
      object: textObject
    });
  };

  private getRandomWord = () => "Hello World";

  private getRandomNumber = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));
}

export default TextCreator;
