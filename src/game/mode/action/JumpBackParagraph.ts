import Action from './Action';

class JumpBackParagraph implements Action {
    act(): void {
        const vimboy = window.scene.vimboy;
        const enemies = window.scene.entityManager.getEnemiesAboveLine(vimboy.currentLine());
        
        const inlineEnemies = enemies.filter(enemy => {
            const body = enemy.body as Phaser.Physics.Arcade.Body;
            return body.x < 25 && body.x + body.width > 25;
        });
        const lineNumbers = inlineEnemies.map(enemy => enemy.getData("data").line).sort().reverse();

        let idx = 0;
        while (idx < lineNumbers.length) {
            if (lineNumbers[idx] - lineNumbers[idx + 1] === 1) {
                idx++;
            } else {
                break;
            }
        }

        lineNumbers[idx] && vimboy.jumpToLine(lineNumbers[idx]);
    }
}

export default JumpBackParagraph;
