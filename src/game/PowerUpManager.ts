import Entity from "./entities/Entity";
import { Images } from "./loaders/ImageLoader";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "../constants/game";
import { GameObjects } from "phaser";

class PowerUpManager {
  private powerUps: Entity[] = [];
  private group?: Phaser.GameObjects.Group;

  public addPowerUp = (entity: Entity) => {
    if (this.powerUps.length === 6) {
      this.powerUps.shift();
      const child = this.group!.children.getArray()[0];
      this.group!.remove(child);
    }

    this.powerUps.push(entity);
    const powerUp = window.scene.add.sprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT - CELL_SIZE / 2,
      Images.PRESENT
    );
    this.group!.add(powerUp);

    this.group!.children.getArray().forEach((child, index) => {
      const sprite = child as GameObjects.Sprite;
      sprite.setX(GAME_WIDTH / 3 + index * CELL_SIZE);
    });
    // this.group!.
  };

  public create() {
    this.group = window.scene.add.group();
  }

  public update() {}
}

export default PowerUpManager;
