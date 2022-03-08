import { SocketManager } from './CommunicationLayer/SocketManager';

const PORT = process.env.PORT || 4567;

const dominoServer = new SocketManager();
dominoServer.listen(PORT);
