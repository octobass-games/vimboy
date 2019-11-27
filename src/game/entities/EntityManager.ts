import Phaser, { GameObjects, Physics } from "phaser";
import Entity, { Enemy } from "./Entity";
import createWordTypeEnemy from "./enemies/WordTypeEnemy";
import Random from "../utils/Random";
import { GAME_WIDTH, CELL_SIZE } from "../../constants/game";
import createPickup from "./pickups/EntityPickup";

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

    window.scene.physics.add.overlap(
      window.scene.vimboy.vimboy!,
      this.enemies,
      window.scene.vimboy.onEnemyCollision
    );

    window.scene.physics.add.overlap(
      window.scene.vimboy.vimboy!,
      this.nonEnemies,
      window.scene.vimboy.onPickupCollision
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

  public createNonEnemy(creator: () => GameObjects.GameObject | undefined) {
    const obj = creator();
    if (obj) {
      this.nonEnemies!.add(obj);
    }
  }

  public update() {
    const randomNumber = Random.getNumber(300);
    if (randomNumber === 1 || this.enemies!.getChildren().length < 3) {
      this.createEnemy(createWordTypeEnemy);
    }

    if (randomNumber === 2 || this.nonEnemies!.getChildren().length < 1) {
      this.createNonEnemy(createPickup);
    }

    this.enemies!.children.each(this.cleanup);
    this.nonEnemies!.children.each(this.cleanup);
  }

  public lineHasEnemy = (line: number): boolean => {
    const enemy = this.getFirstWordOnLine(line);
    return enemy !== undefined;
  };

  public lineHasNonEnemy = (line: number): boolean => {
    const enemy = this.getNonEnemyOnLine(line);
    return enemy !== undefined;
  };

  public getEnemiesAboveLine(line: number): Array<GameObjects.GameObject> {
    return this.enemies!.getChildren().filter(
      enemy => (enemy.getData("data") as Entity).line < line
    );
  }

  public getFirstWordOnLine = (line: number): GameObjects.Text | undefined =>
    this.getOnLine(line, this.enemies!) as any;

  public getNonEnemyOnLine = (
    line: number
  ): GameObjects.GameObject | undefined =>
    this.getOnLine(line, this.nonEnemies!);

  private getOnLine = (
    line: number,
    group: GameObjects.Group
  ): GameObjects.GameObject | undefined => {
    var word = undefined;
    group.children.each(c => {
      const enemy = c.getData("data") as Entity;

      if (enemy.line === line) {
        word = c;
      }
    });
    return word;
  };

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

  public moveEverythingRight = () => {
    this.applyToAll(c => {
      c.setX(c.x + CELL_SIZE);
    });
  };

  public moveEverythingLeft = () => {
    this.applyToAll(c => {
      c.setX(c.x - CELL_SIZE);
    });
  };

  public matchToTimescale = () => {
    this.applyToAll((_, body, entity) => {
      body.setVelocityX(
        entity.normalVelocity * window.scene.tweens.getGlobalTimeScale()
      );
    });
  };

  private applyToAll = (
    cb: (
      child: GameObjects.Text | GameObjects.Sprite,
      body: Physics.Arcade.Body,
      entity: Entity
    ) => void
  ) => {
    if (this.enemies) {
      this.enemies.getChildren().forEach(c => {
        const text = c as GameObjects.Text;
        const body = c.body as Physics.Arcade.Body;
        const entity = c.getData("data") as Entity;
        cb(text, body, entity);
      });
    }

    if (this.nonEnemies) {
      this.nonEnemies.getChildren().forEach(c => {
        const sprite = c as GameObjects.Sprite;
        const body = c.body as Physics.Arcade.Body;
        const entity = c.getData("data") as Entity;
        cb(sprite, body, entity);
      });
    }
  };
}

export default EntityManager;
