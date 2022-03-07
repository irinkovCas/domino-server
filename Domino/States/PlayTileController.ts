import equal from 'fast-deep-equal';
import { Domino } from '../Domino';
import { Move } from '../Entities/Move';
import { Player } from '../Entities/Player';
import { GameEvent } from '../Events';
import { IStateController, State } from './IStateController';

class PlayTileController implements IStateController {
    private TIME_TO_PLAY = 15_000;

    private validMoves: Move[];
    private player: Player;

    private timeout: NodeJS.Timeout;

    private domino: Domino;
    private onGameMessageListener: (move: Move) => void;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.player = this.domino.game.getCurrentPlayer();
        const name = this.player.name;

        this.validMoves = this.domino.game.currentPlayerValidMoves();

        if (this.validMoves.length === 0 && !this.domino.game.dominoSet.isEmpty()) {
            this.domino.room.sendAll(GameEvent.Stuck, { player: name });
            this.domino.transition(State.DrawTile);
        } else if (this.validMoves.length === 0 && this.domino.game.dominoSet.isEmpty()) {
            this.domino.game.blockedPlayerCount += 1;
            this.domino.room.sendAll(GameEvent.PLAYER_BLOCKED_NOTIFICATION, { player: name });

            if (this.domino.game.areAllPlayersBlocked()) {
                this.domino.transition(State.EndRound);
            } else {
                this.domino.game.nextPlayer();
                this.domino.transition(State.PlayTile);
            }
        } else if (this.validMoves.length > 1) {
            this.domino.game.blockedPlayerCount = 0;

            this.domino.room.send(name, GameEvent.TILE_PLAY_REQUEST, { player: name, moves: this.validMoves });
            this.domino.room.sendAllBut(name, GameEvent.TILE_PLAY_REQUEST, { player: name });

            this.onGameMessageListener = this.onGameMessage.bind(this);
            this.domino.room.listenToPlayerOnce(name, 'play_move', this.onGameMessageListener);

            this.timeout = setTimeout(() => this.playerTimeout(), this.TIME_TO_PLAY);
        }
    }

    private onGameMessage(move: Move): void {
        console.log('PlayTileController: onGameMessage called with move: ', move);
        // if the move is valid, play it
        if (this.validMoves.some((m) => equal(m, move))) {
            console.log(`PlayTileController: onGameMessage: move(${move}) is valid`);
            clearTimeout(this.timeout);
            this.playMove(move);
        } else {
            console.log(`PlayTileController: onGameMessage: move(${move}) is invalid`);
            this.domino.room.listenToPlayerOnce(this.player.name, 'play_move', this.onGameMessageListener);
        }
    }

    private playerTimeout(): void {
        console.log('PlayTileController: playerTimeout called');
        this.domino.room.removeListenerFrom(this.player.name, 'play_move', this.onGameMessageListener);

        // we will play a move for him
        // randomly pick a move
        const move = this.validMoves[Math.floor(Math.random() * this.validMoves.length)];
        this.playMove(move);
    }

    private playMove(move: Move): void {
        // There is a chance that the player played a move but the time ran out on the server and he must be notified that the move he played didn't count
        // this case must be handled in the client!
        this.domino.room.sendAll(GameEvent.TILE_PLAY_NOTIFICATION, { player: this.player.name, move });
        this.domino.game.applyMove(move);

        if (this.player.isEmpty()) {
            this.domino.transition(State.EndRound);
        } else {
            this.domino.game.nextPlayer();
            this.domino.transition(State.PlayTile);
        }
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
    }
}

export { PlayTileController };
