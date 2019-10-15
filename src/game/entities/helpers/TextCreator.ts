import { FONT, FONT_SIZE } from "../../../constants/text";
import { StringColours } from "../../../constants/colours";
import { GameObjects } from "phaser";
import { enableBody } from "./BodyCreator";

interface CreateText {
  x: number;
  y: number;
  word: string;
  xTween: number;
  colour: StringColours;
}

export const createText = ({
  x,
  y,
  word,
  xTween,
  colour
}: CreateText): GameObjects.Text => {
  const text = window.scene.add
    .text(x, y, word, {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    })
    .setColor(colour);

  enableBody(text);

  window.scene.tweens.add({
    targets: text,
    x: xTween,
    ease: "Power0",
    loop: 0,
    duration: 10000
  });

  return text;
};