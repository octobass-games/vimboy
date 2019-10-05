import { Mode } from "./ModeManager";
import { PLAY_ZONE_HEIGHT } from "../constants/game";
import { isKeyPressed } from "./KeyHelper";

class WordAttack {
  private keys?: object

  public create = () => {
      this.keys = window.scene.input.keyboard.addKeys('Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,Z,X,C,V,B,N,M');
  }

  public update = (x: number, y: number) => {
    
      if (window.scene.modeManager.mode === Mode.INSERT){

        Object.entries(this.keys!).forEach( ([letter, keyObject]) => {
            if(isKeyPressed(keyObject)){
                window.scene.textCreator.add(x, y, letter, PLAY_ZONE_HEIGHT / y, 100 )
            }

        })
      }
  }
  
} 

export default WordAttack;
