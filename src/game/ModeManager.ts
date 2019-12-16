import Mode from "./mode/Mode";
import NormalMode from "./mode/NormalMode";
import InsertMode from "./mode/InsertMode";
import CommandMode from "./mode/CommandMode";
import { Colours } from "../constants/colours";

class ModeManager {
  public mode: Mode;
  private colour: Colours = Colours.LIGHT_GREEN;
  private allowedKeys: Set<string> = new Set();

  private allowedKeysMode: boolean = false;

  constructor() {
    this.mode = new NormalMode();
  }

  public create() {
    this.listen();
  }

  private listen = () => {
    window.scene.keyCapturer!.addListener(
      "keydown",
      (keyEvent: KeyboardEvent) => {
        if (!this.allowedKeysMode) {
          this.mode.handle(keyEvent);
        } else if (this.allowedKeys.has(keyEvent.key.toLowerCase())) {
          this.mode.handle(keyEvent);
        }
      }
    );
    window.scene.tweens.setGlobalTimeScale(0.2);
  };

  public update() {}

  public allow = (...keys: string[]) => {
    this.allowedKeysMode = true;
    keys.forEach(key => {
      this.allowedKeys.add(key.toLowerCase());
    });
  };

  public allowNone = () => {
    this.allowedKeysMode = true;
    this.allowedKeys = new Set();
  };

  public allowAll = () => {
    this.allowedKeysMode = false;
    this.allowedKeys = new Set();
  };

  public setMode = (mode: Mode) => {
    this.mode = mode;
  };

  public switchToInsert(): void {
    this.mode = new InsertMode();
    this.colour = Colours.LIGHT_BLUE;
    window.scene.vimboy.changeColour(this.colour);

    window.scene.tweens.setGlobalTimeScale(1);
    window.scene.entityManager.matchToTimescale();
  }

  public switchToNormal(): void {
    this.mode = new NormalMode();
    this.colour = Colours.LIGHT_GREEN;
    window.scene.vimboy.changeColour(this.colour);

    window.scene.tweens.setGlobalTimeScale(0.2);
    window.scene.entityManager.matchToTimescale();
  }

  public switchToCommand(): void {
    this.colour = Colours.PINK;
    window.scene.vimboy.changeColour(this.colour);
    window.scene.entityManager.matchToTimescale();
    this.mode = new CommandMode();
  }

  public getCurrentColour = () => this.colour;
}

export default ModeManager;
