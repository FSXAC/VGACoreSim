var WIDTH = 160;
var HEIGHT = 120;
var K = 4;

var vga_origin_x, vga_origin_y;
var vga_width, vga_height;

function setup() {
    // Set up VGA Canvas
    vga_width = WIDTH * K;
    vga_height = HEIGHT * K;

    // DOM canvas
    canvas = createCanvas(vga_width, vga_height);
    canvas.class("pcanvas");
    canvas.parent('canvasContainer');

    // Don't automatically draw
    noLoop();

    // Clear screen
    background(0);
}

// Only update the canvas when mouse moves
function mouseMoved() {
    draw();
}

function draw() {
    background(0);
    drawCircle(80, 60, 40);

    // Draw mouse cursor helper
    drawCursorHelper();
    screenCoordToVGACoord(mouseX, mouseY);
}

function drawCursorHelper() {
    if (
        mouseX >= 0 &&
        mouseX <= width &&
        mouseY >= 0 &&
        mouseY <= height
    ) {
        stroke(150);
        line(mouseX, 0, mouseX, height);
        line(0, mouseY, width, mouseY);
    }
}

function drawCircle(x, y, radius) {
    var offset_y = 0;
    var offset_x = radius;
    var crit = 1 - radius;

    fill(0, 255, 0);
    noStroke();

    while (offset_y <= offset_x) {
        spixel(x + offset_x, y + offset_y);
        spixel(x + offset_y, y + offset_x);
        spixel(x - offset_x, y + offset_y);
        spixel(x - offset_y, y + offset_x);
        spixel(x - offset_x, y - offset_y);
        spixel(x - offset_y, y - offset_x);
        spixel(x + offset_x, y - offset_y);
        spixel(x + offset_y, y - offset_x);

        offset_y++;
        if (crit <= 0) {
            crit = crit + 2 * offset_y + 1;
        } else {
            offset_x--;
            crit = crit + 2 * (offset_y - offset_x) + 1;
        }
    }
}

function spixel(x, y) {
    rect(x * K, y * K, K, K);
}

function stext(msg, x, y) {
    text(msg, x * K, y * K);
}

function screenCoordToVGACoord(x, y) {
    var rel_x = Math.floor(x / K);
    var rel_y = Math.floor(y / K);
    fill(255);
    stext(rel_x + ", " + rel_y, rel_x, rel_y);
}