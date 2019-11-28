import Phaser, { GameObjects } from "phaser";
import { Images } from "../loaders/ImageLoader";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "../../constants/game";
import { Sound } from "../loaders/SoundLoader";
import { FONT, FONT_SIZE, FONT_CONFIG } from "../../constants/text";
import { StringColours } from "../../constants/colours";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "End"
};

const goodScore = 100;

export class End extends Phaser.Scene {
  private replayButton?: GameObjects.Text;
  private menuButton?: GameObjects.Text;
  private replaySelected: boolean = true;
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {}

  public create() {
    this.sound.stopAll();
    const score = window.scene.scoreBoard.score;
    if (score >= goodScore) {
      this.sound.play(Sound.GOOD_SCORE);
      this.renderImage(Images.TROPHY, false);
      this.renderText("Wow!");
    } else {
      this.sound.play(Sound.DEATH);
      this.renderImage(Images.GHOST, true);
      this.renderText("Better luck next time!");
    }

    this.replayButton = this.add.text(0, (3 * GAME_HEIGHT) / 4, "> Replay", {
      ...FONT_CONFIG,
      align: "center",
      fixedWidth: GAME_WIDTH / 2,
      color: StringColours.YELLOW
    });
    this.menuButton = this.add.text(
      GAME_WIDTH / 2,
      (3 * GAME_HEIGHT) / 4,
      "  Menu",
      {
        ...FONT_CONFIG,
        align: "center",
        fixedWidth: GAME_WIDTH / 2
      }
    );

    this.input.keyboard.on("keydown", (keyEvent: KeyboardEvent) => {
      switch (keyEvent.key.toLowerCase()) {
        case "arrowleft":
        case "h":
          this.replaySelected = true;
          this.replayButton!.setText("> Replay");
          this.replayButton!.setColor(StringColours.YELLOW);
          this.menuButton!.setText("  Menu");
          this.menuButton!.setColor(StringColours.WHITE);
          break;
        case "arrowright":
        case "l":
          this.replaySelected = false;
          this.menuButton!.setText("> Menu");
          this.menuButton!.setColor(StringColours.YELLOW);
          this.replayButton!.setColor(StringColours.WHITE);
          this.replayButton!.setText("  Replay");
          break;
        case "enter":
          if (this.replaySelected) {
            this.scene.start("Game");
          } else {
            this.scene.start("Menu");
          }
          break;
      }
    });
  }

  private renderImage = (imageStr: Images, tweenImage: boolean) => {
    const image = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, imageStr);
    if (tweenImage) {
      this.tweens.add({
        targets: image,
        repeat: -1,
        y: { from: GAME_HEIGHT / 2, to: GAME_HEIGHT / 2 - 10 },
        yoyo: true
      });
      this.tweens.add({
        targets: image,
        duration: 2000,
        alpha: { from: 0.2, to: 1 },
        repeat: -1,
        yoyo: true
      });
    }
  };

  private renderText = (text: string) => {
    const textStartY = GAME_HEIGHT / 6;

    this.add.text(0, textStartY, text, {
      fontFamily: FONT,
      fontSize: FONT_SIZE * 1.5,
      align: "center",
      fixedWidth: GAME_WIDTH,
      color: StringColours.PINK
    });
    this.add.text(
      0,
      textStartY + CELL_SIZE * 2,
      `score: ${window.scene.scoreBoard.score}`,
      {
        ...FONT_CONFIG,
        align: "center",
        fixedWidth: GAME_WIDTH
      }
    );
  };

  public update() {}
}
