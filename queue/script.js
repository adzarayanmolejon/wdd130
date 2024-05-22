const ws = new WebSocket('ws://localhost:8080');

// Event listeners for WebSocket events
ws.addEventListener('open', () => {
    console.log('WebSocket connection established.');
    // You can send initial data here if needed.
});

ws.addEventListener('message', (event) => {
    console.log('Received message:', event.data);
    // Handle incoming messages from the server.
});

ws.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event.code, event.reason);
    // Handle any cleanup or reconnection logic.
});

ws.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
    // Handle any errors.
});

// Assuming you have a function that updates the "Now Serving" section
function updateNowServing(clientName) {
    // Update the display
    document.getElementById('nowServing').textContent = `Now Serving: ${clientName}`;

    // Call the voice announcement function
    announceClientName(clientName);
}

// Function to announce the client's name
function announceClientName(clientName) {
    const utterance = new SpeechSynthesisUtterance(clientName);
    utterance.lang = 'en-US'; // Set the language (adjust as needed)
    utterance.volume = 1; // Adjust volume if necessary

    // Repeat the announcement three times
    for (let i = 0; i < 3; i++) {
        speechSynthesis.speak(utterance);
    }
}
