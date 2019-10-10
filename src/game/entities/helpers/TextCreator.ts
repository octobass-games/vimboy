import { FONT, FONT_SIZE } from "../../../constants/text";
import { StringColours } from "../../../constants/colours";
import { GameObjects } from "phaser";

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

  const textObject = window.scene.physics.world.enableBody(text);

  const body = textObject.body as Phaser.Physics.Arcade.Body;

  body.setAllowGravity(false);

  window.scene.tweens.timeline({
    targets: body.velocity,
    loop: -1,
    tweens: [{ x: xTween, y: 0, duration: 2000, ease: "Stepped" }]
  });

  return text;
};
