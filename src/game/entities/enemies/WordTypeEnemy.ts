import Entity, { EntityType } from "../Entity";
import {
  CELL_SIZE,
  GAME_WIDTH,
  PLAY_ZONE_HEIGHT
} from "../../../constants/game";
import Random from "../../Random";
import { FONT, FONT_SIZE } from "../../../constants/text";
import { StringColours } from "../../../constants/colours";

const create = (line: number) => {
  const y = line * CELL_SIZE;
  const word = Random.getWord();

  const text = window.scene.add
    .text(GAME_WIDTH, y, word, {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    })
    .setColor(StringColours.BEIGE);

  const textObject = window.scene.physics.world.enableBody(text);

  const body = textObject.body as Phaser.Physics.Arcade.Body;

  body.setAllowGravity(false);

  window.scene.tweens.timeline({
    targets: body.velocity,
    loop: -1,
    tweens: [{ x: -100, y: 0, duration: 2000, ease: "Stepped" }]
  });

  return text;
};

const createWordTypeEnemy = () => {
  const numberOfGaps = PLAY_ZONE_HEIGHT / CELL_SIZE;
  const line = Random.getNumber(numberOfGaps);

  const obj = create(line);

  const entity: Entity = {
    line,
    type: EntityType.WORD_TYPE_ENEMY,
    onCollision: (e, o) => {
      console.log("collision - asd", e);
      switch (e.type) {
        case EntityType.WORD_ATTACK:
          obj.destroy();
          o.destroy();
      }
    }
  };

  obj.setData({ data: entity });
  return obj;
};

export default createWordTypeEnemy;
