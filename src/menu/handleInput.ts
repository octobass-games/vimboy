import { Menu } from "../game/scene/Menu";
import { FONT_SIZE } from "../constants/text";
import { CELL_SIZE, GAME_HEIGHT, GAME_WIDTH } from "../constants/game";
import { cursorX, historyX } from "./displayer";
import { handleCommand } from "./handleCommand";

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
      menu.currentLine = menu.currentLine.slice(
        0,
        GAME_WIDTH / (FONT_SIZE / 2)
      );
      menu.lineText!.setText(menu.currentLine);
  }

  menu.lineText!.setText(menu.currentLine);
  menu.cursor!.setX(cursorX(menu.lineText!));
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

const handleDelete = (menu: Menu) => {
  if (menu.currentLine.length > 0) {
    menu.currentLine = menu.currentLine.slice(0, menu.currentLine.length - 1);
  }
};

const handleEnter = (menu: Menu) => {
  if (menu.history.length >= GAME_HEIGHT / CELL_SIZE - 4) {
    menu.clearHistory();
  }
  handleCommand(menu, menu.currentLine.toLowerCase());
};
