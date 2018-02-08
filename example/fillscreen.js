fsFunc = `for (var i = 0; i < 160; i++) {
    for (var j = 0; j < 120; j++) {
        var n = i % 8;
        if (n == 0) fill(0, 0, 0);
        else if (n == 1) fill(0, 0, 255);
        else if (n == 2) fill(0, 255, 0);
        else if (n == 3) fill(0, 255, 255);
        else if (n == 4) fill(255, 0, 0);
        else if (n == 5) fill(255, 0, 255);
        else if (n == 6) fill(255, 255, 0);
        else if (n == 7) fill(255, 255, 255);
        pixel(i, j);
    }
}`;

function load_exampleFS() {
    return fsFunc;
}