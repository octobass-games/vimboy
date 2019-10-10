import Phaser, { GameObjects } from "phaser";
import Entity, { Enemy } from "./Entity";
import createWordTypeEnemy from "./enemies/WordTypeEnemy";
import Random from "../utils/Random";
import { GAME_WIDTH } from "../../constants/game";

class EntityManager {
  private enemies?: GameObjects.Group;
  private nonEnemies?: GameObjects.Group;

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
    const enemyEntity = enemy.getData("data") as Enemy;
    const nonEnemyEntity = nonEnemy.getData("data") as Entity;
    enemyEntity.onCollision(nonEnemyEntity, nonEnemy);
  };

  public createEnemy(creator: () => GameObjects.GameObject | undefined) {
    const obj = creator();
    if (obj) {
      this.enemies!.add(obj);
    }
  }

  public createNonEnemy(creator: () => GameObjects.GameObject) {
    this.nonEnemies!.add(creator());
  }

  public update() {
    if (Random.getNumber(100) === 99) {
      this.createEnemy(createWordTypeEnemy);
    }
    this.enemies!.children.each(this.cleanup);
    this.nonEnemies!.children.each(this.cleanup);
  }

  public lineHasEnemy = (line: number): boolean => {
    const enemy = this.getFirstWordOnLine(line);
    return enemy !== undefined;
  };

  public getEnemiesAboveLine(line: number): Array<GameObjects.GameObject> {
      return this.enemies!.getChildren().filter(enemy => (enemy.getData("data") as Enemy).line < line)
  }

  public getFirstWordOnLine(line: number): GameObjects.GameObject | undefined {
    var word = undefined;
    this.enemies!.children.each(c => {
      const enemy = c.getData("data") as Enemy;

      if (enemy.line === line) {
        word = c;
      }
    });
    return word;
  }

  private cleanup = (obj: GameObjects.GameObject) => {
    const body = obj.body as Phaser.Physics.Arcade.Body;

    if (body.x < 0 - GAME_WIDTH || body.x > GAME_WIDTH + 200) {
      this.destroyEnemy(obj);
    }
  };

  public destroyEnemy = (obj: GameObjects.GameObject) => {
    obj.destroy();
    this.enemies!.remove(obj);
  };

  public destroyNonEnemy = (obj: GameObjects.GameObject) => {
    obj.destroy();
    this.nonEnemies!.remove(obj);
  };

  public getEnemies(): Array<GameObjects.GameObject> {
      return this.enemies!.getChildren();
  }
}

export default EntityManager;
