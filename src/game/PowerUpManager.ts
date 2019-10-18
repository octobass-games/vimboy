import { Images } from "./loaders/ImageLoader";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "../constants/game";
import { GameObjects } from "phaser";
import { FONT } from "../constants/text";
import { StringColours } from "../constants/colours";
import Random from "./utils/Random";
import { playClashAnimation, playTextFlash } from "./utils/animationPlayer";

export enum PowerUp {
  DELETE_WORD,
  DELETE_LINE
}

const powerUpToString: Record<PowerUp, string> = {
  [PowerUp.DELETE_LINE]: "dd",
  [PowerUp.DELETE_WORD]: "dw"
};

const powerUpToString2: Record<PowerUp, string> = {
  [PowerUp.DELETE_LINE]: "Delete Line",
  [PowerUp.DELETE_WORD]: "Delete Word"
};

class PowerUpManager {
  private powerUps: Phaser.GameObjects.Group[] = [];

  public addPowerUp = (colour: number) => {
    if (this.powerUps.length === 6) {
      const powerUpToKill = this.powerUps.shift();
      powerUpToKill!.destroy(true);
    }

    const powerUp = window.scene.add.sprite(
      0,
      GAME_HEIGHT - CELL_SIZE / 2,
      Images.POWER_UP_FOUND
    );

    const pickedPowerUp = Random.randomEnum(PowerUp);

    const label = window.scene.add.text(
      0,
      GAME_HEIGHT - CELL_SIZE + 5,
      powerUpToString[pickedPowerUp],
      {
        fontFamily: FONT,
        fontSize: 30,
        align: "center",
        fixedWidth: CELL_SIZE - 10,
        color: StringColours.WHITE
      }
    );
    powerUp.setTint(colour);
    powerUp.setData("powerUp", pickedPowerUp);

    const group = window.scene.add.group([powerUp, label]);
    this.powerUps.push(group);
    this.refreshGroupPositioning();
  };

  public usePowerUp(powerUp: PowerUp, cb: () => void) {
    const index = this.powerUps.findIndex(g => {
      const obj = g.getChildren()[0];
      const foundPowerUp = obj.getData("powerUp") as PowerUp;
      if (foundPowerUp === powerUp) {
        return true;
      }
      return false;
    });

    if (index === -1) {
      console.log("could not use power up as not available");
      playTextFlash(CELL_SIZE, GAME_HEIGHT - CELL_SIZE, "Ugh");

      return;
    }

    const output = this.powerUps.splice(index, 1);
    const powerUpToKill = output[0];
    const sprite = powerUpToKill.getChildren()[0] as GameObjects.Sprite;
    playClashAnimation(sprite.x, sprite.y);
    output[0].destroy(true);
    this.refreshGroupPositioning();

    cb();
    playTextFlash(
      CELL_SIZE,
      GAME_HEIGHT - CELL_SIZE,
      powerUpToString2[powerUp]
    );
  }

  private refreshGroupPositioning = () => {
    this.powerUps.forEach((g, index) => {
      const sprite = g.getChildren()[0] as GameObjects.Sprite;
      const text = g.getChildren()[1] as GameObjects.Text;

      const x = GAME_WIDTH / 3 + index * CELL_SIZE;

      sprite.setX(x);
      text.setX(x - CELL_SIZE / 2 + 5);
    });
  };

  public create() {}

  public update() {}
}

export default PowerUpManager;
