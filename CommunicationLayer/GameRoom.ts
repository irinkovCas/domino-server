/* eslint-disable @typescript-eslint/no-unused-vars */

import { Server, Socket } from 'socket.io';
import { ClientToServerEvents } from '../common/ClientToServerEvents';
import { ServerToClientsEvent } from '../common/ServerToClientsEvent';

interface EventsMap {
    [event: string]: any;
}

type EventNames<Map extends EventsMap> = keyof Map & (string | symbol);
type EventParam<Map extends EventsMap, Ev extends EventNames<Map>> = Map[Ev];

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

    public listenToPlayer<Ev extends EventNames<ClientToServerEvents>>(
        playerName: string,
        event: Ev,
        callback: (data: EventParam<ClientToServerEvents, Ev>) => void,
    ): void {
        console.log(`listenToPlayer ${playerName} ${String(event)}`);
        this.clients.get(playerName)!.on(String(event), callback);
    }

    // public listenToPlayerOnce<Data>(
    //     playerName: string,
    //     event: string,
    //     callback: (data: Data) => void,
    // ): void {
    //     console.log(`listenToPlayerOnce ${playerName} ${event}`);
    //     this.clients.get(playerName)!.once(event, callback);
    // }

    // public listenOnce(event: string, callback: (data: any) => void) {
    //     this.io.in(this.name).once(event, callback);
    // }

    public removeListenerFrom<Ev extends EventNames<ClientToServerEvents>>(
        playerName: string,
        event: Ev,
        listener: (data: EventParam<ClientToServerEvents, Ev>) => void,
    ): void {
        console.log(`removeListenerFrom ${playerName} ${String(event)}`);
        // this.clients.get(playerName)!.off(event);
        this.clients.get(playerName)!.off(String(event), listener);
    }

    public send<Ev extends EventNames<ServerToClientsEvent>>(
        playerName: string,
        event: Ev,
        data: EventParam<ServerToClientsEvent, Ev>,
    ): void {
        // console.log(`send ${playerName} ${event} ${JSON.stringify(data, null, 4)}`);
        console.log(`send ${playerName} ${String(event)} ${JSON.stringify(data)}`);
        this.clients.get(playerName)!.emit(event, data);
    }

    public sendAll<Ev extends EventNames<ServerToClientsEvent>>(
        event: Ev,
        data: EventParam<ServerToClientsEvent, Ev>,
    ): void {
        console.log(`sendAll ${String(event)} ${JSON.stringify(data, null, 4)}`);
        this.io.in(this.name).emit(event, data);
    }

    public sendAllBut<Ev extends EventNames<ServerToClientsEvent>>(
        playerName: string,
        event: Ev,
        data: EventParam<ServerToClientsEvent, Ev>,
    ): void {
        console.log(`sendAllBut ${playerName} ${String(event)} ${JSON.stringify(data, null, 4)}`);
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
