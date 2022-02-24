import { Game } from "./Game/Game";
import { GameRoom } from "./Sockets";

class Domino {
    
    game: Game;
    room: GameRoom;
    endCallback: () => void;

    constructor(room: GameRoom, players: string[], onEnd: () => void) {
        this.room = room;
        this.game = new Game();
        this.endCallback = onEnd;
    }

    start() {
        this.room.sendAll("start", {data: "The game has started"});
    }
}

export { Domino };