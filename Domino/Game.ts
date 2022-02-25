import { Tile } from './Entities/Tile';
import { DominoSet } from './Entities/DominoSet';
import { Line } from './Entities/Line';
import { Player } from './Entities/Player';

enum Direction {
    Left,
    Right
}

type Move = {
    where: Direction
    tile: Tile;
}

class Game {
    
    readonly startingHandSize = 7;

    private players: Player[];
    private line: Line;
    private dominoSet: DominoSet;

    constructor(playerNames: string[]) {
        this.dominoSet = new DominoSet();
        this.dominoSet.shuffle();
        
        this.players = playerNames.map(name =>
            new Player(
                name,
                this.dominoSet.drawN(this.startingHandSize),
            )
        );
        
        this.line = new Line();
    }

    applyMove(move: Move) { 
        if (move.where === Direction.Left) {
            this.line.addLeft(move.tile);
        } else {
            this.line.addRight(move.tile);
        }
    }

    validMoves() {
        
    }
}

export {Game};