import { assert } from 'console';
import { DominoSet } from './Entities/DominoSet';
import { Line } from './Entities/Line';
import { Direction, Move } from './Entities/Move';
import { Player } from './Entities/Player';
import { Tile, validMovesForTile } from './Entities/Tile';

class Game {
    /**
     * Only if the players are blocked consecutively
     */
    public areAllPlayersBlocked(): boolean {
        return this.blockedPlayerCount === this.players.length;
    }

    public blockedPlayerCount = 0;

    private readonly startingHandSize = 7;

    /* private */ public readonly players: Player[];
    private currentPlayerIndex: number;
    /* private */ public readonly line: Line;
    /* private */ public readonly dominoSet: DominoSet;

    public constructor(playerNames: string[]) {
        this.dominoSet = new DominoSet();
        this.dominoSet.shuffle();

        this.players = playerNames.map((name) => new Player(name, []));
        this.currentPlayerIndex = Math.floor(Math.random() * this.players.length);
        this.line = new Line();
    }

    public deal(): void {
        this.players.forEach((player) => {
            player.tiles.push(...this.dominoSet.drawN(this.startingHandSize));
        });
    }

    public isGameOver(): boolean {
        assert(
            !this.line.isEmpty(),
            `Line should not be empty before before checking for game over.
            There should be atlest 1 tile on the line`,
        );
        const endingPips = this.line.getEndingPips();

        const anyoneEmpty = this.players.some((player: Player) => player.isEmpty());
        const allStuck = this.players.every((player) => player.isStuck(endingPips));

        return anyoneEmpty || (allStuck && this.dominoSet.isEmpty());
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
    public nextPlayer(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    /**
     * Move current player to the next player who is not blocked
     * @return players names who are blocked if all are blocked return undefined
     */
    public nextPlayerWhoIsNotBlocked(): string[] {
        const endingPips = this.line.getEndingPips();

        const blocked: string[] = [];

        for (let i = 0; i < this.players.length; i++) {
            this.nextPlayer();
            const isBlocked = this.getCurrentPlayer().isStuck(endingPips) && this.dominoSet.isEmpty();
            if (!isBlocked) {
                break;
            }
            blocked.push(this.getCurrentPlayer().name);
        }

        return blocked;
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
}

export { Game };
