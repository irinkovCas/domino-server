// import * as Game from 'Game'; // this will be your custom import
import { expect, assert } from 'chai';
import { createServer } from "http";
import { DominoSet } from '../Domino/Entities/DominoSet';
const io = require("socket.io-client");
import { isExpressionStatement, isObjectBindingPattern } from 'typescript';
import { GameRoom, SocketManager } from '../CommunicationLayer/SocketManager';

describe('Sockets', () => {
    let socketManager: SocketManager;
    let sockets: any[];

    beforeEach((done: Mocha.Done) => {

        sockets = [];
        const port = 6999;

        socketManager = new SocketManager();
        socketManager.listen(port);

        for (let i = 0; i < 3; i++) {
            const clientSocket = io(`http://localhost:${port}`);
            sockets.push( clientSocket);
        }
        
        sockets[0].on( 'connect', () => {/* console.log(`${sockets[0].id}`) */});
        sockets[1].on( 'connect', () => {/* console.log(`${sockets[1].id}`) */});
        sockets[2].on( 'connect', () => {/* console.log(`${sockets[2].id}`);*/ done(); });
    });

    afterEach(() => {
        socketManager.close();
        for (let socket of sockets) {
            socket.close();
        }
    });

    it('should send a message to all clients', (done: Mocha.Done) => {
        sockets[0].on('start', (data) => {console.log(data)});
        sockets[1].on('start', (data) => {console.log(data)});
        sockets[2].on('start', (data) => {console.log(data); done()});
    });

    it('should create a game', () => {
        for (let socket of sockets) {
            socket.on("start", )
        }

    });
});

describe('DominoSet', () => {

    it('constructor', () => {
        const set = new DominoSet();
    });

    // it('deal', () => {
    //     let set = new DominoSet();
    //     set.shuffle();
    //     const hands = set.deal(2, 7);
    //     assert.strictEqual(hands[0].length, 7);
    //     assert.strictEqual(hands[1].length, 7);
    // });

    it('shuffle', () => {
        const set1 = new DominoSet();
        const set2 = new DominoSet();

        set1.shuffle();
        // there is 1 in / 28! chance that the two sets are the same
        assert.notDeepEqual(set1, set2);
    });

    // it('deal not enugh tiles', () => {
    //     let set = new DominoSet();
    //     assert.throws(() => { set.deal(5, 7) }, Error);

    // });
});

