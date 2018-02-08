fsFunc = `for (var i = 0; i < 160; i++) {
    for (var j = 0; j < 120; j++) {
        setColor(i % 8);
        pixel(i, j);
    }
}`;

function load_exampleFS() {
    return fsFunc;
}