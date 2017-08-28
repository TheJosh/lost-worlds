function getRandom(min, max) {
    return Math_random() * (max - min) + min;
}


function getRandomColor(min, max) {
    return '#'
        + Math_floor(getRandom(min, max)).toString(16)
        + Math_floor(getRandom(min, max)).toString(16)
        + Math_floor(getRandom(min, max)).toString(16);
}