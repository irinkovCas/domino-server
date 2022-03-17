/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { io as Client, Socket } from 'socket.io-client';
import { SocketManager } from './CommunicationLayer/SocketManager';

const PORT = process.env.PORT || 4567;

const dominoServer = new SocketManager();
dominoServer.listen(PORT);

// const sockets: Socket[] = [];

// for (let i = 0; i < 2; i++) {
//     const clientSocket: Socket = Client(`http://localhost:${PORT}`);
//     sockets.push(clientSocket);
// }

// const p2: Promise<void> = new Promise((resolve, _reject) => {
//     // console.log('waiting for socketManager to be ready');
//     sockets[0].on('connect', () => {
//         // console.log(`${sockets[0].id}`);
//         resolve();
//     });
// });

// const p1: Promise<void> = new Promise((resolve, _reject) => {
//     sockets[1].on('connect', () => {
//         // console.log(`${sockets[1].id}`);
//         resolve();
//     });
// });

// Promise.all([p1, p2]).then(() => {
//     // console.log('Both connected');
// });


// type ValueOf<T> = T[keyof T];
// interface EventsMap {
//     [event: string]: any;
// }
// type EventNames<Map extends EventsMap> = keyof Map & (string | symbol);
// type EventParam<Map extends EventsMap, Ev extends EventNames<Map>> = Map[Ev];

// interface DominoEvents {
//     game_init: { players: string[], game_id: boolean },
//     round_start: { score: number },
// }

// function send<Ev extends EventNames<DominoEvents>>(ev: Ev, data: EventParam<DominoEvents, Ev>): void {
//     console.log(ev, data);
// }

// send('round_start', { players: ['a', 'b'], game_id: true });

// type ParamsOfObject<T extends EventsMap> = T extends { [key: string]: infer U } ? U : never;

// function sum(a: number, b: number) {
//     return a + b;
// }
// interface SumArgs { a: number, b: number };
// type Sum = (a: number, b: number) => number;
// // type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
// type Parameters_<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
// type something = Parameters<Sum>;
// type ArrayKeys = keyof any[]
// type Indices<T> = Exclude<keyof T, ArrayKeys>
// type Lookup<T, K> = K extends keyof T ? T[K] : never;
// type TupleFromInterface<T, K extends Array<keyof T>> = {
//   [I in Indices<K>]: Lookup<T, K[I]>
// }
// type somethingelse = TupleFromInterface<SumArgs>;
// console.log()
// send('round_start', { players: ['a', 'b'] });

// interface MyEvent<Data> {
//     name: string,
//     data: Data
// }

// interface GameInitData {
//     tile: number
// }

// class GameInitEvent implements MyEvent<GameInitData> {
//     public readonly name = 'gameInit';
//     public data: GameInitData;
// }

// function send<Data, Event extends ServerEvents>(event: Event, data: Data) {
//     console.log(event.na)
// }

// import * as http from 'http';
// import { Server, Socket } from 'socket.io';

// type SocketActionFn<T> = (message: T) => void;

// interface WrappedServerSocket<T> {
//     event: string;
//     callback: SocketActionFn<T>;
// }

// function broadcast<T>(event: SocketMessage): (message: T) => boolean {
//     return (message: T) => io!.emit(event, message);
// }

// function createSocket<T>(
//     event: SocketMessage,
//     action?: SocketActionFn<T>,
// ): WrappedServerSocket<T> {
//     const callback = action || broadcast(event);
//     return { event, callback };
// }

// export function createSocketServer(server: http.Server): void {
//     io = new Server(server);
//     io.on('connection', (socket: Socket) => {
//         registeredEvents.forEach(({ event, callback }) => {
//             socket.on(event, callback);
//         });
//     });
// }

// let io: Server | undefined = undefined;

// interface User {
//     id: string;
//     name: string;
// }

// type SocketMessage = 'chat_message' | 'user_connected';

// const chatMessageEvent = createSocket<string>('chat_message');
// const userConnectedEvent = createSocket<string>('user_connected', (user) => {
//     console.log(user.length); // Compiles OK, user gets inferred as User
//     console.log(); // TypeError! Type doesn't exist in User
// });

// const registeredEvents = [chatMessageEvent, userConnectedEvent];
