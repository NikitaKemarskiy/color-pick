// Modules
const fs = require('fs');
const util = require('util');
const jpeg = require('jpeg-js');

const { promisify } = util;
const { pow } = Math;

async function getColors(imgPath) {
    const imgRaw = await promisify(fs.readFile)(imgPath);
    const imgData = jpeg.decode(imgRaw);
    const bytes = imgData.data;

    const colors = [];

    for (let i = 0; i < bytes.length; i += 4) {
        // const number = bytes[i] * pow(255, 2) +
        //                bytes[i + 1] * 255 +
        //                bytes[i + 2];
        const red = bytes[i];
        const green = bytes[i + 1];
        const blue = bytes[i + 2];
        colors.push({
            //number,
            red,
            green,
            blue
        });
    }

    // colors.sort((color1, color2) => {
    //     if (color1.number < color2.number) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // });

    return colors;
}

// Exports
module.exports = {
    getColors
};