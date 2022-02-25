
import { Player } from "./Player";

class GameRoom {

    private name: string;
    
    private io: any;
    private readonly clients: Map<string, any>; // map  playerName -> socket

    constructor(name: string, io: any, clients: Map<string, any>) {
        this.name = name;
        this.io = io;
        this.clients = clients;

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
    }

    public players(): string[] {
        return [...this.clients.keys()];
    }
}

export { GameRoom } 