import { SocketManager } from "./Sockets";

const PORT = process.env.PORT || 4567;

let dominoServer = new SocketManager();
dominoServer.listen(PORT);