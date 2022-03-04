import { DominoSet } from './Entities/DominoSet';
import { Line } from './Entities/Line';
import { Direction, Move } from './Entities/Move';
import { Player } from './Entities/Player';

class Game {
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
        const tile = this.line.getLeftRightPips();

        const anyoneEmpty = this.players.some((player: Player) => player.isEmpty());
        const allBlocked = this.players.every((player) => !player.someValidMoves(tile));

        return anyoneEmpty || (allBlocked && this.dominoSet.isEmpty());
    }

    public currentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    public applyMove(move: Move): void {
        if (move.where === Direction.Left) {
            this.line.addLeft(move.tile);
        } else {
            this.line.addRight(move.tile);
        }

        if (move.where == Direction.Left) {
            this.line.addLeft(move.tile);
        } else {
            this.line.addRight(move.tile);
        }
    }

    // public isValid(move: Move): boolean {
    //     const left = this.line.getLeft()?.firstPip;
    //     const right = this.line.getRight()?.secondPip;
    //     return Move.prototype.isValid.call(move, left, right);
    // }

    public currentPlayerValidMoves(): Move[] {
        return this.currentPlayer().validMoves(this.line.getLeftRightPips());
    }

    // return blocked player if any
    public nextPlayer(): Player[] {
        const endingPips = this.line.getLeftRightPips();

        const blocked = [];

        do {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

            // check if is blocked
        } while (!this.currentPlayer().someValidMoves(endingPips) && this.dominoSet.isEmpty());
        return blocked;
    }

    public drawTiles(): void {
        const tile = this.dominoSet.draw()!;
        // this.tilesDrawn.push(tile);

        // There should always be a tile on the line before needing to draw
        const endingPips = this.line.getLeftRightPips()!;

        const validMoves = [
            new Move(Direction.Left, tile, endingPips),
            new Move(Direction.Right, tile, endingPips),
        ].some((m) => m.isValid());

        if (!validMoves && this.dominoSet.isEmpty()) {
            this.drawTiles();
        }

        // this.someValidMove = validMoves;
    }
}

export { Game };
