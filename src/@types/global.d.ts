import PlayScene from '../game/PlayScene'

declare global {
    interface Window { scene: PlayScene }
}