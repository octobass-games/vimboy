import { PlayScene } from "./PlayScene";

class KeyHelper {
  private scene: PlayScene;
  constructor(scene: PlayScene) {
    this.scene = scene;
  }

  public isKeyPressed = (key: Phaser.Input.Keyboard.Key): boolean => 
    this.scene.input.keyboard.checkDown(key,500);
  
}

export default KeyHelper;
