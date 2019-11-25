import { Menu } from "../game/scene/Menu";
import { play } from "../game/Game";
import { FONT, FONT_SIZE } from "../constants/text";
import { CELL_SIZE } from "../constants/game";
import { cursorX, historyX } from "./displayer";

export const handleInput = (menu: Menu) => (keyEvent: KeyboardEvent) => {
  switch (keyEvent.key) {
    case "Enter":
      handleEnter(menu);
      break;
    case "Backspace":
      handleDelete(menu);
      break;
    case "ArrowUp":
      handleHistoryLoop(menu, 1, 0);
      break;
    case "ArrowDown":
      handleHistoryLoop(menu, -1, menu.history.length - 1);
      break;
    default:
      menu.currentLine += keyEvent.key;
      menu.lineText!.setText(menu.currentLine);
  }

  menu.lineText!.setText(menu.currentLine);
  menu.cursor!.setX(cursorX(menu.currentLine.length * 17));
};

const handleHistoryLoop = (
  menu: Menu,
  modifier: number,
  initialiser: number
) => {
  const history = [...menu.history].reverse();
  const entry = history[menu.historyPosition];
  if (entry === undefined) {
    if (menu.historyPosition !== 0) {
      menu.historyPosition = initialiser;
      menu.currentLine = history[initialiser] || "";
    }
  } else {
    menu.currentLine = entry;
    if (menu.historyPosition + modifier === -1) {
      menu.historyPosition = history.length - 1;
    } else {
      menu.historyPosition += modifier;
    }
  }
};

const playWords = ["play", "vim", "vi"];
const handleCommand = (menu: Menu, command: string) => {
  if (playWords.includes(command.toLowerCase())) {
    play();
  }
};

const handleDelete = (menu: Menu) => {
  if (menu.currentLine.length > 0) {
    menu.currentLine = menu.currentLine.slice(0, menu.currentLine.length - 1);
  }
};

const handleEnter = (menu: Menu) => {
  const y = menu.historyObj!.getChildren().length + 1;

  handleCommand(menu, menu.currentLine);

  menu.history.push(menu.currentLine);
  menu.historyObj!.add(
    menu.add.text(historyX, (y - 1) * FONT_SIZE, menu.currentLine, {
      fontFamily: FONT,
      fontSize: FONT_SIZE
    })
  );
  menu.currentLine = "";
  menu.lineText!.setY((y + 1) * FONT_SIZE);
  menu.cursor!.setY((y + 1) * FONT_SIZE + CELL_SIZE / 2);
  menu.preamble!.setY((y + 1) * FONT_SIZE);
  menu.header!.setY(y * FONT_SIZE);
  menu.historyPosition = 0;
};
