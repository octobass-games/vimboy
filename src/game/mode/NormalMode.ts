import Mode from "./Mode";
import Binding, { BindingType, PickupBinding } from "./binding/Binding";
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
import { Noun, Verb } from "../../constants/verbsAndNouns";

const verbs: string[] = Object.values(Verb);

class NormalMode extends Mode {
  private static bindings: Binding[] = [
    { key: "i", action: new EnterInsertMode(), type: BindingType.NORMAL },
    { key: "j", action: new MoveDown(), type: BindingType.NORMAL },
    { key: "k", action: new MoveUp(), type: BindingType.NORMAL },
    { key: "h", action: new MoveLeft(), type: BindingType.NORMAL },
    { key: "l", action: new MoveRight(), type: BindingType.NORMAL },
    { key: "gg", action: new MoveToTop(), type: BindingType.NORMAL },
    { key: "ShiftG", action: new MoveToBottom(), type: BindingType.NORMAL },
    { key: "Shift:", action: new EnterCommandMode(), type: BindingType.NORMAL },
    {
      key: "Shift{",
      action: new JumpBackParagraph(),
      type: BindingType.NORMAL
    },
    {
      key: "dd",
      action: new DeleteLine(),
      type: BindingType.PICKUP,
      verb: Verb.d,
      noun: Noun.d
    },
    {
      key: "dw",
      action: new DeleteWord(),
      type: BindingType.PICKUP,
      verb: Verb.d,
      noun: Noun.w
    }
  ];

  private input: string = "";

  constructor() {
    super("normal", "");
  }

  handle(keyEvent: KeyboardEvent) {
    if (keyEvent.key === "Escape") {
      this.clear();
    } else {
      this.input = this.input.concat(keyEvent.key);
      const binding = NormalMode.bindings.find(b => this.input === b.key);

      if (binding) {
        this.useBinding(binding);
        this.clear();
      } else if (!NormalMode.bindings.some(b => b.key.includes(this.input))) {
        this.clear();
      } else {
        if (verbs.includes(this.input)) {
          const verb = this.input as Verb;
          window.scene.powerUpManager.setVerbIfAvailable(verb);
        }
      }
    }
  }

  private clear = () => {
    window.scene.powerUpManager.clear();
    this.input = "";
  };

  private useBinding = (binding: Binding) => {
    if (binding.type === BindingType.PICKUP) {
      this.handlePickup(binding);
    } else {
      binding.action.act();
    }
  };

  private handlePickup = (binding: PickupBinding) => {
    window.scene.powerUpManager.setNounIfAvailable(binding.noun);
    if (window.scene.powerUpManager.canUsePowerUp(binding.verb, binding.noun)) {
      window.scene.powerUpManager.use();
      binding.action.act();
    }
  };
}

export default NormalMode;
