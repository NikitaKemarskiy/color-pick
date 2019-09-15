// Modules
const fs = require('fs');
const util = require('util');
const jpeg = require('jpeg-js');

const { promisify } = util;
const { sqrt, pow, floor, ceil } = Math;

// Constants
const COEFFICIENT = 4e5; // Coefficient of pixels to skip

/*
 * Get colors from JPEG image
*/
async function getColors(imgPath) {
    const imgRaw = await promisify(fs.readFile)(imgPath); // Get raw buffer
    const imgData = jpeg.decode(imgRaw); // Decode it into JPEG data buffer
    const bytes = imgData.data; // Get bytes
    const { width, height } = imgData;
    const skip = ceil(width * height / COEFFICIENT);
    const colors = [];
    for (let i = 0; i < bytes.length; i += 4 * (skip + 1)) {
        // Count int number of RGB
        const number = bytes[i] * 255 * 255 +
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

/*
 * Get euclidean distance between two colors
*/
function getDifference(colorOne, colorTwo) {
    // Count euclidean distance
    const difference = sqrt(pow(colorOne.red - colorTwo.red, 2) +
                            pow(colorOne.green - colorTwo.green, 2) +
                            pow(colorOne.blue - colorTwo.blue, 2));
    return floor(difference);
}

/*
 * Convert colors array to map where
 * key is number and value is data
*/
function colorsToMap(colors) {
    const stats = new Map(); // Create stats Map
    for (let i = 0; i < colors.length - 1; i++) {
        if (stats.has(colors[i].number)) { // Color is already in Map
            const data = stats.get(colors[i].number); // Get value object
            data.count++; // Increment count (number of repeats)
        } else {
            const { red, green, blue } = colors[i];
            stats.set(colors[i].number, { // Set value object
                red,
                green,
                blue,
                count: 1
            });
        }
    }
    return stats;
}

// Exports
module.exports = {
    getColors,
    getDifference,
    colorsToMap
};