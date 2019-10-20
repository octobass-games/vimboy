import {
  GAME_WIDTH,
  CELL_SIZE,
  PLAY_ZONE_HEIGHT
} from "../../../constants/game";
import { enableBody, setVelocity } from "../helpers/BodyCreator";
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
  const xVelocity = -CELL_SIZE * 4;

  const image = window.scene.add
    .sprite(GAME_WIDTH + 200, y, Images.PRESENT)
    .setTint(colour);

  const body = enableBody(image);
  setVelocity(body, xVelocity);

  const entity: Pickup = {
    line,
    type: EntityType.PICKUP,
    colour,
    normalVelocity: xVelocity
  };

  image.setData({ data: entity });

  return image;
};

export default createPickup;
