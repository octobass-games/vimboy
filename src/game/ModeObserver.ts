import Mode from './mode/Mode';

interface ModeObserver {
    updateMode(mode: Mode): void
}

export default ModeObserver;
