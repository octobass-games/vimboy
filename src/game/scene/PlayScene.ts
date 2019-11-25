import Phaser from "phaser";

import Background from "../Background";
import VimBoy from "../VimBoy";
import ModeManager from "../ModeManager";
import StatusLine from "../StatusLine";
import ScoreBoard from "../ScoreBoard";
import Health from "../Health";
import preloadImages from "../loaders/ImageLoader";
import { loadAnimations } from "../loaders/AnimationLoader";
import EntityManager from "../entities/EntityManager";
import PowerUpManager from "../PowerUpManager";
import preloadSounds, { Sound } from "../loaders/SoundLoader";
import MusicManager from "../MusicManager";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export class PlayScene extends Phaser.Scene {
  public vimboy: VimBoy;
  public modeManager: ModeManager;
  public statusLine: StatusLine;
  public scoreBoard: ScoreBoard;
  public health: Health;
  public entityManager: EntityManager;
  public powerUpManager: PowerUpManager;
  public musicManager: MusicManager;
  public keyCapturer?: Phaser.Input.Keyboard.KeyboardPlugin;
  public graphics?: Phaser.GameObjects.Graphics;

  constructor() {
    super(sceneConfig);
    window.scene = this;

    this.vimboy = new VimBoy();
    this.modeManager = new ModeManager();
    this.scoreBoard = new ScoreBoard();
    this.health = new Health();
    this.statusLine = new StatusLine();
    this.entityManager = new EntityManager();
    this.powerUpManager = new PowerUpManager();
    this.musicManager = new MusicManager();
  }

  public preload(): void {
    preloadImages();
    preloadSounds();
  }

  public create() {
    loadAnimations();
    this.keyCapturer = window.scene.input.keyboard.addCapture([
      Phaser.Input.Keyboard.KeyCodes.I
    ]); // I is a lie, it captures all keys

    this.graphics = this.add.graphics({ x: 0, y: 0 });

    const background = new Background(this.graphics);

    background.drawBackground();

    this.vimboy.create();
    this.modeManager.create();
    this.statusLine.create();
    this.health.create();
    this.scoreBoard.create();
    this.entityManager.create();
    this.powerUpManager.create();
    this.musicManager.create();
  }

  public update() {
    this.vimboy.update();
    this.modeManager.update();
    this.statusLine!.update();
    this.entityManager.update();
    this.powerUpManager.update();
  }
}
