import { Direction, isValid, Move } from './Move';

type Tile = {
    firstPip: number,
    secondPip: number,
}

function score(tile: Tile): number {
    return tile.firstPip + tile.secondPip;
}

function isMatching(a: Tile, b: Tile): boolean {
    return a.secondPip === b.firstPip;
}

function rotate(tile: Tile): Tile {
    return {
        firstPip: tile.secondPip,
        secondPip: tile.firstPip,
    };
}

function validMovesForTile(tile: Tile, endingPips: Tile | undefined): Move[] {
    const validMoves: Move[] = [];

    for (const t of [tile, rotate(tile)]) {
        for (const where of [Direction.Left, Direction.Right]) {
            const move: Move = { where, tile: t };
            if (isValid(move, endingPips)) {
                validMoves.push(move);
            }
        }
    }

    return validMoves;
}

export { Tile, isMatching, rotate, validMovesForTile, score };
