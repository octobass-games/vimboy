import Binding from './binding/Binding';

abstract class Mode {
  public name: string;
  public display: string;
  public bindings: Binding[];

  constructor(name: string, display: string, bindings: Binding[]) {
      this.name = name;
      this.display = display;
      this.bindings = bindings;
  }

  abstract handle(keyEvent: KeyboardEvent, context: any): void;
}

export default Mode;
