import Phaser from "phaser";
import { play } from "../Game";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Menu"
};

export class Menu extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {}

  public create() {
    const helloButton = this.add.text(100, 100, "Play", {
      fill: "#0f0"
    });
    helloButton.setInteractive();

    helloButton.on("pointerup", () => {
      play();
    });
  }

  public update() {}
}
