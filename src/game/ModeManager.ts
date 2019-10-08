import Mode from "./mode/Mode";
import NormalMode from "./mode/NormalMode";
import InsertMode from "./mode/InsertMode";
import CommandMode from "./mode/CommandMode";

class ModeManager {
  public mode: Mode;

  constructor() {
    this.mode = new NormalMode();
  }

  public create() {
    window.scene.keyCapturer!.addListener(
      "keydown",
      (keyEvent: KeyboardEvent) => {
        this.mode.handle(keyEvent);
      }
    );
  }

  public update() {}

  public setMode = (mode: Mode) => {
    this.mode = mode;
  };

  public switchToInsert(): void {
    this.mode = new InsertMode();
  }

  public switchToNormal(): void {
    this.mode = new NormalMode();
  }

  public switchToCommand(): void {
    this.mode = new CommandMode();
  }
}

export default ModeManager;
