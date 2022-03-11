import { Domino } from '../Domino';
import { IStateController, State } from './IStateController';
// The End
// ------------
// Normally play stops when one player "chips out" (plays his last domino) although some versions require both partners to chip out. If it reaches a point at which no player can proceed, the winners are the partners whose combined sum of all spots on their remaining dominoes is the least.
// ------------
// For scoring, some pubs would play a point per game. A more interesting method, that might be scored using a cribbage board, has the winners score the sum of all spots on the losers remaining tiles. In a game which doesn't result in anyone chipping out, the winners would receive the difference between the winners total spots and the losers total spots. A game can be played to 100 points, say, or on a cribbage board, 121 points.

class RoundEndController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.domino.game.state = State.RoundEnd;
        // TODO:
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

        // Example
        const minScore = Math.min(...sumOfTilesInHand); // sum of pips in hand are [4,5,6,7]
        const index = sumOfTilesInHand.indexOf(minScore); // min index is 0
        const winner = this.domino.game.players[index]; // winner is pesho
        const score = sumOfTilesInHand.reduce((a, b) => a + b, -minScore * 2); // (-8) + 4 + 5 + 6 + 7 = 14

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
        //
    }
}

export { RoundEndController };

