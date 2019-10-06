import Mode from './Mode';
import Binding from './binding/Binding';
import EnterInsertMode from './action/EnterInsertMode';
import DeleteLine from './action/DeleteLine';

class NormalMode extends Mode {
    private static bindings: Binding[] = [
        new Binding('i', new EnterInsertMode()),
        new Binding('dd', new DeleteLine()),
    ];

    private timerStarted: boolean = false;
    private input: string = '';
    private context: any;

    constructor() {
        super('normal', '--- NORMAL ---', NormalMode.bindings);
    }

    handle(keyEvent: KeyboardEvent, context: any) {
        this.input = this.input.concat(keyEvent.key);
        this.context = context;

        if (!this.timerStarted) {
            this.timerStarted = true;

            setTimeout(() => {
                const binding: Binding | undefined = this.bindings.find(binding => this.input === binding.key);

                binding && binding.action.act(this.context);

                this.input = '';
                this.timerStarted = false;
            }, 250);
        }
    }
}

export default NormalMode;
