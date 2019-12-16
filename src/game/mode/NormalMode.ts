import Mode from "./Mode";
import Binding, { BindingType, PickupBinding } from "./binding/Binding";
import { Verb } from "../../constants/verbsAndNouns";
import { Sound } from "../loaders/SoundLoader";
import normalModeBindings from "./binding/normalModeBindings";

const verbs: string[] = Object.values(Verb);

class NormalMode extends Mode {
  private input: string = "";

  constructor() {
    super("normal", "");
  }

  handle(keyEvent: KeyboardEvent) {
    const key = keyEvent.key.toLowerCase();
    if (key === "escape") {
      this.clear();
    } else {
      this.input = this.input.concat(key);
      const binding = normalModeBindings.find(
        b => this.input === b.key.toLowerCase()
      );

      if (binding) {
        this.useBinding(binding);
      } else if (
        !normalModeBindings.some(b => b.key.toLowerCase().includes(this.input))
      ) {
        this.clear();
      } else {
        if (verbs.includes(this.input)) {
          const verb = this.input as Verb;
          this.powerUpManager().setVerbIfAvailable(verb);
        }
      }
    }
  }

  private clear = () => {
    this.powerUpManager().clear();
    this.input = "";
  };

  private useBinding = (binding: Binding) => {
    if (binding.type === BindingType.PICKUP) {
      this.handlePickup(binding);
    } else {
      binding.action.act();
      this.clear();
    }
  };

  private handlePickup = (binding: PickupBinding) => {
    if (this.powerUpManager().hasVerb()) {
      this.powerUpManager().setNounIfAvailable(binding.noun);
      if (this.powerUpManager().canUsePowerUp(binding.verb, binding.noun)) {
        this.powerUpManager().use(binding.name);
        window.scene.sound.play(Sound.GOOD);
        binding.action.act();
        this.clear();
        return;
      }
    }

    this.powerUpManager().unusedClear();
    this.input = "";
  };

  private powerUpManager = () => window.scene.powerUpManager;
}

export default NormalMode;
