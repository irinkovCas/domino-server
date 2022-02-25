
import { Player } from "./Player";

class GameRoom {

    private name: string;
    
    private io: any;
    private readonly clients: Map<string, any>; // map  playerName -> socket

    private onCloseCallback: () => void;

    constructor(name: string, io: any, clients: Map<string, any>, onClose: () => void) {
        this.name = name;
        this.io = io;
        this.clients = clients;
        this.onCloseCallback = onClose;

        for (let socket of this.clients.values()) {
            socket.join(this.name);
        }
    }

    public send(playerName: string, event: string, data: Object) {
        this.clients.get(playerName).emit(event, data);
    }

    public sendAll(event: string, data: Object) {
        this.io.in(this.name).emit(event, data);
    }

    public sendAllBut(playerName: string, event: string, data: Object) {
        this.clients.get(playerName).to(this.name).emit(event, data);
    }

    public close() {
        for (let socket of this.clients.values()) {
            socket.leave(this.name)
        }

        this.onCloseCallback();
    }

    public players(): string[] {
        return [...this.clients.keys()];
    }
}

export { GameRoom } 