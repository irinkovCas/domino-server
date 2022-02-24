type Tile = {
    firstPip: number,
    secondPip: number,
};

type Hand = Tile[]

class DominoSet {
    tiles: Tile[] = [];

    constructor() {
        for(let i = 0; i <= 6; i++) {
            for(let j = i; j <= 6; j++) {
                this.tiles.push({firstPip: i, secondPip: j});       
            }
        }
    }

    shuffle() {
        for(let i = this.tiles.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        }
    }

    deal(numberOfHands: number, handSize) : Hand[] {
        if (numberOfHands * handSize > this.tiles.length) {
            throw new Error('Not enough tiles to deal');
        }

        let hands = [];
        for(let i = 0; i < numberOfHands; i++) {
            hands.push(this.tiles.splice(0, handSize));
        }

        return hands;
    }
}

class Game {
    hand: Hand[];
    line: Tile[];
    dominoSet: DominoSet;
}

export {Game};