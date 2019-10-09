import Event from './Event';

interface Observer {
    update(event: Event): void
}

export default Observer;
