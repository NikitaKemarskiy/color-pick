// Modules
const fs = require('fs');
const util = require('util');
const jpeg = require('jpeg-js');

const { promisify } = util;
const { sqrt, pow, floor, max } = Math;

/*
 * Get colors from JPEG image
*/
async function getColors(imgPath) {
    const imgRaw = await promisify(fs.readFile)(imgPath); // Get raw buffer
    const imgData = jpeg.decode(imgRaw); // Decode it into JPEG data buffer
    const bytes = imgData.data; // Get bytes
    const colors = [];
    const unique = new Set();
    for (let i = 0; i < bytes.length; i += 4) {
        // Count int number of RGB
        const number = bytes[i] * 255 * 255 +
                       bytes[i + 1] * 255 +
                       bytes[i + 2];
        const red = bytes[i]; // Red byte
        const green = bytes[i + 1]; // Green byte
        const blue = bytes[i + 2]; // Blue byte
        if (unique.has(number)) { continue; }
        colors.push({ // Push color into the colors array
            red,
            green,
            blue
        });
        unique.add(number);
    }
    return colors;
}

/*
 * Recursive function for picking average
 * palette of colors from the array.
 * Factor parameter is number of colors
 * that should be in final palette
*/
function pickColors(colors, factor) {
    if (colors.length === 1) { return colors; } // Colors has one item -> return it
    if (colors.length === 0) { return null; } // Colors has no items -> return null
    if (factor === 1) { return [ getAverageColor(colors) ]; } // Factor is 1 -> return average color

    const red = { min: 255, max: 0 };
    const green = { min: 255, max: 0 };
    const blue = { min: 255, max: 0 };
    colors.forEach((color) => {
        if (color.red < red.min) { red.min = color.red };
        if (color.red > red.max) { red.max = color.red };
        if (color.green < green.min) { green.min = color.green };
        if (color.green > green.max) { green.max = color.green };
        if (color.blue < blue.min) { blue.min = color.blue };
        if (color.blue > blue.max) { blue.max = color.blue };
    });
    const redDiff = red.max = red.min;
    const greenDiff = green.max = green.min;
    const blueDiff = blue.max = blue.min;
    switch (max(redDiff, greenDiff, blueDiff)) {
        case redDiff: {
            sortByColor(colors, 'red');
        }
        case greenDiff: {
            sortByColor(colors, 'green');
        }
        case blueDiff: {
            sortByColor(colors, 'blue');
        }
    }
    const arrOne = pickColors(colors.slice(0, colors.length / 2), floor(factor / 2));
    const arrTwo = pickColors(colors.slice(colors.length / 2), floor(factor / 2));
    return arrOne.concat(arrTwo);
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
 * Sort colors array by the specified color
*/
function sortByColor(colors, color) {
    switch (color) {
        case 'red': {
            colors.sort((colorOne, colorTwo) => {
                return colorOne.red - colorTwo.red;
            });
        }
        case 'green': {
            colors.sort((colorOne, colorTwo) => {
                return colorOne.green - colorTwo.green;
            });
        }
        case 'blue': {
            colors.sort((colorOne, colorTwo) => {
                return colorOne.blue - colorTwo.blue;
            });
        }
    }
}

/*
 * Function that returns average color
 * from the colors array
*/
function getAverageColor(colors) {
    const average = { red: 0, green: 0, blue: 0 };
    colors.forEach((color) => {
        average.red += color.red;
        average.green += color.green;
        average.blue += color.blue;
    });
    average.red = floor(average.red / colors.length);
    average.green = floor(average.green / colors.length);
    average.blue = floor(average.blue / colors.length);
    return average;
}

// Exports
module.exports = {
    getColors,
    getDifference,
    pickColors
};