import Entity from "./entities/Entity";
import { Images } from "./loaders/ImageLoader";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  CELL_SIZE,
  GAME_START_X
} from "../constants/game";
import { GameObjects } from "phaser";
import { FONT, FONT_SIZE } from "../constants/text";
import { StringColours } from "../constants/colours";

class PowerUpManager {
  private powerUps: Phaser.GameObjects.Group[] = [];

  public addPowerUp = (colour: number) => {
    if (this.powerUps.length === 6) {
      const powerUpToKill = this.powerUps.shift();
      powerUpToKill!.destroy();
    }

    const powerUp = window.scene.add.sprite(
      0,
      GAME_HEIGHT - CELL_SIZE / 2,
      Images.POWER_UP_FOUND
    );

    const label = window.scene.add.text(0, GAME_HEIGHT - CELL_SIZE + 5, "DW", {
      fontFamily: FONT,
      fontSize: 30,
      align: "center",
      fixedWidth: CELL_SIZE - 10,
      color: StringColours.WHITE
    });
    powerUp.setTint(colour);

    const group = window.scene.add.group([powerUp, label]);
    this.powerUps.push(group);
    this.refreshGroupPositioning();
  };

  private refreshGroupPositioning = () => {
    this.powerUps.forEach((g, index) => {
      const sprite = g.getChildren()[0] as GameObjects.Sprite;
      const text = g.getChildren()[1] as GameObjects.Text;

      const x = GAME_WIDTH / 3 + index * CELL_SIZE;

      sprite.setX(x);
      text.setX(x - CELL_SIZE / 2 + 5);
    });
  };

  public create() {}

  public update() {}
}

export default PowerUpManager;
