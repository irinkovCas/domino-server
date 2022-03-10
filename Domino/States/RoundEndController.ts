import { Domino } from '../Domino';
import { IStateController, State } from './IStateController';

class RoundEndController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.domino.game.state = State.RoundEnd;
        // There is case where no one is empty
        // But there is more than 1 player with with the lowerst score
        // Example:
        // p1 hand [(2,5)], score: 7
        // p2 hand [(3,4)], score: 7
        // p3 hand [(3,5)], score: 8
        // p4 hand [(4,4)], score: 8
        // Stock is empty and the line ends with pips (1,6)
        // Who wins in this case? Answer me if it's a free for all and a team game.

        const sumOfTilesInHand: number[] = this.domino.game.players.map((p) => {
            // p.tiles
            //     .map((t) => t.firstPip + t.secondPip)
            //     .reduce((a, b) => a + b, 0),

            let sum = 0;
            for (const tile of p.tiles) {
                sum += tile.firstPip + tile.secondPip;
            }
            return sum;
        });

        const minScore = Math.min(...sumOfTilesInHand);
        const index = sumOfTilesInHand.indexOf(minScore);
        const winner = this.domino.game.players[index];
        const score = sumOfTilesInHand.reduce((a, b) => a + b, 0);

        winner.score += score;

        const players = this.domino.game.players;

        this.domino.room.sendAll('round_end', { winner: winner.name, players });

        if (this.domino.game.isGameEnded()) {
            this.domino.transition(State.GameEnd);
        } else {
            this.domino.transition(State.StartRound);
        }
    }

    public destroy(): void {
        throw new Error('Method not implemented.');
    }
}

export { RoundEndController };

