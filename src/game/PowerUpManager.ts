import { Images } from "./loaders/ImageLoader";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "../constants/game";
import { GameObjects } from "phaser";
import { FONT } from "../constants/text";
import { StringColours } from "../constants/colours";
import Random from "./utils/Random";
import { playTextFlash } from "./utils/animationPlayer";
import { Verb, Noun } from "../constants/verbsAndNouns";

class PowerUpManager {
  private verbs: Phaser.GameObjects.Group[] = [];
  private nouns: Phaser.GameObjects.Group[] = [];

  private selectedVerb?: Phaser.GameObjects.Group;
  private selectedNoun?: Phaser.GameObjects.Group;

  public addPowerUp = (colour: number) => {
    if (Random.randomBool()) {
      const verb = Random.randomStringEnum(Verb);
      this.drawPowerUp(colour, this.verbs, verb);
    } else {
      const noun = Random.randomStringEnum(Noun);
      this.drawPowerUp(colour, this.nouns, noun);
    }
  };

  private drawPowerUp = (
    colour: number,
    list: Phaser.GameObjects.Group[],
    thing: Verb | Noun
  ) => {
    if (list.length === 6) {
      const powerUpToKill = list.shift();
      powerUpToKill!.destroy(true);
    }

    const powerUp = window.scene.add.sprite(0, spriteY, Images.POWER_UP_FOUND);
    const label = window.scene.add.text(0, spriteY, thing, textConfig);

    powerUp.setTint(colour);
    powerUp.setData("powerUp", thing);
    powerUp.setData("colour", colour);

    const group = window.scene.add.group([powerUp, label]);
    list.push(group);
    this.refreshGroupPositioning();
  };

  public canUsePowerUp = (verb: Verb, noun: Noun): boolean =>
    this.selectedVerb !== undefined &&
    this.selectedVerb.getChildren()[0].getData("data") === verb &&
    this.selectedNoun !== undefined &&
    this.selectedNoun.getChildren()[0].getData("data") === noun;

  public setVerbIfAvailable(verb: Verb) {
    this.selectedVerb = this.useItemAndCreateSelected(
      verb,
      this.verbs,
      GAME_WIDTH / 2 - CELL_SIZE + 2
    );
  }

  public setNounIfAvailable(noun: Noun) {
    this.selectedNoun = this.useItemAndCreateSelected(
      noun,
      this.nouns,
      GAME_WIDTH / 2 + CELL_SIZE + 2
    );
  }

  private useItemAndCreateSelected(
    thing: Verb | Noun,
    list: Phaser.GameObjects.Group[],
    x: number
  ) {
    const index = this.findThingIndex(thing, list);

    if (index !== -1) {
      const obj = list[index];
      const colour = obj.getChildren()[0].getData("colour");

      obj.destroy(true);
      list.splice(index, 1);
      this.refreshGroupPositioning();
      const powerUp = window.scene.add.sprite(
        x,
        spriteY,
        Images.POWER_UP_FOUND
      );
      powerUp.setTint(colour);
      powerUp.setData("data", thing);

      const label = this.addLabel(x, thing);
      return window.scene.add.group([powerUp, label]);
    }
  }

  public clear() {
    if (this.selectedNoun) {
      this.selectedNoun.destroy(true);
    }
    if (this.selectedVerb) {
      this.selectedVerb.destroy(true);
    }
  }

  public use() {
    // TODO: wait before doing this
    this.clear();
    playTextFlash(
      CELL_SIZE,
      GAME_HEIGHT - CELL_SIZE,
      "TODO put used thing here"
    );
  }

  private findThingIndex = <Thing>(
    thing: Thing,
    list: Phaser.GameObjects.Group[]
  ): number =>
    list.findIndex(g => {
      const obj = g.getChildren()[0];
      const foundPowerUp = obj.getData("powerUp") as Thing;
      if (foundPowerUp === thing) {
        return true;
      }
      return false;
    });

  private refreshGroupPositioning = () => {
    this.verbs.forEach((g, i) =>
      this.updateX(g, GAME_WIDTH / 2 - i * CELL_SIZE - CELL_SIZE * 3)
    );

    this.nouns.forEach((g, i) =>
      this.updateX(g, GAME_WIDTH / 2 + i * CELL_SIZE + CELL_SIZE * 3)
    );
  };

  private updateX = (g: GameObjects.Group, x: number) => {
    const sprite = g.getChildren()[0] as GameObjects.Sprite;
    const text = g.getChildren()[1] as GameObjects.Text;

    sprite.setX(x);
    text.setX(this.getTextXPosition(x));
  };

  private getTextXPosition = (spritePositionX: number) =>
    spritePositionX - CELL_SIZE / 2 + 5;

  private addLabel = (x: number, label: string) =>
    window.scene.add.text(this.getTextXPosition(x), labelY, label, textConfig);

  public create() {
    window.scene.add.sprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT - CELL_SIZE * 1.5,
      Images.POWER_UP_CONTAINER
    );
  }

  public update() {}
}

const spriteY = GAME_HEIGHT - CELL_SIZE * 1.5;
const labelY = GAME_HEIGHT - CELL_SIZE * 2 + 5;
const textConfig = {
  fontFamily: FONT,
  fontSize: 30,
  align: "center",
  fixedWidth: CELL_SIZE - 10,
  color: StringColours.WHITE
};

export default PowerUpManager;
