import { isMatching, Tile } from './Tile';

enum Direction {
    Left = 0,
    Right = 1
}

type Move = {
    where: Direction;
    tile: Tile;
    matching: Tile | undefined; // there is a corner case on the first move when the line is empty
}

function isValid(move: Move): boolean {
    if (move.matching === undefined) {
        return true;
    }

    switch (move.where) {
        case Direction.Left:
            return isMatching(move.tile, move.matching);
        case Direction.Right:
            return isMatching(move.matching, move.tile);
    }
}

export { Move, Direction, isValid };
