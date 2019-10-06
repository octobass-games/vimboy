export enum Mode {
  NORMAL = "NORMAL",
  INSERT = "INSERT",
  COMMAND = "COMMAND"
}

class ModeManager {
  public mode: Mode = Mode.NORMAL;

  public create() {
    window.scene.keyCapturer!.addListener(
      "keydown",
      (keyEvent: KeyboardEvent) => {
        switch (keyEvent.key) {
          case "i":
            if (this.mode === Mode.NORMAL) {
              this.setMode(Mode.INSERT);
            }
            break;
          case "Escape":
            if (this.mode !== Mode.NORMAL) {
              this.setMode(Mode.NORMAL);
            }
            break;
          case ":":
            if (this.mode === Mode.NORMAL) {
              this.setMode(Mode.COMMAND);
            }
            break;
        }
      }
    );
  }

  public update() {}

  public setMode = (mode: Mode) => {
    this.mode = mode;
  };
}

export default ModeManager;
