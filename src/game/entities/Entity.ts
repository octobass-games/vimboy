export enum EntityType {
  WORD_TYPE_ENEMY = "WORD_TYPE_ENEMY",
  WORD_ATTACK = "WORD_ATTACK",
  PICKUP = "PICKUP"
}

interface Entity {
  line: number;
  type: EntityType;
}

export interface Enemy extends Entity {
  onCollision: (
    entity: Entity,
    gameObject: Phaser.GameObjects.GameObject
  ) => void;
  words: string[];
}

export interface Pickup extends Entity {
  colour: number;
}

export default Entity;
