import { createServer } from 'node:http';
import { createApp } from './app.js';
import { initWebSocketServer } from './websocket/ws.js';

const PORT = process.env.PORT || 3000;
const app = createApp();
const httpServer = createServer(app);

initWebSocketServer(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
