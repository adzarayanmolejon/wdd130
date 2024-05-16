document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('queueForm');
    const visualCallout = document.getElementById('visualCallout');
    const audio = document.getElementById('audio');

    let queues = {
        single: [],
        multiple: [],
        priority: []
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const queueType = document.getElementById('queueType').value;

        queues[queueType].push(name);
        alert(`${name} has joined the ${queueType} queue.`);
        form.reset();
    });

    window.resetQueue = function(type) {
        queues[type] = [];
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} queue has been reset.`);
    };

    // Example function to call the next person in the queue
    function callNext(queueType) {
        if (queues[queueType].length > 0) {
            const nextPerson = queues[queueType].shift();
            visualCallout.textContent = `Next in ${queueType} queue: ${nextPerson}`;
            audio.play();
        } else {
            alert(`No one is in the ${queueType} queue.`);
        }
    }

    // Example usage of callNext
    setInterval(() => {
        callNext('single');
    }, 10000); // Calls the next person in the 'single' queue every 10 seconds
});

function callNextUser(nameOrNumber) {
    // ... your existing logic to determine nameOrNumber (user to serve)
  
    // Create a SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance();
  
    // Set the text to be spoken
    utterance.text = `Now serving number ${nameOrNumber}`;
  
    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  }
  