var reuleauxFunc = `// clear the screen with black
fillscreen(0b000);

// Center point heights
var centerX = 80;
var centerY = 60;
var diameter = 80;
var radius = Math.floor(diameter / 2);

var shiftY = Math.floor(diameter * 0.288665771484375);
var shiftTop = Math.floor(diameter * 0.57733154296875);
var bottomY = centerY + shiftY;

setColor(0b010);

function drawCircle(x, y, radius, side) {
    var offset_y = 0;
    var offset_x = radius;
    var crit = 1 - radius;

    while (offset_y <= offset_x) {
        if (side == 0) {    // Bottom
            if (y + offset_x > bottomY) {
                pixel(x + offset_y, y + offset_x);
                pixel(x - offset_y, y + offset_x);
            }
        } else if (side == 1) { // Left
            pixel(x - offset_x, y - offset_y);
            if (x - offset_y <= centerX) {
                pixel(x - offset_y, y - offset_x);
            }
        } else if (side == 2) { // Right
            pixel(x + offset_x, y - offset_y);
            if (x + offset_y >= centerX) {
                pixel(x + offset_y, y - offset_x);
            }
        }

        offset_y++;
        if (crit <= 0) {
            crit = crit + 2 * offset_y + 1;
        } else {
            offset_x--;
            crit = crit + 2 * (offset_y - offset_x) + 1;
        }
    }
}

drawCircle(centerX, centerY - shiftTop, diameter, 0);
drawCircle(centerX - radius, centerY + shiftY, diameter, 2);
drawCircle(centerX + radius, centerY + shiftY, diameter, 1);
`;

function load_exampleRT() {
    return reuleauxFunc;
}