import Hand from './Hand';
import Tile from './Tile';
import DominoSet from './DominoSet';
import Line from './Line';

class Game {
    hand: Hand[];
    line: Line;
    dominoSet: DominoSet;

    constructor() {
        this.dominoSet = new DominoSet();
        this.dominoSet.shuffle();
        this.hand = this.dominoSet.deal(2, 7);
        this.line = [];
    }
}

export {Game};