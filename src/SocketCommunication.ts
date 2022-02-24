import * as http from 'http'
import express, { Express } from 'express';
const socketIO = require('socket.io'); // not using import because this is an old version
import { Domino } from './Domino';

const port = process.env.PORT || 4567;

class SocketCommunication {
    
    private app: Express;
    private server: http.Server;
    private io: any; // There are no tyepes ;(
    private domino: Domino;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);
        
        this.listen();
        
        this.domino = new Domino(this);
    } 

    private listen() {
        this.server.listen(4567, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });

        this.io.on('connection', (socket: any) => {
            console.log('Client connected');

            socket.emit('message', {data: 'Hello World'});

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    // public broadcast
}

export { SocketCommunication };