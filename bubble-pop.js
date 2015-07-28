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

function initialPosition(direction, centerX, centerY, radius) {
    // Find a position just outside of the canvas, where immediately
    // on the next step, the bubble will be partially drawn.

    // First find how many steps would be required to get to the
    // center from each of the edges.
    var stepList = [];              // Array of step values for each edge
    var step;
    var edge;

    // Edge0 is the line x=0
    stepList[0] = (-centerX / direction.x);
    // Edge1 is the line y=0
    stepList[1] = (-centerY / direction.y);
    // Edge2 is the line x=width
    stepList[2] = (canvasWidth - centerX) / direction.x;
    // Edge3 is the line y=height
    stepList[3] = (canvasHeight - centerY) / direction.y;

    function negative(num) { return num < 0; }

    // Find the highest negative value of step.
    step = Math.max.apply(null,stepList.filter(negative));
    edge = stepList.indexOf(step);

    // Now find the point on the bubble's path that is a given
    // distance (bubble radius) from the chosen edge.  This depends on
    // which edge is chosen.
    var x, y;
    switch (edge) {
    case 0:                     // line x = 0
        // radius units above this line
        step = (-centerX - radius ) / direction.x;
        x = 0;
        y = direction.y * step + centerY;
        break;

    case 1:                     // line y = 0
        step = (-centerY - radius) / direction.y;
        x = direction.x * step + centerX;
        y = 0;
        break;

    case 2:                     // line x = width
        step = (radius + canvasWidth - centerX) / direction.x;
        x = canvasWidth;
        y = direction.y * step + centerY;
        break;

    case 3:                     // line y = height
        step = (radius + canvasHeight - centerY) / direction.y;
        x = direction.x * step + centerX;
        y = canvasHeight;
        break;
    }

    var pos = {};
    pos.x = x;
    pos.y = y;

    console.log("pos: ", pos);    
    return pos;
}

function makeBubble() {
    var direction = randomDirection();
    var slope = direction.x / direction.y;
    var radius = randomRadius();
    var bubble = {};
    var pos = initialPosition(direction, canvasWidth/2, canvasHeight/2, radius);
    bubble.initPos = pos;
    bubble.direction = direction;
    bubble.radius = radius;
    bubble.startTime = Date.now();
    bubble.popped = false;
    return bubble;
}

function clearCanvas() {
     bubble_context.clearRect(0, 0, bubble_canvas.width, bubble_canvas.height);
}

function drawBubbles() {
    // iterate through bubblesList, calculate position according to
    // time, and draw each bubble on canvas
    var timeNow = Date.now();
    var bubbleAge;
    var bubble;
    var gradient;
    for (var i = 0; i < bubblesList.length; i += 1) {
        bubble = bubblesList[i];
        if (!bubble.popped) {
            bubbleAge = timeNow - bubble.startTime;
            x = bubble.initPos.x + bubble.direction.x * bubbleAge/1000;
            y = bubble.initPos.y + bubble.direction.y * bubbleAge/1000;
            radius = bubble.radius;
            bubble_context.beginPath();
            bubble_context.arc(x, y, radius, 0, Math.PI*2, false);
            bubble_context.linewidth=5;
            bubble_context.strokeStyle="white";
            gradient = bubble_context.createRadialGradient(x,y,2*radius/3,
                                                           x,y,radius);
            gradient.addColorStop(0, "#8ED6FF");
            gradient.addColorStop(1, "#004CB3");
            bubble_context.fillStyle=gradient;
            bubble_context.fill();
            bubble_context.stroke();
        }
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}

function insideWhichBubble(x, y) {
    var bubble;
    var bubbleAge;
    var timeNow = Date.now();
    for (var i=0; i<bubblesList.length; i+=1) {
        bubble=bubblesList[i];
        bubbleAge = timeNow - bubble.startTime;
        bx = bubble.initPos.x + bubble.direction.x * bubbleAge/1000;
        by = bubble.initPos.y + bubble.direction.y * bubbleAge/1000;
        radius = bubble.radius;
        if (distance(x,y,bx,by) <= radius) {
            return i;
        }
    }
    return -1;
}

function redrawCanvas (timestamp) {
    clearCanvas();
    drawBubbles();
    window.requestAnimationFrame(redrawCanvas);
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}      

var bubblesList = [];           // List of bubble objects

var maxBubbles = 8;             // Produce no more bubbles
var minBubbles = 2;             // Produce more bubbles

var maxRadius = 50;
var minRadius = 5;

var maxSpeed = 20;
var minSpeed = 5;

var bubble_canvas = document.getElementById("bubble-pop");
var bubble_context = bubble_canvas.getContext("2d");

var canvasWidth = bubble_canvas.width;
var canvasHeight = bubble_canvas.height;

window.requestAnimationFrame(redrawCanvas);
window.setInterval(function() {
    bubblesList.push(makeBubble());
}, 5000);

bubble_canvas.addEventListener("click", function (e) {
    var pos = getMousePos(bubble_canvas, e);
    bubbleNum = insideWhichBubble(pos.x, pos.y);
    if (bubbleNum>0) {
        bubblesList[bubbleNum].popped = true;
        console.log("Pop!");
    }
    console.log(pos);
}, false); 

bubblesList.push(makeBubble());
bubblesList.push(makeBubble());
