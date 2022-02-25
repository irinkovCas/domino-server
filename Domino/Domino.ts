import { Game } from "./Game";
import { IState } from "./States/IState";
import { GameRoom } from "../CommunicationLayer/SocketManager";
import { Player } from "./Entities/Player";
class Domino {
    
    game: Game;
    state: IState;
    
    room: GameRoom;

    endCallback: () => void;

    constructor(room: GameRoom, onEnd: () => void) {
        this.room = room;
        this.game = new Game(room.players());
        this.endCallback = onEnd;
    }

    start() {
        this.room.sendAll("start", {data: "The game has started"});  
    }

    setState(state: any) { 

    }

    close () { 
        this.room.close();
    }
}

export { Domino };