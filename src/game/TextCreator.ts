import Phaser from "phaser";
import { CELL_SIZE, GAME_WIDTH, PLAY_ZONE_HEIGHT } from "../constants/game";

import { FONT, FONT_SIZE } from "../constants/text";

interface TextItem {
  gridIndexY: number;
  body: Phaser.Physics.Arcade.Body;
  object: Phaser.GameObjects.GameObject;
}

class TextCreator {
  private words: TextItem[] = [];
  private enemies?: Phaser.GameObjects.Group;
  private attacks?: Phaser.GameObjects.Group;

  public create = () => {
    this.enemies = window.scene.add.group();
    this.attacks = window.scene.add.group();

    window.scene.physics.add.overlap(
      this.attacks,
      this.enemies,
      this.onCollision
    );
  };

  private onCollision = (
    attack: Phaser.GameObjects.GameObject,
    enemy: Phaser.GameObjects.GameObject
  ) => {
    const attackTextObj = attack as Phaser.GameObjects.Text;
    const enemyTextObj = enemy as Phaser.GameObjects.Text;
    const attackBody = attack.body as Phaser.Physics.Arcade.Body;
    const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;

    if (attackBody.y !== enemyBody.y) {
      return;
    }

    const enemyText = enemyTextObj.text.toLowerCase().trim();
    const enemyTextFirstChar = enemyText.charAt(0);

    if (attackTextObj.text.toLowerCase() === enemyTextFirstChar) {
      if (enemyTextObj.text.length === 1) {
        enemy.destroy();
      } else {
        enemyTextObj.setText(enemyText.substr(1));
      }
    }
    attackTextObj.destroy();
  };

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
    const text = this.getRandomWord();

    this.add(GAME_WIDTH, y, text, gridIndexY, -100, true);
  };

  public add = (
    x: number,
    y: number,
    word: string,
    gridIndexY: number,
    xTween: number,
    enemy: boolean
  ) => {
    const text = window.scene.add.text(x, y, word, {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    });

    const textObject = window.scene.physics.world.enableBody(text);

    const body = textObject.body as Phaser.Physics.Arcade.Body;

    body.setAllowGravity(false);

    window.scene.tweens.timeline({
      targets: body.velocity,
      loop: -1,
      tweens: [{ x: xTween, y: 0, duration: 2000, ease: "Stepped" }]
    });

    this.words.push({
      gridIndexY,
      body,
      object: textObject
    });

    if (enemy) {
      this.enemies!.add(textObject);
    } else {
      this.attacks!.add(textObject);
    }
  };

  private getRandomWord = () => "Hello World";

  private getRandomNumber = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));
}

export default TextCreator;
