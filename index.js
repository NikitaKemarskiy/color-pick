// Modules
const path = require('path');

// Constants
const IMG_PATH = path.join(__dirname, 'img', 'audi.jpg');



async function main() {
    const colors = await getColors(IMG_PATH);
    
    for (let i = 0; i < colors.length - 1; i++) {

    }
    
    // FIND STATS OF ALL COLORS
    // const stats = new Map();
    
    // for (let i = 0; i < colors.length - 1; i++) {
    //     if (stats.has(colors[i])) {
    //         stats.set(colors[i], stats.get(colors[i]) + 1);
    //     } else {
    //         stats.set(colors[i], 1);
    //     }
    // }
    // console.log(stats.size);
}

main();