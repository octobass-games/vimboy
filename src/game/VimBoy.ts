import { CELL_SIZE, PLAY_ZONE_HEIGHT, GAME_START_X } from "../constants/game";
import Movement from "./Movement";
import { Images } from "./loaders/ImageLoader";
import { Animations } from "./loaders/AnimationLoader";
import { Colours } from "../constants/colours";
import { enableBody } from "./entities/helpers/BodyCreator";

class VimBoy {
  public movement?: Movement;
  public vimboy?: Phaser.GameObjects.Sprite;

  public create = () => {
    this.movement = new Movement();

    this.vimboy = window.scene.add.sprite(
      GAME_START_X + 50 / 2,
      PLAY_ZONE_HEIGHT - CELL_SIZE / 2,
      Images.VIMBOY
    );

    enableBody(this.vimboy);

    window.scene.vimboy.changeColour(Colours.LIGHT_GREEN);
  };

  public update = () => {
    this.movement!.update(this.vimboy!);

    if (!this.vimboy!.anims.isPlaying) {
      this.vimboy!.anims.play(Animations.VIMBOY_BOB, true);
    }
  };

  public onEnemyCollision = (
    player: Phaser.GameObjects.GameObject,
    enemy: Phaser.GameObjects.GameObject
  ) => {
    window.scene.entityManager.destroyEnemy(enemy);
    window.scene.health.injure();
    this.vimboy!.setTint(Colours.RED);

    window.scene.time.addEvent({
      delay: 200,
      callback: () => {
        this.vimboy!.setTint(window.scene.modeManager.getCurrentColour());
      }
    });
  };

  public onPickupCollision = (
    player: Phaser.GameObjects.GameObject,
    pickup: Phaser.GameObjects.GameObject
  ) => {
    window.scene.entityManager.destroyNonEnemy(pickup);
    window.scene.powerUpManager.addPowerUp(pickup.getData("data"));
  };

  public playWordAttack = () =>
    this.vimboy!.anims.play(Animations.VIMBOY_WORD_ATTACK, true);

  public playUp = () => this.vimboy!.anims.play(Animations.VIMBOY_UP, true);
  public playDown = () => this.vimboy!.anims.play(Animations.VIMBOY_DOWN, true);
  public playPop = () => this.vimboy!.anims.play(Animations.VIMBOY_POP, true);

  public jumpToLine = (lineNumber: number) =>
    this.movement!.jumpToLine(lineNumber, this.vimboy!);

  public jumpBackNLines = (n: number) =>
    this.movement!.jumpBackNLines(n, this.vimboy!);

  public currentLine = () => this.movement!.currentLine(this.vimboy!);

  public changeColour = (colour: number) => this.vimboy!.setTint(colour);
}

export default VimBoy;
