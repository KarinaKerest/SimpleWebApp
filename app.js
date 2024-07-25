const input = document.getElementById('userInput');

function adjustWidth() {
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.style.fontSize = '25px'; 
    tempSpan.textContent = input.value || input.placeholder;
    document.body.appendChild(tempSpan);
    input.style.width = `${tempSpan.offsetWidth + 30}px`; 
    document.body.removeChild(tempSpan);
}

input.addEventListener('input', adjustWidth);
window.addEventListener('load', adjustWidth); 

function displayMessage() {
    const userInput = document.getElementById('userInput').value;
    const output = document.getElementById('output');
    if (userInput) {
        output.textContent = 'Success: ' + userInput;
    } else {
        output.textContent = 'Please type something!';
    }
}
