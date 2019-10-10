import Action from './Action';
import Enemy from '../../entities/Entity';

class JumpBackParagraph implements Action {
    act(): void {
        const { scene: { entityManager, vimboy } } = window;

        const isAboveVimboy = (enemy: any) => (enemy.getData("data") as Enemy).line < vimboy.currentLine();
        const isOverlappingVimboy = (enemy: any) => {
            const body = enemy.body as Phaser.Physics.Arcade.Body;
            return body.x < 25 && body.x + body.width > 25;
        };

        const jumpableLines = entityManager
            .getEnemies()
            .filter(isAboveVimboy)
            .filter(isOverlappingVimboy)
            .map(enemy => (enemy.getData("data") as Enemy).line)
            .sort()
            .reverse();

        let idx = 0;
        while (idx < jumpableLines.length) {
            if (jumpableLines[idx] - jumpableLines[idx + 1] === 1) {
                idx++;
            } else {
                break;
            }
        }

        jumpableLines[idx] && vimboy.jumpToLine(jumpableLines[idx]);
    }
}

export default JumpBackParagraph;
