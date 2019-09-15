// Modules
const path = require('path');

// Libs
const { getColors, getDifference, colorsToMap } = require(path.join(__dirname, 'libs', 'colors'));

// Constants
const IMG_PATH = path.join(__dirname, 'img', 'mercedes.jpg');
const MAX_DIFFERENCE = 90; // Max difference of colors

async function main() {
    const colors = await getColors(IMG_PATH); // Get the colors array
    const stats = colorsToMap(colors); // Create stats Map

    const statsSort = [...stats].sort((a, b) => {
        return a[0] - b[0];
    });

    for (let i = 1; i < statsSort.length; i++) {
        const difference = getDifference(statsSort[i][1], statsSort[i - 1][1]);
        if (difference <= MAX_DIFFERENCE) {
            statsSort.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < statsSort.length - 1; i++) {
        for (let j = i + 1; j < statsSort.length; j++) {
            const difference = getDifference(statsSort[i][1], statsSort[j][1]);
            if (difference <= MAX_DIFFERENCE) {
                statsSort.splice(j, 1);
                j--;
            }
        }
    }

    console.dir(statsSort);

    // const top = getAverage(stats, NUMBER_OF_COLORS, MAX_DIFFERENCE); // Get top colors

    // top.forEach((item) => {
    //     console.log(item);
    // });
}

main();