import { Images } from "../loaders/ImageLoader";
import Random from "./Random";
import { Animations } from "../loaders/AnimationLoader";

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
