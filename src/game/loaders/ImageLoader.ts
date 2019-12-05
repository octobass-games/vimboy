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
    process.env.PUBLIC_URL + "/images/spritesheet.png",
    { frameWidth: 50, frameHeight: CELL_SIZE }
  );

  window.scene.load.image(
    Images.POWER_UP_CONTAINER,
    process.env.PUBLIC_URL + "/images/power-up-wrapper.png"
  );

  window.scene.load.image(
    Images.GHOST,
    process.env.PUBLIC_URL + "/images/ghost.png"
  );
  window.scene.load.image(
    Images.TROPHY,
    process.env.PUBLIC_URL + "/images/trophy.png"
  );
};

export default preloadImages;
