import { GameRoom } from '../CommunicationLayer/GameRoom';

interface GameSettings {
    maxScore: number;
}

interface Config {
    room: GameRoom,
    gameSettings: GameSettings,
    endGameCallback: () => void,
}

export { Config, GameSettings };
