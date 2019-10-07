abstract class Mode {
  public name: string;
  public display: string;

  constructor(name: string, display: string) {
      this.name = name;
      this.display = display;
  }

  abstract handle(keyEvent: KeyboardEvent, context: any): void;
}

export default Mode;
