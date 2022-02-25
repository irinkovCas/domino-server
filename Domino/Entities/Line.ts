import { Tile } from './Tile';

class Line {
    tiles: Tile[];

    constructor(tiles: Tile[] = []) {
        this.tiles = tiles;
    }

    addLeft(tile: Tile) {
        this.tiles.unshift(tile);
    }

    addRight(tile: Tile) {
        this.tiles.push(tile);
    }

    getLeft(): Tile {
        return this.tiles[0];
    }

    getRight(): Tile {
        return this.tiles[this.tiles.length - 1];
    }
}

export { Line };