import { CELL_SIZE } from "../../constants/game";

export enum Images {
  VIMBOY = "vimboy",
  HEART = "heart",
  CLASH = "clash"
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

  window.scene.load.spritesheet(
    Images.CLASH,
    process.env.PUBLIC_URL + "/images/clash.png",
    { frameWidth: CELL_SIZE, frameHeight: CELL_SIZE }
  );
};

export default preloadImages;
