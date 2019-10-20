import {
  GAME_WIDTH,
  CELL_SIZE,
  PLAY_ZONE_HEIGHT
} from "../../../constants/game";
import { enableBody } from "../helpers/BodyCreator";
import { EntityType, Pickup } from "../Entity";
import { Images } from "../../loaders/ImageLoader";
import Random from "../../utils/Random";

const createPickup = () => {
  const numberOfGaps = PLAY_ZONE_HEIGHT / CELL_SIZE;
  const line = Random.getNumber(numberOfGaps);

  if (window.scene.entityManager.getNonEnemyOnLine(line)) {
    return undefined;
  }

  const y = line * CELL_SIZE - CELL_SIZE / 2;
  const colour = Random.getColour();

  const image = window.scene.add
    .sprite(GAME_WIDTH + 200, y, Images.PRESENT)
    .setTint(colour);

  enableBody(image);

  window.scene.tweens.add({
    targets: image,
    x: -100,
    ease: "Power0",
    loop: 0,
    duration: 10000
  });

  const entity: Pickup = {
    line,
    type: EntityType.PICKUP,
    colour,
    normalVelocity: CELL_SIZE
  };

  image.setData({ data: entity });

  return image;
};

export default createPickup;
