var mbFunc = `var iterations = 32;
var maxDistSq = 16;

var w = 4;
var h = w * HEIGHT / WIDTH;
var xmin = -(w + 0.25) / 2;
var ymin = -(h) / 2;

var xmax = xmin + w;
var ymax = ymin + h;

var dx = (xmax - xmin) / WIDTH;
var dy = (ymax - ymin) / HEIGHT;

var y = ymin;
for (var j = 0; j < HEIGHT; j++) {
    var x = xmin;
    for (var i = 0; i < WIDTH; i++) {

        // Test and iterate z = z^2 + cm does z -> infty
        var a = x;
        var b = y;
        var n = 0;

        while (n < iterations) {
            var aa = a * a;
            var bb = b * b;
            var twoab = 2 * a * b;

            a = aa - bb + x;
            b = twoab + y;
            var distance = aa + bb;

            if (distance > maxDistSq) {
                break;
            }
            n++;
        }

        if (n == iterations) {
            fill(0);
            pixel(i, j);
        } else {
            var mod = n % 8;
            var c_r = Math.floor(mod / 4);
            var c_g = Math.floor((mod / 2) % 2);
            var c_b = Math.floor(mod % 2);
            fill(
                map(c_r, 0, 1, 0, 255),
                map(c_g, 0, 1, 0, 255),
                map(c_b, 0, 1, 0, 255)
            );
            pixel(i, j);
        }

        x += dx;
    }
    y += dy;
}`;

function load_exampleMB() {
    return mbFunc;
}