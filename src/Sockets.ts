import * as http from 'http'
import express, { Express } from 'express';
const socketIO = require('socket.io'); // not using import because this is an old version
import { Domino } from './Domino';
import { Game } from './Game/Game';

type jsonType = {[key: string]: any};
type Player = string; // its the same as socket.id

class GameRoom {

    private name: string;
    
    private io: any;
    private readonly clients: Map<Player, any>;

    private onCloseCallback: () => void;

    constructor(name: string, io: any, clients: Map<Player, any>, onClose: () => void) {
        this.name = name;
        this.io = io;
        this.clients = clients;
        this.onCloseCallback = onClose;

        for (let socket of this.clients.values()) {
            socket.join(this.name);
        }
    }

    public send(player: string, event: string, data: jsonType) {
        this.clients.get(player).emit(event, data);
    }

    public sendAll(event: string, data: jsonType) {
        this.io.in(this.name).emit(event, data);
    }

    public sendAllBut(player: string, event: string, data: jsonType) {
        this.clients.get(player).to(this.name).emit(event, data);
    }

    public close() {
        for (let socket of this.clients.values()) {
            socket.leave(this.name)
        }

        this.onCloseCallback();
    }
}

class SocketManager {
    
    private app: Express;
    private server: http.Server;
    private io: any; // There are no types ;(

    private clients: Map<Player, any> = new Map(); // map socket.id -> socket
    private rooms: Map<string, GameRoom> = new Map();

    private readonly waitingToStart = new Set<Player>();
    private readonly playersToStartAGame = 2;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server, {
            // cors: {    
            //     origin: `http://localhost:${port}`,
            // }  
        });        
    } 

    listen(port: number | string) {
        console.log("Hello");
        this.server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });
        
        this.io.on('connection', (socket: any) => {
            
            console.log('Client connected');

            this.clients.set(socket.id, socket);
            this.queuePlayer(socket.id);
            
            socket.emit('message', {data: 'Welcome to the game'});
            socket.emit('your_id', {id: socket.id});

            socket.on('disconnect', () => {
                this.clients.delete(socket.id);
                this.waitingToStart.delete(socket.id);

                console.log('Client disconnected');
            });
        });
    }

    private queuePlayer(player: string) { 
        this.waitingToStart.add(player);
            
        if (this.waitingToStart.size === this.playersToStartAGame) {
            this.createGame([...this.waitingToStart]);    
            this.waitingToStart.clear();
        } else if (this.waitingToStart.size < this.playersToStartAGame) {
            this.clients.get(player).emit('message', {data: 'Waiting for more 1 player'});
        } else {
            // should be unreachable
            this.clients.get(player).emit('message', {data: 'Sorry! The game is full'});
        }
    }

    private createGame(players: string[]) {
        let roomClients = new Map();
        for (let player of players) {
            roomClients.set(player, this.clients.get(player));
        }
        
        
        const roomName = `${players[0]} vs ${players[1]}`;
        const gameRoom = new GameRoom(
            roomName, 
            this.io, 
            roomClients,
            () => { 
                console.log('Game closed');
            }
        );
        this.rooms[roomName] = gameRoom;
        const domino = new Domino(gameRoom, players, () => gameRoom.close()); // runs the game
        domino.start();
    }

    close() {
        for (const room of this.rooms.values()) {
            room.close();
        }
        this.io.close()
        this.server.close();
    }
}

export { SocketManager, GameRoom };