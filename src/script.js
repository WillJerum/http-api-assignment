/* Function to handle fetch response */
const handleResponse = async (response) => {
    const content = document.getElementById('content');

    // Display status code messages
    switch (response.status) {
        case 200:
            content.innerHTML = `<b>Success</b>`;
            break;
        case 400:
            content.innerHTML = `<b>Bad Request</b>`;
            break;
        case 401:
            content.innerHTML = `<b>Unauthorized</b>`;
            break;
        case 403:
            content.innerHTML = `<b>Forbidden</b>`;
            break;
        case 404:
            content.innerHTML = `<b>Not Found</b>`;
            break;
        case 500:
            content.innerHTML = `<b>Internal Server Error</b>`;
            break;
        case 501:
            content.innerHTML = `<b>Not Implemented</b>`;
            break;
        default:
            content.innerHTML = `<p>Status Code Not Implemented By Client</p>`;
            break;
    }

    // Get response content type
    const contentType = response.headers.get('Content-Type');

    // Parse and display JSON
    if (contentType.includes('application/json')) {
        const resObj = await response.json();
        console.log(resObj);
        content.innerHTML += `<p>${resObj.message}</p>`;
    }
    // Parse and display XML
    else if (contentType.includes('text/xml')) {
        const responseText = await response.text();
        console.log(responseText);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, 'text/xml');

        const message = xmlDoc.getElementsByTagName('message')[0]?.textContent || 'No message';
        const id = xmlDoc.getElementsByTagName('id')[0]?.textContent || '';

        content.innerHTML += `<p><strong>Message:</strong> ${message}</p>`;
        if (id) content.innerHTML += `<p><strong>ID:</strong> ${id}</p>`;
    }
};

/* Function to send fetch request */
const sendFetch = async () => {
    const page = document.getElementById('page').value;
    const type = document.getElementById('type').value;

    let response = await fetch(page, {
        method: 'GET',
        headers: {
            'Accept': type, // Set Accept header to JSON or XML
        }
    });

    handleResponse(response);
};

/* Init function to set up event listeners */
const init = () => {
    const sendButton = document.getElementById('send');
    sendButton.addEventListener('click', sendFetch);
};

window.onload = init;