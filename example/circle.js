circleFunc = `// clear the screen with white
fillscreen(0b111);

// circle parameters
var x = 80;
var y = 60;
var radius = 40;

var offset_y = 0;
var offset_x = radius;
var crit = 1 - radius;

// fill with green color
setColor(0b001);

// circle algorithm
while (offset_y <= offset_x) {
    pixel(x + offset_x, y + offset_y);
    pixel(x + offset_y, y + offset_x);
    pixel(x - offset_x, y + offset_y);
    pixel(x - offset_y, y + offset_x);
    pixel(x - offset_x, y - offset_y);
    pixel(x - offset_y, y - offset_x);
    pixel(x + offset_x, y - offset_y);
    pixel(x + offset_y, y - offset_x);

    offset_y++;
    if (crit <= 0) {
        crit = crit + 2 * offset_y + 1;
    } else {
        offset_x--;
        crit = crit + 2 * (offset_y - offset_x) + 1;
    }
}`;

function load_exampleC() {
    return circleFunc;
}