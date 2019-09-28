// Modules
const path = require('path');
const express = require('express');

// Libs
const { getColors, pickColors, getDifference } = require(path.join(__dirname, 'libs', 'colors'));

// Constants
const IMG_PATH = path.join(__dirname, 'img', 'large.jpg');

async function main() {
    const colors = await getColors(IMG_PATH); // Get the colors array
    const picked = pickColors(colors, 64);
    return picked;
}

main();

const app = express();

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/test/colors', async (req, res) => {
    const colors = await main();
    res.end(JSON.stringify(colors));
});

app.listen(80, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`=> Server is listening at ${80} port!`);
});