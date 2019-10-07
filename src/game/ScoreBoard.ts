import { BOTTOM_BAR_Y, GAME_WIDTH } from "../constants/game";
import { FONT, FONT_SIZE } from "../constants/text";

class ScoreBoard {
  private text?: Phaser.GameObjects.Text;
  private score: number = 0;

  public create() {
    this.text = window.scene.add.text(
      this.getTextXPosition(),
      BOTTOM_BAR_Y,
      this.score.toString(),
      {
        fontFamily: FONT,
        fontSize: FONT_SIZE
      }
    );
  }

  public updateScore = (points: number) => {
    this.score += points;
    this.text!.setText(this.score.toString()).setX(this.getTextXPosition());
  };

  private getTextXPosition = () =>
    GAME_WIDTH - this.score.toString().length * 30;
}

export default ScoreBoard;
