import { GAME_WIDTH, CELL_SIZE, GAME_HEIGHT } from "../constants/game";
import { Colours } from "../constants/colours";
import { Images } from "./loaders/ImageLoader";
import { Sound } from "./loaders/SoundLoader";

const colours = [
  Colours.RED,
  Colours.YELLOW,
  Colours.BLUE,
  Colours.GREEN,
  Colours.PINK
];

class Health {
  private lifes: number = 5;
  private images: Phaser.GameObjects.Image[] = [];

  public create() {
    this.renderImages();
  }

  public injure = () => {
    window.scene.sound.play(Sound.BAD);

    this.lifes--;
    if (this.lifes > 0) {
      this.renderImages();
    }

    if (this.lifes === 0) {
      window.scene.scene.start("End");
    }
  };

  private renderImages = () => {
    this.images.forEach(i => i.destroy());
    [...Array(this.lifes)].forEach((life, index) => {
      this.images.push(
        window.scene.add
          .image(
            this.getTextXPosition() - index * 30,
            GAME_HEIGHT - CELL_SIZE / 2,
            Images.HEART
          )
          .setTint(colours[index])
      );
    });
  };

  private getTextXPosition = () => GAME_WIDTH - 20;
}

export default Health;
