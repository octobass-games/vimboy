import { CELL_SIZE } from "../../constants/game";

export enum Images {
  VIMBOY = "vimboy",
  POWER_UP_CONTAINER = "POWER_UP_CONTAINER",
  GHOST = "GHOST",
  TROPHY = "TROPHY"
}

export const CLASH_START_FRAME = 10;
export const CLASH_FRAME_COUNT = 3;
export const HEART_FRAME = 15;
export const PRESENT_FRAME = 13;
export const POWER_UP_FOUND_FRAME = 14;

const preloadImages = () => {
  window.scene.load.spritesheet(
    Images.VIMBOY,
    "https://i.imgur.com/ND67D6J.png",
    { frameWidth: 50, frameHeight: CELL_SIZE }
  );

  window.scene.load.image(
    Images.POWER_UP_CONTAINER,
    "https://i.imgur.com/terj3t4.png"
  );

  window.scene.load.image(Images.GHOST, "https://i.imgur.com/4gnVJiV.png");
  window.scene.load.image(Images.TROPHY, "https://i.imgur.com/O5dS6aL.png");
};

export default preloadImages;
