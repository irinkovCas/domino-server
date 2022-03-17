import { Tile } from './Tile';

class DominoSet {
    private tiles: Tile[] = [];

    public constructor() {
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                this.tiles.push(
                    // This doesn't make a diffrence for the server, but makes a difference on the client
                    // For Example: The client wont recieve a [1,6] tile every time
                    // 50% chance of being a [6,1] tile
                    Math.random() > 0.5 ?
                        { firstPip: i, secondPip: j } :
                        { firstPip: j, secondPip: i },
                );
            }
        }
    }

    public isEmpty(): boolean {
        return this.tiles.length === 0;
    }

    // fisher-yates shuffle
    public shuffle(): void {
        for (let i = this.tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        }
    }

    public draw(): Tile | undefined {
        return this.tiles.pop();
    }

    public drawN(n: number): Tile[] {
        return this.tiles.splice(0, n);
    }

    public getSize(): number {
        return this.tiles.length;
    }
}

export { DominoSet };
