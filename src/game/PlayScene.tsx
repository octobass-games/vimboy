import Phaser from "phaser";

import Background from "./Background";
import TextCreator from "./TextCreator";
import VimBoy from "./VimBoy";
import ModeManager from "./ModeManager";
import StatusLine from "./StatusLine";
import ScoreBoard from "./ScoreBoard";
import Health from "./Health";
import preloadImages from "./ImageLoader";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export class PlayScene extends Phaser.Scene {
  public vimboy: VimBoy;
  public textCreator: TextCreator;
  public modeManager: ModeManager;
  public statusLine: StatusLine;
  public scoreBoard: ScoreBoard;
  public health: Health;
  public keyCapturer?: Phaser.Input.Keyboard.KeyboardPlugin;
  public graphics?: Phaser.GameObjects.Graphics;

  constructor() {
    super(sceneConfig);
    window.scene = this;

    this.vimboy = new VimBoy();
    this.textCreator = new TextCreator();
    this.modeManager = new ModeManager();
    this.scoreBoard = new ScoreBoard();
    this.health = new Health();
    this.statusLine = new StatusLine();
  }

  public preload(): void {
    preloadImages();
  }

  public create() {
    this.keyCapturer = window.scene.input.keyboard.addCapture([
      Phaser.Input.Keyboard.KeyCodes.I
    ]); // I is a lie, it captures all keys

    this.graphics = this.add.graphics({ x: 0, y: 0 });

    new Background(this.graphics).drawBackground();

    this.vimboy.create();
    this.modeManager.create();
    this.statusLine.create();
    this.health.create();
    this.scoreBoard.create();

    this.textCreator.create();
  }

  public update() {
    this.vimboy.update();
    this.textCreator.update();
    this.modeManager.update();
    this.statusLine!.update();
  }
}
