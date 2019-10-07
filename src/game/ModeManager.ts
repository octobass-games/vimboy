import Mode from './mode/Mode';
import NormalMode from './mode/NormalMode';
import InsertMode from './mode/InsertMode';
import CommandMode from './mode/CommandMode';
import VimBoy from './VimBoy';
import ModeObserver from './ModeObserver';

class ModeManager {
  public mode: Mode;

  private observers: ModeObserver[] = [];

  constructor() {
      this.mode = new NormalMode();
  }

  public create(vimboy: VimBoy) {
    window.scene.keyCapturer!.addListener(
      "keydown",
      (keyEvent: KeyboardEvent) => this.mode.handle(keyEvent, { modeManager: this, vimboy, key: keyEvent.key })
    );
  }

  public update() {}

  public register(observer: ModeObserver) {
      this.observers = this.observers.concat(observer);
  }

  public notify(): void {
      this.observers.forEach(observer => observer.updateMode(this.mode));
  }

  public setMode = (mode: Mode) => {
    this.mode = mode;
  };

  public switchToInsert(): void {
      this.mode = new InsertMode();
      this.notify();
  }

  public switchToNormal(): void {
      this.mode = new NormalMode();
      this.notify();
  }

  public switchToCommand(): void {
      this.mode = new CommandMode();
      this.notify();
  }
}

export default ModeManager;
