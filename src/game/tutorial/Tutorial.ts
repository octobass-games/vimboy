import { printWord } from "./tutorialUtils";
import steps from "./tutorialSteps";

class Tutorial {
  private index: number = 0;
  private input: string = "";
  constructor(private endTutorial: () => void) {}

  public start() {
    window.scene.entityManager.pauseRandomGeneration();
    this.runNext();
  }

  public update() {
    this.funToRun();
  }

  private funToRun = () => {};

  private runNext = (previousBoundFn?: (keyEvent: KeyboardEvent) => void) => {
    if (previousBoundFn) {
      window.scene.keyCapturer!.removeListener("keydown", previousBoundFn);
    }
    this.funToRun = () => {};

    const step = steps[this.index];
    const { text, keysToEnable, extra } = step;
    this.printText(text);

    keysToEnable.forEach(k => {
      window.scene.modeManager.allow(k);
    });

    if (step.type === "KeyBind") {
      this.handleKeybind(step);
    }

    if (step.type === "Update") {
      this.funToRun = () => {
        step.onUpdate();
        if (step.shouldRunNextStep()) {
          this.nextOrEnd();
        }
      };
    }

    if (extra) {
      extra();
    }
  };

  private updateInput = (str: string) => {
    this.input = str;
  };

  private handleKeybind = ({
    shouldRunNextStep,
    onNonKeyMatch
  }: KeyBindStep) => {
    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (shouldRunNextStep && shouldRunNextStep(keyEvent, this.input)) {
        this.nextOrEnd(onKeyDown);
      } else if (onNonKeyMatch) {
        onNonKeyMatch(keyEvent, this.input, this.updateInput);
      }
    };
    window.scene.keyCapturer!.addListener("keydown", onKeyDown);
  };

  private nextOrEnd = (previousBoundFn?: (keyEvent: KeyboardEvent) => void) => {
    window.scene.entityManager.destroyAll();
    if (this.index !== steps.length - 1) {
      this.index++;
      this.runNext(previousBoundFn);
    } else {
      this.endTutorial();
    }
  };

  private printText = (text: string[]) => {
    text.forEach((text, index) => {
      window.scene.time.addEvent({
        delay: index * 1000,
        callback: () => {
          printWord([text], index);
        }
      });
    });
  };
}

interface BaseStep {
  keysToEnable: string[];
  text: string[];
  extra?: () => void;
}

interface KeyBindStep extends BaseStep {
  shouldRunNextStep: (keyEvent: KeyboardEvent, input: string) => boolean;
  type: "KeyBind";
  onNonKeyMatch?: (
    keyEvent: KeyboardEvent,
    update: string,
    updateInput: (newInput: string) => void
  ) => void;
}

interface UpdateStep extends BaseStep {
  shouldRunNextStep: () => boolean;
  onUpdate: () => void;
  type: "Update";
}

export type Step = KeyBindStep | UpdateStep;

export default Tutorial;
