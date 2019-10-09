import Entity, { EntityType } from "../Entity";
import { CELL_SIZE, PLAY_ZONE_HEIGHT } from "../../../constants/game";
import { FONT, FONT_SIZE } from "../../../constants/text";
import { StringColours } from "../../../constants/colours";

const create = (line: number, letter: string) => {
  const y = line * CELL_SIZE;

  const text = window.scene.add
    .text(0, window.scene.vimboy.vimboy!.y - CELL_SIZE / 2, letter, {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    })
    .setColor(StringColours.BLUE);

  const textObject = window.scene.physics.world.enableBody(text);

  const body = textObject.body as Phaser.Physics.Arcade.Body;

  body.setAllowGravity(false);

  window.scene.tweens.timeline({
    targets: body.velocity,
    loop: -1,
    tweens: [{ x: 100, y: 0, duration: 2000, ease: "Stepped" }]
  });

  return text;
};

const createWordAttack = (letter: string) => {
  const line =
    PLAY_ZONE_HEIGHT / (window.scene.vimboy.vimboy!.y - CELL_SIZE / 2);
  const obj = create(line, letter);

  const entity: Entity = {
    line,
    type: EntityType.WORD_ATTACK,
    onCollision: (entity: Entity) => {
      console.log("collision - word", entity);
    }
  };

  obj.setData({ data: entity });

  return obj;
};

export default createWordAttack;
