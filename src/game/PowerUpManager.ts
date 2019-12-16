import { Images, POWER_UP_FOUND_FRAME } from "./loaders/ImageLoader";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "../constants/game";
import { GameObjects } from "phaser";
import { FONT } from "../constants/text";
import { StringColours, Colours } from "../constants/colours";
import Random from "./utils/Random";
import { playTextFlash, playClashAnimation } from "./utils/animationPlayer";
import { Verb, Noun } from "../constants/verbsAndNouns";
import { Sound } from "./loaders/SoundLoader";

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

    const powerUp = window.scene.add
      .sprite(0, spriteY, Images.VIMBOY)
      .setFrame(POWER_UP_FOUND_FRAME);
    const label = window.scene.add.text(0, labelY, thing, textConfig);

    powerUp.setTint(colour);
    powerUp.setData("powerUp", thing);
    powerUp.setData("colour", colour);

    const group = window.scene.add.group([powerUp, label]);
    list.push(group);
    this.refreshGroupPositioning();
  };

  public canUsePowerUp = (verb: Verb, noun: Noun): boolean =>
    this.selectedVerb !== undefined &&
    this.getFromGroup(this.selectedVerb).sprite.getData("data") === verb &&
    this.selectedNoun !== undefined &&
    this.getFromGroup(this.selectedNoun).sprite.getData("data") === noun;

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
      GAME_WIDTH / 2 + CELL_SIZE - 2
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
      const colour = this.getFromGroup(obj).sprite.getData("colour");

      obj.destroy(true);
      list.splice(index, 1);
      this.refreshGroupPositioning();
      const powerUp = window.scene.add.sprite(x, spriteY, Images.VIMBOY);
      powerUp.setTint(colour);
      powerUp.setData("data", thing);
      powerUp.setFrame(POWER_UP_FOUND_FRAME);

      const label = this.addLabel(x, thing);
      return window.scene.add.group([powerUp, label]);
    }
  }

  public clear() {
    if (this.selectedVerb) {
      window.scene.sound.play(Sound.BAD);
      this.clearUsedSelected(this.selectedVerb);
    }
    if (this.selectedNoun) {
      this.clearUsedSelected(this.selectedNoun);
    }
    this.selectedVerb = undefined;
    this.selectedNoun = undefined;
  }

  private clearUsedSelected = (selected: GameObjects.Group) => {
    const { sprite } = this.getFromGroup(selected);
    playClashAnimation(sprite.x, sprite.y);
    sprite.setTint(Colours.PINK);

    window.scene.time.addEvent({
      delay: 500,
      callback: () => {
        selected.destroy(true);
      }
    });
  };

  public unusedClear() {
    if (this.selectedNoun) {
      this.clearUnusedSelected(this.selectedNoun);
    }
    if (this.selectedVerb) {
      this.clearUnusedSelected(this.selectedVerb);
    }
    this.selectedVerb = undefined;
    this.selectedNoun = undefined;
  }

  private clearUnusedSelected = (selected: GameObjects.Group) => {
    const { sprite } = this.getFromGroup(selected);
    sprite.setTint(Colours.RED);
    window.scene.time.addEvent({
      delay: 500,
      callback: () => {
        selected.destroy(true);
      }
    });
  };

  public use(name: string) {
    playTextFlash(CELL_SIZE, GAME_HEIGHT - CELL_SIZE, name);
    window.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.clear();
      }
    });
  }

  public hasVerb = () => this.selectedVerb !== undefined;

  private findThingIndex = <Thing>(
    thing: Thing,
    list: Phaser.GameObjects.Group[]
  ): number =>
    list.findIndex(g => {
      const { sprite } = this.getFromGroup(g);
      const foundPowerUp = sprite.getData("powerUp") as Thing;
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
    const { sprite, text } = this.getFromGroup(g);

    sprite.setX(x);
    text.setX(this.getTextXPosition(x));
  };

  private getTextXPosition = (spritePositionX: number) =>
    spritePositionX - CELL_SIZE / 2 + 5;

  private addLabel = (x: number, label: string) =>
    window.scene.add.text(this.getTextXPosition(x), labelY, label, textConfig);

  private getFromGroup = (g: GameObjects.Group) => {
    const sprite = g.getChildren()[0] as GameObjects.Sprite;
    const text = g.getChildren()[1] as GameObjects.Text;
    return { sprite, text };
  };

  public create() {
    window.scene.add.sprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT - CELL_SIZE * 1.5,
      Images.POWER_UP_CONTAINER
    );
  }

  public update() {}

  public hasVerbs = () => this.verbs.length > 0;
  public hasNouns = () => this.nouns.length > 0;
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
