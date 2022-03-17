import { Domino } from '../Domino';
import { IStateController, State } from './IStateController';


class GameStartController implements IStateController {
    private domino: Domino;
    private timer: NodeJS.Timeout;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        const players: string[] = this.domino.game.players.map((p) => p.name);
        this.domino.room.sendAll('game_start', { players });

        this.timer = setTimeout(() => {
            this.domino.transition(State.RoundStart);
        }, 1_000);
    }

    public destroy(): void {
        clearTimeout(this.timer);
    }
}


export { GameStartController };
