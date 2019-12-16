import { printWord, generatePresent } from "./tutorialUtils";

class TutorialMovement {
  private generatePresents: boolean = false;
  constructor(private nextTutorial: () => void) {}

  public start() {
    window.scene.entityManager.pauseRandomGeneration();

    printWord(["Hey there!"], 1);

    window.scene.time.addEvent({
      delay: 500,
      callback: () => {
        printWord(["Try hitting 'k' to move up a line!"], 2);
        window.scene.modeManager.allow("k");

        window.scene.keyCapturer!.addListener("keydown", this.up);
      }
    });
  }

  public update() {
    if (this.generatePresents) {
      generatePresent();
      if (
        window.scene.powerUpManager.hasNouns() &&
        window.scene.powerUpManager.hasVerbs()
      ) {
        this.afterPresentPickup();
      }
    }
  }

  private afterPresentPickup = () => {
    if (
      window.scene.powerUpManager.hasNouns() &&
      window.scene.powerUpManager.hasVerbs()
    ) {
      this.generatePresents = false;
      window.scene.entityManager.destroyAll();

      window.scene.time.addEvent({
        delay: 500,
        callback: () => {
          printWord(["Next up is commands!"], 2);
          this.nextTutorial();
        }
      });
    }
  };

  private up = (keyEvent: KeyboardEvent) => {
    if (keyEvent.key.toLowerCase() === "k") {
      window.scene.modeManager.allow("j");
      window.scene.entityManager.destroyAll();
      printWord(["Nice! Now try j to move down"], 3);
      window.scene.keyCapturer!.removeListener("keydown", this.up);
      window.scene.keyCapturer!.addListener("keydown", this.down);
    }
  };

  private down = (keyEvent: KeyboardEvent) => {
    if (keyEvent.key.toLowerCase() === "j") {
      window.scene.entityManager.destroyAll();
      printWord(
        [
          "Cool! try moving around a bit and see if you can pick up some presents"
        ],
        2
      );
      printWord(["You can also use 'h' and 'l' to move left and right"], 3);
      window.scene.modeManager.allow("h");
      window.scene.modeManager.allow("l");

      window.scene.keyCapturer!.removeListener("keydown", this.down);
      this.generatePresents = true;
    }
  };
}

export default TutorialMovement;
