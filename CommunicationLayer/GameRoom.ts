
import { Server, Socket } from 'socket.io';

class GameRoom {
    private readonly name: string;

    private readonly io: Server;
    private readonly clients: Map<string, Socket>; // map  playerName -> socket

    public constructor(name: string, io: Server, clients: Map<string, Socket>) {
        this.name = name;
        this.io = io;
        this.clients = clients;

        for (const socket of this.clients.values()) {
            socket.join(this.name);
        }
    }

    // public listen(event: string, callback: (data: any) => void) {
    //     this.io.in(this.name).on(event, callback);
    // }

    public listenToPlayer(
        playerName: string,
        event: string,
        callback: (data: any) => void,
    ): void {
        console.log(`listenToPlayer ${playerName} ${event}`);
        this.clients.get(playerName)!.on(event, callback);
    }

    public listenToPlayerOnce(
        playerName: string,
        event: string,
        callback: (data: any) => void,
    ): void {
        console.log(`listenToPlayerOnce ${playerName} ${event}`);
        this.clients.get(playerName)!.once(event, callback);
    }

    // public listenOnce(event: string, callback: (data: any) => void) {
    //     this.io.in(this.name).once(event, callback);
    // }

    public removeListenerFrom(
        playerName: string,
        event: string,
        listener: (data: any) => void,
    ): void {
        console.log(`removeListenerFrom ${playerName} ${event}`);
        // this.clients.get(playerName)!.off(event);
        this.clients.get(playerName)!.off(event, listener);
    }

    public send(
        playerName: string,
        event: string,
        data: Record<string, unknown>,
    ): void {
        // console.log(`send ${playerName} ${event} ${JSON.stringify(data, null, 4)}`);
        console.log(`send ${playerName} ${event} ${JSON.stringify(data)}`);
        this.clients.get(playerName)!.emit(event, data);
    }

    public sendAll(
        event: string,
        data: Record<string, unknown>,
    ): void {
        console.log(`sendAll ${event} ${JSON.stringify(data, null, 4)}`);
        this.io.in(this.name).emit(event, data);
    }

    public sendAllBut(
        playerName: string,
        event: string,
        data: Record<string, unknown>,
    ): void {
        console.log(`sendAllBut ${playerName} ${event} ${JSON.stringify(data, null, 4)}`);
        this.clients.get(playerName)!.to(this.name).emit(event, data);
    }

    public close(): void {
        for (const socket of this.clients.values()) {
            socket.leave(this.name);
        }
    }

    public players(): string[] {
        return [...this.clients.keys()];
    }
}

export { GameRoom };
