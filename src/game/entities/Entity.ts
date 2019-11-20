export enum EntityType {
  WORD_TYPE_ENEMY = "WORD_TYPE_ENEMY",
  WORD_ATTACK = "WORD_ATTACK",
  PICKUP = "PICKUP"
}

interface BaseEntity {
  line: number;
  type: EntityType;
  normalVelocity: number;
}

export interface WordAttack extends BaseEntity {
  type: EntityType.WORD_ATTACK;
}

export interface Enemy extends BaseEntity {
  onCollision: (
    entity: Entity,
    gameObject: Phaser.GameObjects.GameObject
  ) => void;
  words: string[];
  type: EntityType.WORD_TYPE_ENEMY;
}

export interface Pickup extends BaseEntity {
  colour: number;
  type: EntityType.PICKUP;
}

type Entity = Enemy | Pickup | WordAttack;

export default Entity;
