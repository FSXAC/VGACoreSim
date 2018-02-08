// default resolution
var WIDTH = 160;
var HEIGHT = 120;
var K = 4;

// Default function
var functionStr = `// clear the screen with white
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
}
`;

var drawShape;
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

    // Create default draw shape function
    drawShape = Function(functionStr);
}

// Only update the canvas when mouse moves
function mouseMoved() {
    if (mouseActive()) {
        draw();
    }
}

// Forever loopding draw function
function draw() {
    noStroke();

    // Draw shape
    drawShape();

    // Draw mouse cursor helper
    drawCursorHelper();
    screenCoordToVGACoord(mouseX, mouseY);
}

function fillscreen(bitColor) {
    if (bitColor == 0) background(0)
    else if (bitColor == 1) background(0, 0, 255)
    else if (bitColor == 2) background(0, 255, 0);
    else if (bitColor == 3) background(0, 255, 255);
    else if (bitColor == 4) background(255, 0, 0);
    else if (bitColor == 5) background(255, 0, 255);
    else if (bitColor == 6) background(255, 255, 0);
    else if (bitColor == 7) background(255);
}

function setColor(bitColor) {
    if (bitColor == 0) fill(0)
    else if (bitColor == 1) fill(0, 0, 255)
    else if (bitColor == 2) fill(0, 255, 0);
    else if (bitColor == 3) fill(0, 255, 255);
    else if (bitColor == 4) fill(255, 0, 0);
    else if (bitColor == 5) fill(255, 0, 255);
    else if (bitColor == 6) fill(255, 255, 0);
    else if (bitColor == 7) fill(255);
}

function drawCursorHelper() {
    if (mouseActive()) {
        stroke(150);
        line(mouseX, 0, mouseX, height);
        line(0, mouseY, width, mouseY);
    }
}

function mouseActive() {
    return (
        mouseX >= 0 &&
        mouseX <= width &&
        mouseY >= 0 &&
        mouseY <= height
    );
}

function getShapeFunction() {
    return functionStr;
}

function pixel(x, y) {
    rect(x * K, y * K, K, K);
}

function stext(msg, x, y) {
    fill(0);
    text(msg, x * K, y * K);
}

function screenCoordToVGACoord(x, y) {
    var rel_x = Math.floor(x / K);
    var rel_y = Math.floor(y / K);
    fill(255);
    stext(rel_x + ", " + rel_y, rel_x, rel_y);
}

function setNewResolution(resMode) {
    if (resMode == 0) {
        K = 4;
        WIDTH = 160;
        HEIGHT = 120;
        setup();
    } else {
        K = 2;
        WIDTH = 320;
        HEIGHT = 240;
        setup();
    }
}

function requestDraw(code) {
    functionStr = code;
    drawShape = Function(functionStr);
    draw();
}