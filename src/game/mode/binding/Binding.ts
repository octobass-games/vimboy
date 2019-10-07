import Action from '../action/Action';

class Binding {
    public key: string;
    public action: Action;

    constructor(key: string, action: Action) {
        this.key = key;
        this.action = action;
    }
}

export default Binding;
