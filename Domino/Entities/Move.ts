import { isMatching, Tile } from './Tile';

enum Direction {
    Left = 0,
    Right = 1
}

interface Move {
    where: Direction;
    tile: Tile;
}

function isValid(move: Move, endingPips: Tile | undefined): boolean {
    if (endingPips == undefined) {
        return true;
    }

    switch (move.where) {
        case Direction.Left:
            return isMatching(move.tile, endingPips);
        case Direction.Right:
            return isMatching(endingPips, move.tile);
    }
}

export { Move, Direction, isValid };
