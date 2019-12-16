import { printWord } from "./tutorialUtils";

class TutorialCommands {
  public init = () => {
    window.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        printWord(["typing a colon will enter you into command mode"], 4);
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
      }
    });
  };

  public update = () => {};
}

export default TutorialCommands;
