import Action from "./Action";

class MoveRight implements Action {
  act() {
    window.scene.entityManager.moveEverythingLeft();
  }
}

export default MoveRight;
