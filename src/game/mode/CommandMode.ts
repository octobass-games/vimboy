import Mode from './Mode';
import EnterNormalMode from './action/EnterNormalMode';

class CommandMode extends Mode {
    private input: string = '';

    constructor() {
        super('command', '--- COMMAND ---', []);
    }

    handle(keyEvent: KeyboardEvent, context: any) {
        if (keyEvent.key === 'Enter') {
            const lineNumber = parseInt(this.input);

            if (!isNaN(lineNumber)) {
                context.vimboy.jumpToLine(lineNumber);
            } else {
                console.log('command not found');
            }

            new EnterNormalMode().act(context);
        } else {
            this.input = this.input.concat(keyEvent.key);
        }
    }
}

export default CommandMode;
