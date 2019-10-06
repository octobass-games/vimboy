import Phaser from "phaser";
import { CELL_SIZE, GAME_WIDTH, PLAY_ZONE_HEIGHT } from "../constants/game";

import { FONT, FONT_SIZE } from "../constants/text";
import Random from "./Random";

export enum TextTypes {
  ENEMY = "ENEMY",
  ATTACK = "ATTACK"
}

interface TextItem {
  gridIndexY: number;
  type: TextTypes;
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
    var newList: TextItem[] = [];
    this.words.forEach(item => {
      const { object, body } = item;
      if (body.x < 0 - GAME_WIDTH || body.x > GAME_WIDTH + 200) {
        object.destroy();
      } else {
        newList.push(item);
      }
    });

    this.words = newList;
  };

  private addEnemyText = () => {
    const numberOfGaps = PLAY_ZONE_HEIGHT / CELL_SIZE;
    const gridIndexY = Random.getNumber(numberOfGaps);

    const enemyInRow = this.words.find(
      t => t.type === TextTypes.ENEMY && t.gridIndexY === gridIndexY
    );
    if (enemyInRow) {
      // Don't add enemy when one already exists
      return;
    }

    const y = gridIndexY * CELL_SIZE;
    const text = Random.getWord();

    this.add(GAME_WIDTH, y, text, gridIndexY, -100, TextTypes.ENEMY);
  };

  public add = (
    x: number,
    y: number,
    word: string,
    gridIndexY: number,
    xTween: number,
    type: TextTypes
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
      type,
      object: textObject
    });

    switch (type) {
      case TextTypes.ATTACK:
        this.attacks!.add(textObject);
        break;
      case TextTypes.ENEMY:
        this.enemies!.add(textObject);
        break;
    }
  };
}

export default TextCreator;
