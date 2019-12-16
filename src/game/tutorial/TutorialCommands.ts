import { printWord } from "./tutorialUtils";

class TutorialCommands {
  private input = "";
  public init = () => {
    window.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        printWord(["Typing a colon will enter you into command mode"], 4);
      }
    });

    window.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        printWord(
          ["Following it with a number will let you jump to that line!"],
          5
        );

        window.scene.modeManager.allow("Shift:", "Shift", ":", "Enter");
        window.scene.modeManager.allow(
          ...Array.from(Array(10).keys()).map(v => v.toString())
        );
        window.scene.keyCapturer!.addListener("keydown", this.jump);
      }
    });
  };

  private jump = (keyEvent: KeyboardEvent) => {
    if (keyEvent.key.toLowerCase() === "enter") {
      if (this.input.match(/:[0-9]+/) !== null) {
        window.scene.entityManager.destroyAll();
        window.scene.keyCapturer!.removeListener("keydown", this.jump);
        printWord(["Look at you go!"], 1);

        window.scene.time.addEvent({
          delay: 1000,
          callback: () => {
            printWord(
              [
                "Theres all sorts of commands so feel free to try whatever you can think of!"
              ],
              2
            );
          }
        });
      } else {
        this.input = "";
      }
    } else {
      this.input += keyEvent.key.toLowerCase();
    }
  };

  public update = () => {};
}

export default TutorialCommands;
