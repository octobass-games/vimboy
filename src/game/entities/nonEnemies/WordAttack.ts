import Entity, { EntityType } from "../Entity";
import { CELL_SIZE, GAME_WIDTH } from "../../../constants/game";
import { StringColours } from "../../../constants/colours";
import { createText } from "../helpers/TextCreator";

const createWordAttack = (letter: string) => {
  const y = window.scene.vimboy.vimboy!.y - CELL_SIZE / 2;
  const line = y / CELL_SIZE;

  const text = createText({
    x: 0,
    y,
    word: letter,
    xTween: GAME_WIDTH,
    colour: StringColours.BLUE
  });

  const entity: Entity = {
    line,
    type: EntityType.WORD_ATTACK
  };

  text.setData({ data: entity });

  return text;
};

export default createWordAttack;
