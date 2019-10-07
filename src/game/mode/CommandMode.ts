import Mode from './Mode';
import EnterNormalMode from './action/EnterNormalMode';

class CommandMode extends Mode {
    private static whitelist: string[] = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9'
    ];

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
        } else if (keyEvent.key === 'Backspace' && this.input.length > 0) {
            this.input = this.input.slice(0, this.input.length - 1);
        } else if (keyEvent.key === 'Escape') {
            new EnterNormalMode().act(context);
        } else if (CommandMode.whitelist.includes(keyEvent.key)) {
            this.input = this.input.concat(keyEvent.key);
        }
    }

    public getCommand(): string {
        return this.input;
    }
}

export default CommandMode;
