import Action from '../action/Action';

class Binding {
    public key: string;
    public actions: Action[];

    constructor(key: string, actions: Action[]) {
        this.key = key;
        this.actions = actions;
    }
}

export default Binding;
