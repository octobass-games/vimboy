import { CELL_SIZE } from "../constants/game";

const preloadImages = () => {
  window.scene.load.spritesheet(
    "vimboy",
    process.env.PUBLIC_URL + "/images/vimboy-spritesheet.png",
    { frameWidth: 50, frameHeight: CELL_SIZE }
  );

  window.scene.load.image(
    "heart",
    process.env.PUBLIC_URL + "/images/heart.png"
  );
};

export default preloadImages;
