import Action from "./Action";

class MoveLeft implements Action {
  act() {
    window.scene.entityManager.moveEverythingRight();
  }
}

export default MoveLeft;
