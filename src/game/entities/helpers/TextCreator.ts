import { FONT, FONT_SIZE } from "../../../constants/text";
import { StringColours } from "../../../constants/colours";
import { GameObjects } from "phaser";
import { enableBody, setVelocity } from "./BodyCreator";

interface CreateText {
  x: number;
  y: number;
  word: string;
  xVelocity: number;
  colour: StringColours;
}

export const createText = ({
  x,
  y,
  word,
  xVelocity,
  colour
}: CreateText): GameObjects.Text => {
  const text = window.scene.add
    .text(x, y, word, {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    })
    .setColor(colour);

  const body = enableBody(text);
  setVelocity(body, xVelocity);

  return text;
};
