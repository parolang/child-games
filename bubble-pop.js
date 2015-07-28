function draw_b() {
    var bubble_canvas = document.getElementById("bubble-pop");
    var bubble_context = bubble_canvas.getContext("2d");
    bubble_context.fillRect(50, 25, 150, 100);
    for (var x=0.5; x<500; x+=10) {
        bubble_context.moveTo(x,0);
        bubble_context.lineTo(x,375);
    }

    for (var y=0.5; y<375; y+=10) {
        bubble_context.moveTo(0,y);
        bubble_context.lineTo(500,y);
    }

    bubble_context.strokeStyle = "#eee";
    bubble_context.stroke();
}

var bubblesList = [];           // List of bubble objects
var maxBubbles = 8;             // Produce no more bubbles
var minBubbles = 2;             // Produce more bubbles
var maxRadius = 250;
var minRadius = 50;
var maxSpeed = 20;
var minSpeed = 5;

function randomBetween(first, second) {
    return Math.floor(Math.random()*(first - second)) + second + 1;
}

function randomRadius() {
    return randomBetween(maxRadius, minRadius);
}

function randomDirection() {
    var speed = randomBetween(maxSpeed, minSpeed);
    var angle = Math.random() * Math.PI * 2;
    var deltaX = Math.sin(angle)*speed;
    var deltaY = Math.cos(angle)*speed;
    var direction = { x: deltaX, y: deltaY};
    return direction;
}

function makeBubble() {
    var dir = randomDirection();
    var slope = dir.x / dir.y;
    var radius = randomRadius();
    var bubble = {};
    var pos = {};
    // pos.x = -slope * radius     
}

function clearCanvas() {
     bubble_context.clearRect(0, 0, bubble_canvas.width, bubble_canvas.height);
}

function calcBubbles(timestampe) {
    
}

function drawBubbles() {
    
}

function redrawCanvas (timestamp) {
    clearCanvas();
    calcBubbles(timestamp);
    drawBubbles();
    requestAnimationFrame(redrawCanvas);
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}      

var bubble_canvas = document.getElementById("bubble-pop");
var bubble_context = bubble_canvas.getContext("2d");

bubble_canvas.addEventListener("click", function (e) {
    console.log(getMousePos(bubble_canvas, e));
}, false); 

