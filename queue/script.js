<script>
    let ws;

    function connectWebSocket() {
        if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) {
            return; // WebSocket already connected or connecting
        }

        ws = new WebSocket('ws://localhost:8080');
        
        ws.onopen = () => {
            console.log('WebSocket connected.');
        };

        ws.onmessage = event => {
            const data = JSON.parse(event.data);
            if (data.type === 'call') {
                document.getElementById('nowServing').textContent = `Now Serving: ${data.name}`;
            } else if (data.message) {
                console.log(data.message);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
        };
    }

    function joinQueue() {
        const name = document.getElementById('name').value;
        const queueType = document.getElementById('queueType').value;

        if (!name || !queueType) {
            console.error('Name and queue type are required.');
            return;
        }

        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not connected.');
            return;
        }

        ws.send(JSON.stringify({
            type: 'join',
            name: name,
            queueType: queueType
        }));
    }

    function resetQueue(queueType) {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not connected.');
            return;
        }

        ws.send(JSON.stringify({
            type: 'reset',
            queueType: queueType
        }));
    }

    function callNext(queueType) {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not connected.');
            return;
        }

        ws.send(JSON.stringify({
            type: 'call',
            queueType: queueType
        }));
    }

    // Connect WebSocket on page load
    connectWebSocket();
</script>

