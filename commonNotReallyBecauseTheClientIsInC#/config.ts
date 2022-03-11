/* eslint-disable @typescript-eslint/ban-types */
import { GameRoom } from '../CommunicationLayer/GameRoom';

interface GameSettings {
    maxScore: number;
    /**
     * Time in miliseconds
     */
    timeToPlay: number;
}

interface Config {
    room: GameRoom,
    gameSettings: GameSettings,
    endGameCallback: () => void,
}

export { Config, GameSettings };
