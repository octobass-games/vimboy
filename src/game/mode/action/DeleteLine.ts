import Action from "./Action";
import { PowerUp } from "../../PowerUpManager";
import { playTextFlash } from "../../utils/animationPlayer";

class DeleteLine implements Action {
  act() {
    window.scene.powerUpManager.usePowerUp(PowerUp.DELETE_LINE, () =>
      console.log("delete line")
    );
  }
}

export default DeleteLine;
