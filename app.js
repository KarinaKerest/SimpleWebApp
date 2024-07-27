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
        fetchBingSearchResults(userInput);
    } else {
        output.textContent = 'Please type something!';
    }
}

async function fetchBingSearchResults(query) {
    const subscriptionKey = 'bf53a883970f434ab12ff871b17e0eae';
    const endpoint = 'https://api.bing.microsoft.com/v7.0/search';
    const params = `?q=${encodeURIComponent(query)}&count=5`;

    try {
        const response = await fetch(endpoint + params, {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            displaySearchResults(data);
        } else {
            console.error('Error fetching search results:', response.statusText);
            document.getElementById('output').textContent = 'Error fetching search results.';
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        document.getElementById('output').textContent = 'Error fetching search results.';
    }
}

function displaySearchResults(data) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    if (data.webPages && data.webPages.value.length > 0) {
        data.webPages.value.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result';

            const title = document.createElement('a');
            title.href = result.url;
            title.textContent = result.name;
            title.target = '_blank';
            resultItem.appendChild(title);

            const snippet = document.createElement('p');
            snippet.textContent = result.snippet;
            resultItem.appendChild(snippet);

            output.appendChild(resultItem);
        });
    } else {
        output.textContent = 'No results found.';
    }
}