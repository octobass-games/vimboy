export const enableBody = (obj: Phaser.GameObjects.GameObject) => {
  window.scene.physics.world.enableBody(obj);

  const body = obj.body as Phaser.Physics.Arcade.Body;

  body.setAllowGravity(false);
};
