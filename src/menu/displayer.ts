import { CELL_SIZE } from "../constants/game";
import { PADDING } from "./constants";
import { GameObjects } from "phaser";

export const cursorX = (text: GameObjects.Text) => text.x + text.width + 3;
export const preambleX = (x: number) => x + CELL_SIZE;
export const historyX = CELL_SIZE + PADDING;
