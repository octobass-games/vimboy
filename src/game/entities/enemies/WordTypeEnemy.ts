import Entity, { EntityType, Enemy } from "../Entity";
import {
  CELL_SIZE,
  GAME_WIDTH,
  PLAY_ZONE_HEIGHT
} from "../../../constants/game";
import Random from "../../utils/Random";
import { StringColours } from "../../../constants/colours";
import { GameObjects } from "phaser";
import { createText } from "../helpers/TextCreator";
import { Images } from "../../loaders/ImageLoader";
import { Animations } from "../../loaders/AnimationLoader";

const createWordTypeEnemy = (): Phaser.GameObjects.GameObject | undefined => {
  const numberOfGaps = PLAY_ZONE_HEIGHT / CELL_SIZE;
  const line = Random.getNumber(numberOfGaps);

  if (window.scene.entityManager.lineHasEnemy(line)) {
    return undefined;
  }

  const y = line * CELL_SIZE;
  const word = Random.getWord();

  const text = createText({
    x: GAME_WIDTH,
    y,
    word,
    xTween: -GAME_WIDTH,
    colour: StringColours.BEIGE
  });

  const entity: Enemy = {
    line,
    type: EntityType.WORD_TYPE_ENEMY,
    onCollision: onCollision(line, text)
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
    if (text.text.length === 1) {
      window.scene.entityManager.destroyEnemy(text);
    } else {
      text.setText(enemyText.substr(1));
      window.scene.scoreBoard.updateScore(1);
    }
  }
  const image = window.scene.add
    .sprite(attackObject.x, attackObject.y + CELL_SIZE / 2, Images.CLASH)
    .setTint(Random.getColour())
    .setAlpha(0.7);

  image.anims.play(Animations.CLASH);

  window.scene.entityManager.destroyNonEnemy(attackObject);
  setTimeout(() => image.destroy(), 200);
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
