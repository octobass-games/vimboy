export enum EntityType {
  WORD_TYPE_ENEMY = "WORD_TYPE_ENEMY",
  WORD_ATTACK = "WORD_ATTACK",
  DELETE_WORD_PICKUP = "DELETE_WORD_PICKUP"
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
}

export default Entity;
