import { Direction, Move } from './Move';
import { Tile } from './Tile';

class Line {
    private tiles: Tile[];

    public constructor(tiles: Tile[] = []) {
        this.tiles = tiles;
    }

    public applyMove(move: Move): void {
        if (move.where === Direction.Left) {
            this.addLeft(move.tile);
        } else {
            this.addRight(move.tile);
        }
    }

    public addLeft(tile: Tile): void {
        this.tiles.unshift(tile);
    }

    public addRight(tile: Tile): void {
        this.tiles.push(tile);
    }

    public getLeft(): Tile | undefined {
        return this.tiles[0];
    }

    public getRight(): Tile | undefined {
        return this.tiles[this.tiles.length - 1];
    }

    public getLeftRightPips(): Tile | undefined {
        // if one of the pips is undefined than they both are undefined
        const left = this.getLeft()?.firstPip;
        const right = this.getRight()?.secondPip;

        return (!left || !right) ? undefined : new Tile(left, right);
    }
}

export { Line };
