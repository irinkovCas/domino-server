import { Domino } from '../Domino';
import { IStateController } from './IStateController';

class GameEndController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        // this.timer = new Timer(this.server.gameInfo.configuration.timers.passing, this.onMoveTimeout.bind(this), false);
        this.domino.room.sendAll('game_end', {});
        this.domino.endResolve();
    }

    public destroy(): void {
        //
    }
}


export { GameEndController };
