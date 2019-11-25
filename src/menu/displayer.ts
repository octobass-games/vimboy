import { CELL_SIZE } from "../constants/game";
import { PADDING } from "./constants";

export const cursorX = (x: number) => x + 30 + CELL_SIZE;
export const preambleX = (x: number) => x + CELL_SIZE;
export const historyX = CELL_SIZE + PADDING;
