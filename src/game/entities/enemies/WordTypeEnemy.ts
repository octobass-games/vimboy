import Entity, { EntityType, Enemy } from "../Entity";
import {
  CELL_SIZE,
  GAME_WIDTH,
  PLAY_ZONE_HEIGHT
} from "../../../constants/game";
import Random from "../../utils/Random";
import { GameObjects, Game } from "phaser";
import { createText } from "../helpers/TextCreator";
import { playClashAnimation } from "../../utils/animationPlayer";
import { Sound } from "../../loaders/SoundLoader";

const numberOfGaps = PLAY_ZONE_HEIGHT / CELL_SIZE;

const createWordTypeEnemy = (
  words: string[] = Random.getWords(),
  line: number = Random.getNumber(numberOfGaps),
  velocity: number = -CELL_SIZE * 3,
  x: number = GAME_WIDTH
): Phaser.GameObjects.GameObject | undefined => {
  if (window.scene.entityManager.lineHasEnemy(line)) {
    return undefined;
  }
  const y = line * CELL_SIZE;

  const text = createText({
    x,
    y,
    word: words.join(""),
    xVelocity: velocity,
    colour: Random.getStringColour()
  });

  const entity: Enemy = {
    line,
    type: EntityType.WORD_TYPE_ENEMY,
    onCollision: (entity, gameObject) => onCollision(text, entity, gameObject),
    words,
    normalVelocity: velocity
  };

  text.setData({ data: entity });
  return text;
};

export default createWordTypeEnemy;

const onCollision = (
  text: GameObjects.Text,
  entity: Entity,
  gameObject: GameObjects.GameObject
) => {
  switch (entity.type) {
    case EntityType.WORD_ATTACK:
      const attackObject = gameObject as GameObjects.Text;
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
  }
};
