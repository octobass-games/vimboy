import { CELL_SIZE } from "../constants/game";

export enum Images {
  VIMBOY = "vimboy",
  HEART = "heart"
}

const preloadImages = () => {
  window.scene.load.spritesheet(
    Images.VIMBOY,
    process.env.PUBLIC_URL + "/images/vimboy-spritesheet.png",
    { frameWidth: 50, frameHeight: CELL_SIZE }
  );

  window.scene.load.image(
    Images.HEART,
    process.env.PUBLIC_URL + "/images/heart.png"
  );
};

export default preloadImages;
