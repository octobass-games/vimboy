import {
  GAME_WIDTH,
  CELL_SIZE,
  PLAY_ZONE_HEIGHT
} from "../../../constants/game";
import { enableBody } from "../helpers/BodyCreator";
import Entity, { EntityType } from "../Entity";
import { Images } from "../../loaders/ImageLoader";
import { Colours } from "../../../constants/colours";
import Random from "../../utils/Random";

const createDeleteWordPickup = () => {
  const numberOfGaps = PLAY_ZONE_HEIGHT / CELL_SIZE;
  const line = Random.getNumber(numberOfGaps);

  if (window.scene.entityManager.getNonEnemyOnLine(line)) {
    return undefined;
  }

  const y = line * CELL_SIZE - CELL_SIZE / 2;

  const image = window.scene.add
    .sprite(GAME_WIDTH + 200, y, Images.PRESENT)
    .setTint(Colours.PINK);

  enableBody(image);

  window.scene.tweens.add({
    targets: image,
    x: -100,
    ease: "Power0",
    loop: 0,
    duration: 10000
  });

  const entity: Entity = {
    line,
    type: EntityType.DELETE_WORD_PICKUP
  };

  image.setData({ data: entity });

  return image;
};

export default createDeleteWordPickup;
