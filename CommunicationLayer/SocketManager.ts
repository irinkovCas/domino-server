import express, { Express } from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { Config } from '../common/config';
// const socketIO = require('socket.io'); // not using import because this is an old version
import { Domino } from '../Domino/Domino';
import { GameRoom } from './GameRoom';
import { Player } from './Player';

class SocketManager {
    private app: Express;
    private server: http.Server;
    private io: Server;

    private clients: Map<Player, Socket> = new Map();
    private dominoes: Domino[] = [];

    private waitingToStart = new Set<Player>();
    private readonly playersToStartAGame = 2;

    public constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            // OPTIONS HERE
            // cors: {
            //     origin: `http://localhost:${port}`,
            // }
        });
    }

    public listen(port: number | string): void {
        this.server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });

        this.io.on('connection', (socket) => {
            socket.on('noArg', () => {
                // .
            });

            socket.on('basicEmit', (a, b, c) => {
                console.log(a, b, c);
            });

            console.log('Client connected');

            // name is the same as socket.id for now
            const player: Player = { id: socket.id, name: socket.id };

            this.clients.set(player, socket);
            this.queuePlayer(player);
            console.log('Client connected something elswe ');

            socket.on('disconnect', () => {
                this.clients.delete(player);
                this.waitingToStart.delete(player);

                console.log('Client disconnected');
            });
        });
    }

    private queuePlayer(player: Player): void {
        this.waitingToStart.add(player);

        if (this.waitingToStart.size === this.playersToStartAGame) {
            this.createGame([...this.waitingToStart]);
            this.waitingToStart.clear();
        } else if (this.waitingToStart.size < this.playersToStartAGame) {
            // this.clients.get(player)!.emit('message', { data: 'Waiting for more 1 player' });
        } else {
            // should be unreachable
            // this.clients.get(player)!.emit('message', { data: 'Sorry! The game is full' });
        }
    }

    private createGame(players: Player[]): void {
        const roomClients = new Map<string, Socket>();
        for (const player of players) {
            roomClients.set(player.name, this.clients.get(player)!);
        }

        const config: Config = {
            room: new GameRoom(`${players[0].name} vs ${players[1].name}`, this.io, roomClients),
            gameSettings: { maxScore: 100 },
            endGameCallback: () => {
                console.log('end game callback');
            },
        };

        const domino = new Domino(config);
        this.dominoes.push(domino);
        domino.start(); // runs the game
    }

    public close(): void {
        for (const domino of this.dominoes) {
            domino.destroy();
        }
        this.io.close();
        this.server.close();
    }
}

export { SocketManager };
