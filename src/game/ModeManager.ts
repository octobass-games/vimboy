import Mode from './mode/Mode';
import NormalMode from './mode/NormalMode';
import InsertMode from './mode/InsertMode';
import CommandMode from './mode/CommandMode';
import VimBoy from './VimBoy';

// export enum Mode {
//   NORMAL = "NORMAL",
//   INSERT = "INSERT",
//   COMMAND = "COMMAND"
// }

class ModeManager {
  public mode: Mode;

  constructor() {
      this.mode = new NormalMode();
  }

  public create(vimboy: VimBoy) {
    window.scene.keyCapturer!.addListener(
      "keydown",
      (keyEvent: KeyboardEvent) => this.mode.handle(keyEvent, { modeManager: this, vimboy, key: keyEvent.key })
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

  public switchToNormal(): void {
      this.mode = new NormalMode();
  }

  public switchToCommand(): void {
      this.mode = new CommandMode();
  }
}

export default ModeManager;
