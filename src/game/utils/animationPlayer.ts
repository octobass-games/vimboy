import { Images } from "../loaders/ImageLoader";
import Random from "./Random";
import { Animations } from "../loaders/AnimationLoader";
import { StringColours } from "../../constants/colours";
import { FONT } from "../../constants/text";
import { CELL_SIZE } from "../../constants/game";

export const playClashAnimation = (x: number, y: number) => {
  const image = window.scene.add
    .sprite(x, y, Images.CLASH)
    .setTint(Random.getColour())
    .setAlpha(0.7);

  image.anims.play(Animations.CLASH);

  window.scene.time.addEvent({
    delay: 200,
    callback: () => {
      image.destroy();
    }
  });
};

export const playTextFlash = (x: number, y: number, text: string) => {
  const object = window.scene.add.text(x, y, text, {
    fontFamily: FONT,
    fontSize: CELL_SIZE,
    align: "center",
    color: StringColours.WHITE
  });

  window.scene.time.addEvent({
    delay: 500,
    callback: () => {
      object.destroy();
    }
  });
};
