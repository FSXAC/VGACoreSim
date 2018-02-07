var WIDTH = 160;
var HEIGHT = 120;
var K = 5;

var origin_x, origin_y;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class("pcanvas");

    // Set up graphics
    noSmooth();
    noStroke();
    noLoop();

    // Set up VGA Canvas
    var vga_width = WIDTH * K;
    var vga_height = HEIGHT * K;
    origin_x = width / 2 - vga_width / 2;
    origin_y = height / 2 - vga_height / 2;

    background(0);
    stroke(255);
    noFill();
    rect(origin_x, origin_y, vga_width, vga_height);
    noStroke();
    fill(255);
}

function draw() {
    // background(0);
    // ellipse(width/2, height/2, 50, 50);
    drawCircle(80, 60, 40);
}

function drawCircle(x, y, radius) {
    var offset_y = 0;
    var offset_x = radius;
    var crit = 1 - radius;
    
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
    rect(x * K + origin_x, y * K + origin_y, K, K);
}