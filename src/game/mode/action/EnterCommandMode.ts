import Action from './Action';

class EnterCommandMode implements Action {
    act() {
        window.scene.modeManager.switchToCommand();
    }
}

export default EnterCommandMode;
