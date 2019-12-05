import { Sound } from "./loaders/SoundLoader";

class MusicManager {
  private music?: Phaser.Sound.HTML5AudioSound;
  public create() {
    window.scene.sound.stopAll();

    this.music = window.scene.sound.add(Sound.MUSIC, {
      loop: true,
      volume: 0.5
    }) as Phaser.Sound.HTML5AudioSound;
    this.music.play();
  }
}

export default MusicManager;
