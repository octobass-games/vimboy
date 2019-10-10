import Mode from "./Mode";
import EnterNormalMode from "./action/EnterNormalMode";
import createWordAttack from "../entities/nonEnemies/WordAttack";

class InsertMode extends Mode {
  constructor() {
    super("insert", "-- INSERT --");
  }

  handle(keyEvent: KeyboardEvent) {
    if (keyEvent.key === "Escape") {
      new EnterNormalMode().act();
    } else {
      window.scene.entityManager.createNonEnemy(() =>
        createWordAttack(keyEvent.key)
      );
      window.scene.vimboy.playWordAttack();
    }
  }
}

export default InsertMode;
