import Action from './Action';

class EnterNormalMode implements Action {
    act() {
        window.scene.modeManager.switchToNormal();
    }
}

export default EnterNormalMode;
