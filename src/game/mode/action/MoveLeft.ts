import Action from "./Action";

class MoveLeft implements Action {
  act() {
    console.log("move left");
    window.scene.entityManager.moveEverythingRight();
  }
}

export default MoveLeft;
