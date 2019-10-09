import Phaser, { GameObjects } from "phaser";
import Entity from "./Entity";
import createWordTypeEnemy from "./enemies/WordTypeEnemy";
import Random from "../Random";
import { GAME_WIDTH } from "../../constants/game";

class EntityManager {
  private enemies?: Phaser.GameObjects.Group;
  private nonEnemies?: Phaser.GameObjects.Group;

  public create = () => {
    this.enemies = window.scene.add.group();
    this.nonEnemies = window.scene.add.group();

    window.scene.physics.add.overlap(
      this.nonEnemies,
      this.enemies,
      this.onCollision
    );
  };

  private onCollision = (
    nonEnemy: Phaser.GameObjects.GameObject,
    enemy: Phaser.GameObjects.GameObject
  ) => {
    const enemyEntity = enemy.getData("data") as Entity;
    const nonEnemyEntity = nonEnemy.getData("data") as Entity;
    enemyEntity.onCollision(nonEnemyEntity, nonEnemy);
  };

  public createEnemy(creator: () => GameObjects.GameObject) {
    // const enemyInRow = this.enemies
    // if (enemyInRow) {
    //   // Don't add enemy when one already exists
    //   return;
    // }

    this.enemies!.add(creator());
  }

  public createNonEnemy(creator: () => GameObjects.GameObject) {
    this.nonEnemies!.add(creator());
  }

  public update() {
    if (Random.getNumber(100) === 99) {
      this.createEnemy(createWordTypeEnemy);
    }
    this.enemies!.children.each(this.cleanup);
  }

  private cleanup(obj: Phaser.GameObjects.GameObject) {
    const body = obj.body as Phaser.Physics.Arcade.Body;

    if (body.x < 0 - GAME_WIDTH || body.x > GAME_WIDTH + 200) {
      obj.destroy();
    }
  }
}

export default EntityManager;
