// Modules
const fs = require('fs');
const util = require('util');
const jpeg = require('jpeg-js');

const { promisify } = util;
const { sqrt, pow, floor } = Math;

// Get colors from JPEG image
async function getColors(imgPath) {
    const imgRaw = await promisify(fs.readFile)(imgPath); // Get raw buffer
    const imgData = jpeg.decode(imgRaw); // Decode it into JPEG data buffer
    const bytes = imgData.data; // Get bytes

    const colors = [];

    for (let i = 0; i < bytes.length; i += 4) {
        // Count int number of RGB
        const number = bytes[i] * pow(255, 2) +
                       bytes[i + 1] * 255 +
                       bytes[i + 2];
        const red = bytes[i]; // Red byte
        const green = bytes[i + 1]; // Green byte
        const blue = bytes[i + 2]; // Blue byte
        colors.push({ // Push color into the colors array
            number,
            red,
            green,
            blue
        });
    }

    return colors;
}

// Get top colors from the stats Map
function getTop(stats, amount) {
    const top = []; // Array of the top colors
    for (let i = 0; i < amount; i++) {
        let maxCount = 0;
        let maxKey;
        stats.forEach((value, key) => { // For every color
            if (value.count > maxCount) { // Count of current color is greater than maxCount
                maxCount = value.count; // Reassign maxCount
                maxKey = key; // Reassign maxKey
            }
        });
        const color = stats.get(maxKey); // Get maxCount color data
        stats.delete(maxKey); // Delete this color
        top.push(Object.assign(color, { number: maxKey })); // Insert obj with color data into the top array
    }
    return top;
}

// Get euclidean distance between two colors
function getDifference(colorOne, colorTwo) {
    // Count euclidean distance
    const difference = sqrt(pow(colorOne.red - colorTwo.red, 2) +
                            pow(colorOne.green - colorTwo.green, 2) +
                            pow(colorOne.blue - colorTwo.blue, 2));
    return floor(difference);
}

// Exports
module.exports = {
    getColors,
    getTop,
    getDifference
};