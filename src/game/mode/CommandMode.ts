import Mode from "./Mode";
import EnterNormalMode from "./action/EnterNormalMode";

class CommandMode extends Mode {
  private static whitelist: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];

  private input: string = "";

  constructor() {
    super("command", "");
  }

  handle(keyEvent: KeyboardEvent) {
    const key = keyEvent.key.toLowerCase();
    if (key === "enter") {
      const lineNumber = parseInt(this.input);

      if (!isNaN(lineNumber)) {
        window.scene.vimboy.jumpToLine(lineNumber);
        new EnterNormalMode().act();
      } else {
        this.handleStringCommands(this.input);
      }
    } else if (key === "backspace" && this.input.length > 0) {
      this.input = this.input.slice(0, this.input.length - 1);
    } else if (key === "escape") {
      new EnterNormalMode().act();
    } else if (CommandMode.whitelist.includes(key)) {
      this.input = this.input.concat(key);
    }
  }

  public getCommand(): string {
    return this.input;
  }

  private handleStringCommands = (str: string) => {
    switch (str.toLowerCase()) {
      case "q":
        window.scene.sound.stopAll();
        window.scene.scene.start("Menu");

        return;
      default:
        console.log("command not found");
    }
    new EnterNormalMode().act();
  };
}

export default CommandMode;
