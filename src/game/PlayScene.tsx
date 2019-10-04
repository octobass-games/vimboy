import Phaser from "phaser";

import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "../constants/constants";
import Movement from "./Movement";
import Background from "./Background";
import TextCreator from "./TextCreator";
import { FONT, FONT_SIZE } from "../constants/text";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

enum Mode {
  NAVIGATION = "Navigation Mode"
}

export class PlayScene extends Phaser.Scene {
  private vimboy?: Phaser.GameObjects.Sprite;
  private movement?: Movement;
  private textCreator?: TextCreator;
  private mode: Mode = Mode.NAVIGATION;

  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    this.load.image("vimboy", process.env.PUBLIC_URL + "/images/vimboy.png");
  }

  public create() {
    const graphics = this.add.graphics({ x: 0, y: 0 });
    new Background(graphics).drawBackground();

    this.add.text(GAME_WIDTH - 120, GAME_HEIGHT - CELL_SIZE / 2, this.mode, {
      fontFamily: FONT,
      fontSize: FONT_SIZE / 3
    });

    this.vimboy = this.add.sprite(
      CELL_SIZE / 2,
      GAME_HEIGHT - CELL_SIZE / 2 - CELL_SIZE,
      "vimboy"
    );

    this.movement = new Movement(this.vimboy, this.input);
    this.textCreator = new TextCreator(this);
  }

  public update() {
    this.movement!.checkKeys();
    this.textCreator!.update();
  }
}
