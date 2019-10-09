import Observer from './Observer';

interface Observable {
    register(observer: Observer): void
    notify(): void
}

export default Observable;
