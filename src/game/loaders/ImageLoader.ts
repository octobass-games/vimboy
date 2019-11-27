import { CELL_SIZE } from "../../constants/game";

export enum Images {
  VIMBOY = "vimboy",
  HEART = "heart",
  CLASH = "clash",
  PRESENT = "present",
  POWER_UP_FOUND = "POWER_UP_FOUND",
  POWER_UP_CONTAINER = "POWER_UP_CONTAINER",
  GHOST = "GHOST",
  TROPHY = "TROPHY"
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

  window.scene.load.image(
    Images.PRESENT,
    process.env.PUBLIC_URL + "/images/present.png"
  );

  window.scene.load.image(
    Images.POWER_UP_FOUND,
    process.env.PUBLIC_URL + "/images/power-up-holder.png"
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
