import equal from 'fast-deep-equal';
import { GameRoom } from '../../CommunicationLayer/GameRoom';
import { Domino } from '../Domino';
import { Move } from '../Entities/Move';
import { Player } from '../Entities/Player';
import { Game } from '../Game';
import { IStateController, State } from './IStateController';

class PlayTileController implements IStateController {
    private TIME_TO_PLAY = 15_000; // TODO: should go into a config

    private validMoves: Move[];
    private player: Player;

    private timeout: NodeJS.Timeout;

    private onGameMessageListener: (move: Move) => void;

    private game: Game;
    private room: GameRoom;
    private transition: (state: State) => void;

    public constructor(domino: Domino) {
        this.game = domino.game;
        this.room = domino.room;
        this.transition = domino.transition;
    }

    public start(): void {
        this.player = this.game.getCurrentPlayer();
        const name = this.player.name;

        this.validMoves = this.game.currentPlayerValidMoves();

        if (this.validMoves.length === 0 && !this.game.dominoSet.isEmpty()) {
            this.room.sendAll('stuck', { player: name });
            this.transition(State.DrawTile);
        } else if (this.validMoves.length === 0 && this.game.dominoSet.isEmpty()) {
            this.game.blockedPlayerCount += 1;
            this.room.sendAll('blocked', { player: name });

            if (this.game.areAllPlayersBlocked()) {
                this.transition(State.RoundEnd);
            } else {
                this.game.advancePlayer();
                this.transition(State.PlayTile);
            }
        } else if (this.validMoves.length > 0) {
            this.game.blockedPlayerCount = 0;

            this.room.send(
                name,
                'tile_play_request',
                { player: name, moves: this.validMoves },
            );
            this.room.sendAllBut(name, 'tile_play_request', { player: name });

            this.onGameMessageListener = this.onGameMessage.bind(this);
            this.timeout = setTimeout(() => this.playerTimeout(), this.TIME_TO_PLAY);
            this.room.listenToPlayer(name, 'tile_play', this.onGameMessageListener);
        }
    }

    private onGameMessage(move: Move): void {
        console.log('PlayTileController: onGameMessage called with move: ', move);
        // if the move is valid, play it
        if (this.validMoves.some((m) => equal(m, move))) {
            this.room.removeListenerFrom(this.player.name, 'tile_play', this.onGameMessageListener);
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
        this.room.sendAll('tile_play_notification', { player: 'this.player.name', move: 0 });
        this.game.applyMove(move);

        if (this.player.isHandEmpty()) {
            this.transition(State.RoundEnd);
        } else {
            this.game.advancePlayer();
            this.transition(State.PlayTile);
        }
    }

    private playerTimeout(): void {
        console.log('PlayTileController: playerTimeout called');
        this.room.removeListenerFrom(this.player.name, 'tile_play', this.onGameMessageListener);

        // we will play a move for him
        // randomly pick a move
        const move = this.validMoves[Math.floor(Math.random() * this.validMoves.length)];
        this.playMove(move);
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
        this.room.removeListenerFrom(this.player.name, 'tile_play', this.onGameMessageListener);
        clearTimeout(this.timeout);
    }
}

export { PlayTileController };
