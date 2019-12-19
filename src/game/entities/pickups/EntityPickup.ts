import { GAME_WIDTH, CELL_SIZE, GAP_COUNT } from "../../../constants/game";
import { enableBody, setVelocity } from "../helpers/BodyCreator";
import { EntityType, Pickup } from "../Entity";
import { Images, PRESENT_FRAME } from "../../loaders/ImageLoader";
import Random from "../../utils/Random";

const createPickup = (
  xVelocity: number = -CELL_SIZE * 4,
  line: number = Random.getNumber(GAP_COUNT)
) => {
  if (window.scene.entityManager.getNonEnemyOnLine(line)) {
    return undefined;
  }

  const y = line * CELL_SIZE - CELL_SIZE / 2;
  const colour = Random.getColour();

  const image = window.scene.add
    .sprite(GAME_WIDTH + 200, y, Images.VIMBOY)
    .setTint(colour)
    .setFrame(PRESENT_FRAME);

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
