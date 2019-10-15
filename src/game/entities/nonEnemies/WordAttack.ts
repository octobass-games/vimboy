import Entity, { EntityType } from "../Entity";
import { CELL_SIZE, GAME_WIDTH, GAME_START_X } from "../../../constants/game";
import { createText } from "../helpers/TextCreator";
import Random from "../../utils/Random";

const createWordAttack = (letter: string) => {
  const y = window.scene.vimboy.vimboy!.y - CELL_SIZE / 2;
  const line = y / CELL_SIZE;

  const text = createText({
    x: GAME_START_X + CELL_SIZE * 1.5,
    y,
    word: letter,
    xTween: GAME_WIDTH,
    colour: Random.getStringColour()
  });

  const entity: Entity = {
    line,
    type: EntityType.WORD_ATTACK
  };

  text.setData({ data: entity });

  return text;
};

export default createWordAttack;
