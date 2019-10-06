import Mode from './Mode';
import Binding from './binding/Binding';
import EnterInsertMode from './action/EnterInsertMode';
import DeleteLine from './action/DeleteLine';

class NormalMode extends Mode {
    private static bindings: Binding[] = [
        new Binding('i', new EnterInsertMode()),
        new Binding('dd', new DeleteLine()),
    ];

    private input: string = '';

    constructor() {
        super('normal', '--- NORMAL ---', NormalMode.bindings);
    }

    handle(keyEvent: KeyboardEvent, context: any) {
        if (keyEvent.key === 'Escape') {
            this.input = '';
        } else {
            this.input = this.input.concat(keyEvent.key);
            
            const binding: Binding | undefined = this.bindings.find(binding => this.input === binding.key);
            if (binding) {
                binding.action.act(context);
                this.input = '';
            }
        }
    }
}

export default NormalMode;
