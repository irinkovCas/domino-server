// import * as Game from 'Game'; // this will be your custom import
import { expect } from 'chai';
import * as assert  from 'assert';
import { DominoSet } from '../Game';

describe('DominoSet', () => {
    
    it('constructor', () => {
        const set = new DominoSet();
    });

    it('deal', () => {
        let set = new DominoSet();
        set.shuffle();
        const hands = set.deal(2, 7);
        assert.strictEqual(hands[0].length, 7);
        assert.strictEqual(hands[1].length, 7);
    });

    it('shuffle', () => {
        const set1 = new DominoSet();
        const set2 = new DominoSet();

        set1.shuffle();

        // there is 1 in / 28! chance that the two sets are the same
        assert.notDeepStrictEqual(set1, set2);
    });

    it('deal not enugh tiles', () => {
        let set = new DominoSet();
        assert.throws(() => { set.deal(5, 7) }, Error);

    });
});

