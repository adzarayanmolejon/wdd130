let singleQueue = [];
let multipleQueue = [];
let priorityQueue = [];
let queueNumber = 1;

document.getElementById('queueForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let queueType = 'single'; // Assume single queue for now
    assignQueueNumber(name, queueType);
});

function assignQueueNumber(name, queueType) {
    let newNumber = queueNumber++;
    switch (queueType) {
        case 'single':
            singleQueue.push({ number: newNumber, name: name });
            break;
        case 'multiple':
            multipleQueue.push({ number: newNumber, name: name });
            break;
        case 'priority':
            priorityQueue.push({ number: newNumber, name: name });
            break;
        default:
            console.error('Invalid queue type');
            return;
    }
    displayVisualCallout(newNumber);
}
function callNumber(queueType) {
    let queueNumbers;
    switch (queueType) {
        case 'single':
            queueNumbers = singleQueue;
            break;
        case 'multiple':
            queueNumbers = multipleQueue;
            break;
        case 'priority':
            queueNumbers = priorityQueue;
            break;
        default:
            console.error('Invalid queue type');
            return;
    }

    if (queueNumbers.length > 0) {
        let nextNumber = queueNumbers.shift().number;
        alert(`Calling ${queueType} queue number: ${nextNumber}`);
        playAudio(); // Call the playAudio function
    } else {
        alert(`No more numbers to call for ${queueType} queue`);
    }
}
function playAudio() {
    let audio = document.getElementById('audio');
    audio.play();
}
function callNextUser(nameOrNumber) {
    // ... your existing logic to determine nameOrNumber (user to serve)
  
    // Create a SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance();
  
    // Set the text to be spoken
    utterance.text = `Now serving number ${nameOrNumber}`;
  
    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  }
  