import { PlayScene } from '../game/scene/PlayScene'

declare global {
    interface Window { scene: PlayScene }
}
