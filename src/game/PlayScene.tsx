import Phaser from "phaser";

import { GAME_WIDTH, CELL_SIZE, BOTTOM_BAR_Y } from "../constants/constants";
import Background from "./Background";
import TextCreator from "./TextCreator";
import { FONT, FONT_SIZE } from "../constants/text";
import VimBoy from "./VimBoy";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

enum Mode {
  NAVIGATION = "Navigation Mode"
}

export class PlayScene extends Phaser.Scene {
  private vimboy: VimBoy;
  private textCreator: TextCreator;
  private mode: Mode = Mode.NAVIGATION;

  constructor() {
    super(sceneConfig);
    this.vimboy = new VimBoy(this);
    this.textCreator = new TextCreator(this);
  }

  public preload(): void {
    this.vimboy.preload();
  }

  public create() {
    const graphics = this.add.graphics({ x: 0, y: 0 });
    new Background(graphics).drawBackground();

    this.add.text(GAME_WIDTH - 120, BOTTOM_BAR_Y + CELL_SIZE / 2, this.mode, {
      fontFamily: FONT,
      fontSize: FONT_SIZE / 3
    });

    this.vimboy.create();
  }

  public update() {
    this.vimboy.update();
    this.textCreator.update();
  }
}
