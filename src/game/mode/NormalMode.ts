import Mode from "./Mode";
import Binding from "./binding/Binding";
import EnterInsertMode from "./action/EnterInsertMode";
import EnterCommandMode from "./action/EnterCommandMode";
import DeleteLine from "./action/DeleteLine";
import DeleteWord from "./action/DeleteWord";
import MoveUp from "./action/MoveUp";
import MoveDown from "./action/MoveDown";
import MoveToTop from "./action/MoveToTop";
import MoveToBottom from "./action/MoveToBottom";
import JumpBackParagraph from "./action/JumpBackParagraph";
import MoveLeft from "./action/MoveLeft";
import MoveRight from "./action/MoveRight";

class NormalMode extends Mode {
  private static bindings: Binding[] = [
    new Binding("i", [new EnterInsertMode()]),
    new Binding("j", [new MoveDown()]),
    new Binding("k", [new MoveUp()]),
    new Binding("h", [new MoveLeft()]),
    new Binding("l", [new MoveRight()]),
    new Binding("dd", [new DeleteLine()]),
    new Binding("dw", [new DeleteWord()]),
    new Binding("gg", [new MoveToTop()]),
    new Binding("ShiftG", [new MoveToBottom()]),
    new Binding("Shift:", [new EnterCommandMode()]),
    new Binding("Shift{", [new JumpBackParagraph()]),
    new Binding("cw", [new DeleteWord(), new EnterInsertMode()])
  ];

  private input: string = "";

  constructor() {
    super("normal", "");
  }

  handle(keyEvent: KeyboardEvent) {
    if (keyEvent.key === "Escape") {
      this.input = "";
    } else {
      this.input = this.input.concat(keyEvent.key);

      const binding: Binding | undefined = NormalMode.bindings.find(
        binding => this.input === binding.key
      );
      if (binding) {
        binding.actions.forEach(action => action.act());
        this.input = "";
      } else if (
        !NormalMode.bindings.some(binding => binding.key.includes(this.input))
      ) {
        this.input = "";
      }
    }
  }
}

export default NormalMode;
