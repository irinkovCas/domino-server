import { Domino } from '../Domino';
import { IStateController, State } from './IStateController';


class GameStartController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        const players: string[] = this.domino.game.players.map((p) => p.name);
        this.domino.room.sendAll('game_init', { players });

        this.domino.transition(State.StartRound);
    }

    public destroy(): void {
        //
    }
}


export { GameStartController };
