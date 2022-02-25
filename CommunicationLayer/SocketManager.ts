import * as http from 'http'
import express, { Express } from 'express';
const socketIO = require('socket.io'); // not using import because this is an old version
import { Domino } from '../Domino/Domino';
import { GameRoom } from './GameRoom';
import { Player } from './Player';

class SocketManager {
    
    private app: Express;
    private server: http.Server;
    private io: any; // There are no types ;(

    private clients: Map<Player, any> = new Map(); // map socket.id -> socket
    private dominoes:Domino[] = [];

    private waitingToStart = new Set<Player>();
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
        this.server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });
        
        this.io.on('connection', (socket: any) => {
            
            console.log('Client connected');

            // name is the same as socket.id for now
            const player: Player = { id: socket.id, name: socket.id };

            this.clients.set(player , socket);
            this.queuePlayer(player);
            
            socket.emit('message', {data: 'Welcome to the game'});
            socket.emit('your_id', {id: socket.id});

            socket.on('disconnect', () => {
                this.clients.delete(socket.id);
                this.waitingToStart.delete(socket.id);

                console.log('Client disconnected');
            });
        });
    }

    private queuePlayer(player: Player) { 
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

    private createGame(players: Player[]) {
        let roomClients = new Map();
        for (let player of players) {
            roomClients.set(player.name, this.clients.get(player));
        }
        
        const roomName = `${players[0].name} vs ${players[1].name}`;
        const gameRoom = new GameRoom( roomName, this.io, roomClients);
        const domino = new Domino(gameRoom, () => console.log('Domino closed'));
        this.dominoes.push(domino);
        domino.start(); // runs the game
    }

    close() {
        for (const domino of this.dominoes) {
            domino.close();
        }
        this.io.close()
        this.server.close();
    }
}

export { SocketManager, GameRoom };