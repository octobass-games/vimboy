import { BOTTOM_BAR_Y, GAME_WIDTH, CELL_SIZE } from "../constants/game";
import { Colours } from "../constants/colours";

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
    this.lifes--;
    this.renderImages();
  };

  private renderImages = () => {
    this.images.forEach(i => i.destroy());
    [...Array(this.lifes)].forEach((life, index) => {
      console.log(life, index);
      this.images.push(
        window.scene.add
          .image(
            this.getTextXPosition() - index * 30,
            BOTTOM_BAR_Y + CELL_SIZE * 1.5,
            "heart"
          )
          .setTint(colours[index])
      );
    });
  };

  private getTextXPosition = () => GAME_WIDTH - 20;
}

export default Health;
