const BIN_ID = '6a4fc042da38895dfe46a9b3';
const API_KEY = '$2a$10$jcugQ8wUEeRwHJkkd5a25uugqFdI.I5KbBrnMCWZJls9dFa4DvG36';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const HEADERS = { 'Content-Type': 'application/json', 'X-Access-Key': API_KEY };

async function getEntries() {
    const res = await fetch(BIN_URL + '/latest', { headers: HEADERS });
    const data = await res.json();
    return data.record.entries || [];
}

async function saveEntry(entry) {
    const entries = await getEntries();
    entries.push(entry);
    await fetch(BIN_URL, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({ entries })
    });
}
