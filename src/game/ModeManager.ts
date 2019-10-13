import Mode from "./mode/Mode";
import NormalMode from "./mode/NormalMode";
import InsertMode from "./mode/InsertMode";
import CommandMode from "./mode/CommandMode";
import { Colours } from "../constants/colours";

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
    window.scene.tweens.setGlobalTimeScale(0.2);
  }

  public update() {}

  public setMode = (mode: Mode) => {
    this.mode = mode;
  };

  public switchToInsert(): void {
    this.mode = new InsertMode();
    window.scene.tweens.setGlobalTimeScale(1);
    window.scene.vimboy.changeColour(Colours.LIGHT_BLUE);
  }

  public switchToNormal(): void {
    this.mode = new NormalMode();
    window.scene.vimboy.changeColour(Colours.LIGHT_GREEN);
    window.scene.tweens.setGlobalTimeScale(0.2);
  }

  public switchToCommand(): void {
    window.scene.vimboy.changeColour(Colours.PINK);
    window.scene.tweens.setGlobalTimeScale(0.2);
    this.mode = new CommandMode();
  }
}

export default ModeManager;
