const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

let queues = {
    single: [],
    multiple: [],
    priority: []
};

server.on('connection', ws => {
    ws.on('message', message => {
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
                    const nextPerson = queues[data.queueType].shift();
                    broadcast({
                        type: 'call',
                        queueType: data.queueType,
                        name: nextPerson
                    });
                }
                break;
        }
    });
});

function broadcast(data) {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}
