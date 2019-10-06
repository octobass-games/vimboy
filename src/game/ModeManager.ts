import Mode from './mode/Mode';
import NormalMode from './mode/NormalMode';
import InsertMode from './mode/InsertMode';

// export enum Mode {
//   NORMAL = "NORMAL",
//   INSERT = "INSERT",
//   COMMAND = "COMMAND"
// }

class ModeManager {
  private mode: Mode;

  constructor() {
      this.mode = new NormalMode();
  }

  public create() {
    window.scene.keyCapturer!.addListener(
      "keydown",
      (keyEvent: KeyboardEvent) => this.mode.handle(keyEvent, { modeManager: this })
    );
  }

//  public create() {
//    window.scene.keyCapturer!.addListener(
//      "keydown",
//      (keyEvent: KeyboardEvent) => {
//        switch (keyEvent.key) {
//          case "i":
//            if (this.mode === Mode.NORMAL) {
//              this.setMode(Mode.INSERT);
//            }
//            break;
//          case "Escape":
//            if (this.mode !== Mode.NORMAL) {
//              this.setMode(Mode.NORMAL);
//            }
//            break;
//          case ":":
//            if (this.mode === Mode.NORMAL) {
//              this.setMode(Mode.COMMAND);
//            }
//            break;
//        }
//      }
//    );
//  }

  public update() {}

  public setMode = (mode: Mode) => {
    this.mode = mode;
  };

  public switchToInsert(): void {
      this.mode = new InsertMode();
  }
}

export default ModeManager;
