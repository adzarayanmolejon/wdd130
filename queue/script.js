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

function displayVisualCallout(number) {
    document.getElementById('visualCallout').innerText = `Calling number ${number}`;
}

function resetQueue(queueType) {
    switch (queueType) {
        case 'single':
            singleQueue = [];
            break;
        case 'multiple':
            multipleQueue = [];
            break;
        case 'priority':
            priorityQueue = [];
            break;
        default:
            console.error('Invalid queue type');
            return;
    }
}
