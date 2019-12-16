import TutorialMovement from "./TutorialMovement";
import TutorialCommands from "./TutorialCommands";

enum STEP {
  MOVEMENT,
  COMMANDS
}
interface TutorialManagerState {
  step: STEP;
}

class TutorialManager {
  private state: TutorialManagerState = { step: STEP.MOVEMENT };
  private movement!: TutorialMovement;
  private commands: TutorialCommands = new TutorialCommands();

  public create() {
    if (window.tutorialMode) {
      this.movement = new TutorialMovement(() => {
        this.updateStep(STEP.COMMANDS);
        this.commands.init();
      });
      window.scene.modeManager.allowNone();
      window.scene.vimboy.setBulletProof(true);
      this.movement.start();
    }
  }

  private updateStep = (step: STEP) => (this.state.step = step);

  public update() {
    if (window.tutorialMode) {
      switch (this.state.step) {
        case STEP.MOVEMENT:
          this.movement.update();
          break;
        case STEP.COMMANDS:
          this.commands.update();
          break;
      }
    }
  }
}

export default TutorialManager;
