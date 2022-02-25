import { Game } from "./Game";
import { State } from "./States/State";
import { GameRoom } from "../CommunicationLayer/SocketManager";
import { Player } from "./Entities/Player";
class Domino {
    
    private game: Game;
    private state: State;
    
    private room: GameRoom;

    endCallback: () => void;

    constructor(room: GameRoom, onEnd: () => void) {
        this.room = room;
        this.game = new Game(room.players());
        this.endCallback = onEnd;
    }

    start() {
        this.room.sendAll("start", {data: "The game has started"});  
    }

    transition(next: State) { 
        this.state.end();
        this.state = next;
        this.state.start();
    }

    close () { 
        this.room.close();
    }
}

export { Domino };