import Tutorial from "./Tutorial";
import { Verb, Noun } from "../../constants/verbsAndNouns";
import { printText } from "./tutorialUtils";

class TutorialManager {
  private tutorial!: Tutorial;

  public create() {
    if (window.tutorialMode) {
      this.tutorial = new Tutorial(this.onComplete);
      window.scene.modeManager.allowNone();
      window.scene.vimboy.setBulletProof(true);
      window.scene.powerUpManager.presetVerb = Verb.d;
      window.scene.powerUpManager.presetNoun = Noun.d;
      this.tutorial.start();
    }
  }

  private onComplete = () => {
    printText([
      "Congrats thats the tutorial done",
      "Type :q to go back to main menu",
      "Or you can hang around here :)"
    ]);
    window.tutorialMode = false;
  };

  public update() {
    if (window.tutorialMode) {
      this.tutorial.update();
    }
  }
}

export default TutorialManager;
