const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running.');
});

const wss = new WebSocket.Server({ server });

const queues = {
    single: [],
    multiple: [],
    priority: [],
};

wss.on('connection', (ws) => {
    console.log('Client connected.');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'join':
                queues[data.queueType].push(data.name);
                break;
            case 'reset':
                queues[data.queueType] = [];
                break;
            case 'call':
                if (queues[data.queueType].length > 0) {
                    const name = queues[data.queueType].shift();
                    ws.send(JSON.stringify({ type: 'call', name: name }));
                } else {
                    ws.send(JSON.stringify({ type: 'call', name: 'No one in queue' }));
                }
                break;
            default:
                console.log('Unknown message type:', data.type);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

server.listen(8080, () => {
    console.log('WebSocket server is listening on port 8080.');
});
