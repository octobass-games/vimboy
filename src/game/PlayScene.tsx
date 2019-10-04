import Phaser from "phaser";

import Background from "./Background";
import TextCreator from "./TextCreator";
import VimBoy from "./VimBoy";
import ModeManager from "./ModeManager";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export class PlayScene extends Phaser.Scene {
  private vimboy: VimBoy;
  private textCreator: TextCreator;
  private modeManager: ModeManager;

  constructor() {
    super(sceneConfig);
    this.vimboy = new VimBoy(this);
    this.textCreator = new TextCreator(this);
    this.modeManager = new ModeManager(this);
  }

  public preload(): void {
    this.vimboy.preload();
  }

  public create() {
    const graphics = this.add.graphics({ x: 0, y: 0 });
    new Background(graphics).drawBackground();

    this.modeManager.create();
    this.vimboy.create();
  }

  public update() {
    this.vimboy.update();
    this.textCreator.update();
    this.modeManager.update();
  }
}
