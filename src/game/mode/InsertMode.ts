import Mode from "./Mode";
import EnterNormalMode from "./action/EnterNormalMode";
import { PLAY_ZONE_HEIGHT, CELL_SIZE } from "../../constants/game";
import { TextTypes } from "../TextCreator";

class InsertMode extends Mode {
  constructor() {
    super("insert", "-- INSERT --");
  }

  handle(keyEvent: KeyboardEvent) {
    if (keyEvent.key === "Escape") {
      new EnterNormalMode().act();
    } else {
      window.scene.textCreator.add(
        window.scene.vimboy.vimboy!.x,
        window.scene.vimboy.vimboy!.y - CELL_SIZE / 2,
        keyEvent.key,
        PLAY_ZONE_HEIGHT / (window.scene.vimboy.vimboy!.y - CELL_SIZE / 2),
        100,
        TextTypes.ATTACK
      );
      window.scene.vimboy.playWordAttack();
    }
  }
}

export default InsertMode;
