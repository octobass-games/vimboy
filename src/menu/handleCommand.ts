import { Menu } from "../game/scene/Menu";

const helpString = [
  "To play: vim",
  "To play tutorial: tutorial",
  "",
  "help <term>   search for help on <term>",
  "where <term> is one of: controls, gameplay"
];

const helpControlsString = ["movement:", "    k", "h        l", "    j"];

const instructions = ["how to play:", "TODO"];

const printResponse = (menu: Menu, command: string, response: string[]) => {
  menu.clearHistory();
  menu.addHistory(command);
  response.forEach(r => menu.addHistory(r));
};

const playWords = ["play", "vim", "vi", "vimboy"];
export const handleCommand = (menu: Menu, command: string) => {
  if (playWords.includes(command)) {
    return menu.scene.start("Game");
  }
  menu.addHistory(command);

  switch (command) {
    case "help":
      printResponse(menu, command, helpString);
      break;
    case "tutorial":
      window.tutorialMode = true;
      return menu.scene.start("Game");
    case "help controls":
      printResponse(menu, command, helpControlsString);
      break;
    case "help gameplay":
      printResponse(menu, command, instructions);
      break;
    case "":
      break;
    default:
      menu.addHistory(`command not found: ${command}`);
  }
  menu.moveDownALine();
};
