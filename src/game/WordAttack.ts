import { PlayScene } from "./PlayScene";
import { Mode } from "./ModeManager";
import { GAME_HEIGHT, PLAY_ZONE_HEIGHT } from "../constants/constants";

class WordAttack {
  private scene: PlayScene;
  private keys?: object

  constructor(scene: PlayScene) {
    this.scene = scene;
  }

  public create = () => {
      this.keys = this.scene.input.keyboard.addKeys('Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,Z,X,C,V,B,N,M');
  }

  public update = (x: number, y: number) => {
    
      if (this.scene.modeManager.mode === Mode.INSERT){

        Object.entries(this.keys!).forEach( ([letter, keyObject]) => {
            if(this.scene.keyHelper.isKeyPressed(keyObject)){
                console.log('asdasdasd')
                console.log(letter)
                this.scene.textCreator.add(x, y, letter, PLAY_ZONE_HEIGHT / y, 100 )
            }

        })
      }
  }
  
} 

export default WordAttack;
