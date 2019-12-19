import {
  generatePresent,
  genericInputUpdater,
  generateEnemy
} from "./tutorialUtils";
import { Step } from "./Tutorial";
import { alphabet } from "../../constants/alphabet";

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
      "Cool! Try and pick up some presents",
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
      "Typing a colon will enter you into command mode."
    ],
    keysToEnable: ["Shift:", "Shift", ":"],
    type: "KeyBind",
    shouldRunNextStep: (keyEvent, input) => keyEvent.key === ":",
    onNonKeyMatch: genericInputUpdater
  },
  {
    text: [
      "Following it with a number will let you jump to that line!",
      "Give it a go! e.g. ':6' and hit enter"
    ],
    keysToEnable: [
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
      "Theres lots of commands so feel free to try different things!",
      "Now lets make use of those presents",
      "They can be either a verb or noun",
      "Combine them to attack enemies by typing the letters on them",
      "Try using the ones you picked up!"
    ],
    type: "Update",
    onUpdate: () => {
      generatePresent();
      generateEnemy();
    },
    shouldRunNextStep: () => window.scene.scoreBoard.score > 0,
    keysToEnable: ["d"]
  },
  {
    text: ["Next up is modes", "You can switch to insert mode by hitting 'i'"],
    keysToEnable: ["i"],
    type: "KeyBind",
    shouldRunNextStep: key => key.key.toLowerCase() === "i",
    extra: () => window.scene.scoreBoard.resetScore()
  },
  {
    text: [
      "Now you're in insert mode",
      "In this mode you can insert characters to attack",
      "try typing things and destroy some letters"
    ],
    onUpdate: () => {
      generateEnemy(window.scene.vimboy.currentLine() - 1);
    },
    keysToEnable: alphabet,
    type: "Update",
    shouldRunNextStep: () => window.scene.scoreBoard.score > 0
  },
  {
    text: ["Nice! Try switching back to normal mode", "by hitting 'escape'"],
    keysToEnable: ["escape"],
    shouldRunNextStep: keyEvent => keyEvent.key.toLowerCase() === "escape",
    type: "KeyBind"
  }
];

export default steps;
