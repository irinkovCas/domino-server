import { Tile } from './Tile';

class Line {
    private tiles: Tile[];

    public constructor(tiles: Tile[] = []) {
        this.tiles = tiles;
    }

    public addLeft(tile: Tile): void {
        console.log('tiles', this.tiles);
        this.tiles.unshift(tile);
    }

    public addRight(tile: Tile): void {
        console.log('tiles', this.tiles);
        this.tiles.push(tile);
    }

    public getLeft(): Tile | undefined {
        return this.tiles[0];
    }

    public getRight(): Tile | undefined {
        return this.tiles[this.tiles.length - 1];
    }

    public getEndingPips(): Tile | undefined {
        const left = this.getLeft();
        const right = this.getRight();
        return (left && right) ? { firstPip: left.firstPip, secondPip: right.secondPip } : undefined;
    }

    public isEmpty(): boolean {
        return this.tiles.length === 0;
    }
}

export { Line };
