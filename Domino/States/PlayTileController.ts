import equal from 'fast-deep-equal';
import { Domino } from '../Domino';
import { Move } from '../Entities/Move';
import { Player } from '../Entities/Player';
import { IStateController, State } from './IStateController';

class PlayTileController implements IStateController {
    private timeToPlay: number;

    private validMoves: Move[];
    private player: Player;

    private timeout: NodeJS.Timeout;

    private onGameMessageListener: (move: Move) => void;

    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
        this.timeToPlay = domino.game.settings.timeToPlay;
    }

    public start(): void {
        this.player = this.domino.game.getCurrentPlayer();
        const name = this.player.name;

        this.validMoves = this.domino.game.currentPlayerValidMoves();

        if (this.validMoves.length === 0 && !this.domino.game.dominoSet.isEmpty()) {
            this.domino.room.sendAll('stuck', { player: name });
            this.domino.transition(State.DrawTile);
        } else if (this.validMoves.length === 0 && this.domino.game.dominoSet.isEmpty()) {
            this.domino.game.blockedPlayerCount += 1;
            this.domino.room.sendAll('blocked', { player: name });

            if (this.domino.game.areAllPlayersBlocked()) {
                this.domino.transition(State.RoundEnd);
            } else {
                this.domino.game.advancePlayer();
                this.domino.transition(State.PlayTile);
            }
        } else if (this.validMoves.length > 0) {
            this.domino.game.blockedPlayerCount = 0;

            this.domino.room.send(
                name,
                'tile_play_request',
                { player: name, moves: this.validMoves },
            );
            this.domino.room.sendAllBut(name, 'tile_play_request', { player: name, moves: [] });

            this.onGameMessageListener = this.onGameMessage.bind(this);
            this.timeout = setTimeout(() => this.playerTimeout(), this.timeToPlay);
            this.domino.room.listenToPlayer(name, 'tile_play', this.onGameMessageListener);
        }
    }

    private onGameMessage(move: Move): void {
        console.log('PlayTileController: onGameMessage called with move: ', move);
        // if the move is valid, play it
        if (this.validMoves.some((m) => equal(m, move))) {
            this.domino.room.removeListenerFrom(this.player.name, 'tile_play', this.onGameMessageListener);
            console.log(`PlayTileController: onGameMessage: move(${move}) is valid`);
            clearTimeout(this.timeout);
            this.playMove(move);
        } else {
            console.log(`PlayTileController: onGameMessage: move(${move}) is invalid`);
        }
    }

    private playMove(move: Move): void {
        // There is a chance that the player played a move but the time ran out on the server and he must be notified that the move he played didn't count
        // this case must be handled in the client!
        this.domino.room.sendAll('tile_play_notification', { player: this.player.name, move });
        this.domino.game.applyMove(move);

        if (this.player.isHandEmpty()) {
            this.domino.transition(State.RoundEnd);
        } else {
            this.domino.game.advancePlayer();
            this.domino.transition(State.PlayTile);
        }
    }

    private playerTimeout(): void {
        console.log('PlayTileController: playerTimeout called');
        this.domino.room.removeListenerFrom(this.player.name, 'tile_play', this.onGameMessageListener);

        // we will play a move for him
        // randomly pick a move
        const move = this.validMoves[Math.floor(Math.random() * this.validMoves.length)];
        this.playMove(move);
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
        if (this.onGameMessageListener !== undefined) {
            this.domino.room.removeListenerFrom(this.player.name, 'tile_play', this.onGameMessageListener);
        }
        if (this.timeout !== undefined) {
            clearTimeout(this.timeout);
        }
    }
}

export { PlayTileController };
