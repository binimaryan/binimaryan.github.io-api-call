document.getElementById('search-btn').addEventListener('click', fetchLyrics);

async function fetchLyrics() {
    const artist = document.getElementById('artist').value;
    const title = document.getElementById('title').value;
    const resultDiv = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');

    resultDiv.innerHTML = '';
    errorMessage.innerHTML = '';

    if (!artist || !title) {
        errorMessage.innerHTML = 'Please enter both artist and title.';
        return;
    }

    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        
        if (!response.ok) {
            throw new Error('Lyrics not found. Please check the artist and title.');
        }

        const data = await response.json();
        resultDiv.innerHTML = `<h2>${title} by ${artist}</h2><pre>${data.lyrics}</pre>`;
    } catch (error) {
        errorMessage.innerHTML = error.message;
    }
}
