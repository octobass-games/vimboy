import Tutorial from "./Tutorial";

class TutorialManager {
  private tutorial!: Tutorial;

  public create() {
    if (window.tutorialMode) {
      this.tutorial = new Tutorial(() => {});
      window.scene.modeManager.allowNone();
      window.scene.vimboy.setBulletProof(true);
      this.tutorial.start();
    }
  }

  public update() {
    if (window.tutorialMode) {
      this.tutorial.update();
    }
  }
}

export default TutorialManager;
