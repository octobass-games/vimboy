import Phaser from "phaser";
import { play } from "../Game";
import WebFont from "webfontloader";
import { GAME_HEIGHT, GAME_WIDTH } from "../../constants/game";
import { Colours } from "../../constants/colours";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Menu"
};

export class Menu extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    const loadingText = this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      "loading"
    );
    const rect = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT
    );
    rect.setFillStyle(Colours.BLACK);
    rect.setDepth(2);
    loadingText.setDepth(3);

    WebFont.load({
      google: {
        families: ["VT323"]
      },
      active: () => {
        loadingText.destroy();
        rect.destroy();
      }
    });
  }

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
