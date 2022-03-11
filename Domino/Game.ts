import { GameSettings } from '../commonNotReallyBecauseTheClientIsInC#/config';
import { DominoSet } from './Entities/DominoSet';
import { Line } from './Entities/Line';
import { Direction, Move } from './Entities/Move';
import { Player } from './Entities/Player';
import { Tile, validMovesForTile } from './Entities/Tile';
import { State } from './States/IStateController';

class Game {
    private readonly startingHandSize = 7;

    public settings: GameSettings;

    public readonly players: Player[];
    public currentPlayerIndex: number;
    public line: Line;
    public dominoSet: DominoSet;

    public state: State;

    public blockedPlayerCount = 0;
    public currentRound = 0;

    public constructor(playerNames: string[], settings: GameSettings) {
        this.settings = settings;

        this.players = playerNames.map((name) => new Player(name, []));
        this.currentPlayerIndex = Math.floor(Math.random() * this.players.length);

        this.line = new Line();

        this.dominoSet = new DominoSet();
        this.dominoSet.shuffle();
    }

    public deal(): void {
        this.players.forEach((player) => {
            player.tiles.push(...this.dominoSet.drawN(this.startingHandSize));
        });
    }

    /**
     * Only if the players are blocked consecutively
     */
    public areAllPlayersBlocked(): boolean {
        return this.blockedPlayerCount === this.players.length;
    }

    public getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    public applyMove(move: Move): void {
        this.getCurrentPlayer().removeTile(move.tile);

        if (move.where === Direction.Left) {
            this.line.addLeft(move.tile);
        } else {
            this.line.addRight(move.tile);
        }
    }

    public currentPlayerValidMoves(): Move[] {
        return this.getCurrentPlayer().validMoves(this.line.getEndingPips());
    }

    /**
     * Moves current player to the next player
     */
    public advancePlayer(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    /**
     * Draws a tile from the domino set until the tile is playable or the domino set is empty
     * @return the drawn tiles
     */
    public drawUntilPlayable(): Tile[] {
        // There should always be a tile on the line before needing to draw
        const endingPips = this.line.getEndingPips();

        const tilesDrawn: Tile[] = [];

        while (!this.dominoSet.isEmpty()) {
            const tile = this.dominoSet.draw()!;
            tilesDrawn.push(tile);

            if (validMovesForTile(tile, endingPips).length > 0) {
                break;
            }
        }

        return tilesDrawn;
    }

    public isGameEnded(): boolean {
        return this.players.some((player) => player.score >= this.settings.maxScore);
    }

    public reset(): void {
        this.line = new Line();
        // this.dominoSet.reset();
        this.players.forEach((player) => {
            player.tiles.length = 0;
        });
    }
}

export { Game };
