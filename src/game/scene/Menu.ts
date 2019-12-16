import Phaser, { GameObjects } from "phaser";
import WebFont from "webfontloader";
import { GAME_HEIGHT, GAME_WIDTH, CELL_SIZE } from "../../constants/game";
import { Colours, StringColours } from "../../constants/colours";
import { FONT, FONT_SIZE } from "../../constants/text";
import { handleInput } from "../../menu/handleInput";
import { cursorX, historyX } from "../../menu/displayer";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Menu"
};

export class Menu extends Phaser.Scene {
  public history: string[] = [];
  public historyPosition = 0;
  public currentLine: string = "";
  public lineText?: GameObjects.Text;
  public header?: GameObjects.Text;
  public preamble?: GameObjects.Text;
  public cursor?: GameObjects.Rectangle;
  public historyObj?: GameObjects.Group;

  constructor() {
    super(sceneConfig);
    window.tutorialMode = false;
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
        this.onLoaded();
      }
    });
  }

  private onLoaded = () => {
    this.historyObj = this.add.group();
    this.header = this.add.text(CELL_SIZE, 0, "vimboy@octobass.games", {
      fontFamily: FONT,
      fontSize: FONT_SIZE,
      color: StringColours.PINK
    });

    this.preamble = this.add.text(CELL_SIZE, FONT_SIZE, "~", {
      fontFamily: FONT,
      fontSize: FONT_SIZE,
      color: StringColours.YELLOW
    });

    this.lineText = this.add.text(CELL_SIZE + 30, FONT_SIZE, "", {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    });

    this.cursor = this.add.rectangle(
      cursorX(this.lineText),
      FONT_SIZE + CELL_SIZE / 2,
      5,
      CELL_SIZE,
      Colours.WHITE
    );
    this.tweens.add({
      targets: this.cursor,
      alpha: { from: 0, to: 1 },
      ease: "Cubic",
      duration: 1000,
      repeat: -1, // -1: infinity
      yoyo: false
    });
    this.input.keyboard.on("keydown", handleInput(this));
  };

  public create() {
    this.currentLine = "";
  }

  public update() {}

  public clearHistory() {
    this.history = [];
    this.historyObj!.clear(true);
  }

  public addHistory(item: string) {
    const y = this.historyObj!.getChildren().length + 1;
    this.history.push(item);
    this.historyObj!.add(
      this.add.text(historyX, (y - 1) * FONT_SIZE, item, {
        fontFamily: FONT,
        fontSize: FONT_SIZE
      })
    );
  }

  public moveDownALine = () => {
    const y = this.historyObj!.getChildren().length;

    this.currentLine = "";
    this.lineText!.setY((y + 1) * FONT_SIZE);
    this.cursor!.setY((y + 1) * FONT_SIZE + CELL_SIZE / 2);
    this.preamble!.setY((y + 1) * FONT_SIZE);
    this.header!.setY(y * FONT_SIZE);
    this.historyPosition = 0;
  };
}
