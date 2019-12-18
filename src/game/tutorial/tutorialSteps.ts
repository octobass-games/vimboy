import { generatePresent, genericInputUpdater } from "./tutorialUtils";
import { Step } from "./Tutorial";

const steps: Step[] = [
  {
    text: ["Hey there!", "Try hitting 'k' to move up a line!"],
    keysToEnable: ["k"],
    shouldRunNextStep: keyEvent => keyEvent.key.toLowerCase() === "k",
    type: "KeyBind"
  },
  {
    text: ["Nice! Now try j to move down"],
    keysToEnable: ["j"],
    shouldRunNextStep: keyEvent => keyEvent.key.toLowerCase() === "j",
    type: "KeyBind"
  },
  {
    text: [
      "Cool! try moving around a bit and see if you can pick up some presents",
      "You can also use 'h' and 'l' to move left and right"
    ],
    keysToEnable: ["h", "l"],
    type: "Update",
    onUpdate: () => generatePresent(),
    shouldRunNextStep: () =>
      window.scene.powerUpManager.hasNouns() &&
      window.scene.powerUpManager.hasVerbs()
  },
  {
    text: [
      "Next up is commands!",
      "Typing a colon will enter you into command mode",
      "Following it with a number will let you jump to that line!"
    ],
    keysToEnable: [
      "Shift:",
      "Shift",
      ":",
      "Enter",
      ...Array.from(Array(10).keys()).map(v => v.toString())
    ],
    type: "KeyBind",
    shouldRunNextStep: (keyEvent, input) =>
      keyEvent.key.toLowerCase() === "enter" && input.match(/:[0-9]+/) !== null,
    onNonKeyMatch: genericInputUpdater
  },
  {
    text: [
      "Theres all sorts of commands so feel free to try whatever you can think of!"
    ],
    type: "Update",
    onUpdate: () => {},
    shouldRunNextStep: () => false,
    keysToEnable: []
  }
];

export default steps;
