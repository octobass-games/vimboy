import Mode from "./mode/Mode";
import NormalMode from "./mode/NormalMode";
import InsertMode from "./mode/InsertMode";
import CommandMode from "./mode/CommandMode";
import { Colours } from "../constants/colours";

class ModeManager {
  public mode: Mode;
  private colour: Colours = Colours.LIGHT_GREEN;

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
    this.colour = Colours.LIGHT_BLUE;
    window.scene.vimboy.changeColour(this.colour);
  }

  public switchToNormal(): void {
    this.mode = new NormalMode();
    this.colour = Colours.LIGHT_GREEN;
    window.scene.vimboy.changeColour(this.colour);
    window.scene.tweens.setGlobalTimeScale(0.2);
  }

  public switchToCommand(): void {
    this.colour = Colours.PINK;
    window.scene.vimboy.changeColour(this.colour);
    window.scene.tweens.setGlobalTimeScale(0.2);
    this.mode = new CommandMode();
  }

  public getCurrentColour = () => this.colour;
}

export default ModeManager;
