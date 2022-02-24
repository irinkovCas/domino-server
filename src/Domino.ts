import { Game } from "./Game";
import { SocketCommunication } from "./SocketCommunication";

class Domino {
    
    game: Game;
    socket: SocketCommunication;

    constructor(socket: SocketCommunication) {
        this.socket = socket;
        this.game = new Game();
    }
}

export { Domino };