import Action from "./Action";
import { PowerUp } from "../../PowerUpManager";

class DeleteLine implements Action {
  act() {
    window.scene.powerUpManager.usePowerUp(PowerUp.DELETE_LINE, () =>
      console.log("deleting line")
    );
  }
}

export default DeleteLine;
