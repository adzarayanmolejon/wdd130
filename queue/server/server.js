// server.js

// Load the required modules
const http = require('http');
const WebSocket = require('ws');

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running.');
});

// Create a WebSocket server by attaching it to the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected.');

    // Example: Send a welcome message to the client
    ws.send('Welcome to the queue system!');

    // Handle messages from the client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Your queue management logic goes here
        // ...
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log('WebSocket server is listening on port 8080.');
});

