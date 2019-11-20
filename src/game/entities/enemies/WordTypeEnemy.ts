import Entity, { EntityType, Enemy } from "../Entity";
import {
  CELL_SIZE,
  GAME_WIDTH,
  PLAY_ZONE_HEIGHT
} from "../../../constants/game";
import Random from "../../utils/Random";
import { GameObjects } from "phaser";
import { createText } from "../helpers/TextCreator";
import { playClashAnimation } from "../../utils/animationPlayer";
import { Sound } from "../../loaders/SoundLoader";

const createWordTypeEnemy = (): Phaser.GameObjects.GameObject | undefined => {
  const numberOfGaps = PLAY_ZONE_HEIGHT / CELL_SIZE;
  const line = Random.getNumber(numberOfGaps);

  if (window.scene.entityManager.lineHasEnemy(line)) {
    return undefined;
  }

  const y = line * CELL_SIZE;
  const words = Random.getWords();

  const velocity = -CELL_SIZE * 3;

  const text = createText({
    x: GAME_WIDTH,
    y,
    word: words.join(""),
    xVelocity: velocity,
    colour: Random.getStringColour()
  });

  const entity: Enemy = {
    line,
    type: EntityType.WORD_TYPE_ENEMY,
    onCollision: onCollision(line, text),
    words,
    normalVelocity: velocity
  };

  text.setData({ data: entity });
  return text;
};

export default createWordTypeEnemy;

const onWordAttackCollision = (
  text: GameObjects.Text,
  attackObject: GameObjects.Text
) => {
  const enemyText = text.text.toLowerCase().trim();
  const enemyTextFirstChar = enemyText.charAt(0);
  if (attackObject.text.toLowerCase() === enemyTextFirstChar) {
    window.scene.sound.play(Sound.BOOP);
    if (text.text.length === 1) {
      window.scene.entityManager.destroyEnemy(text);
    } else {
      text.setText(enemyText.substr(1));
      window.scene.scoreBoard.updateScore(1);
    }
  }
  playClashAnimation(attackObject.x, attackObject.y + CELL_SIZE / 2);

  window.scene.entityManager.destroyNonEnemy(attackObject);
};

const onCollision = (line: number, text: GameObjects.Text) => (
  entity: Entity,
  gameObject: GameObjects.GameObject
) => {
  if (line !== entity.line) {
    return;
  }
  switch (entity.type) {
    case EntityType.WORD_ATTACK:
      onWordAttackCollision(text, gameObject as GameObjects.Text);
  }
};
