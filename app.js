/* Get the canvas and its context from the DOM */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

/* starting ball position */
var x = canvas.width/2;
var y = canvas.height - 30;
/* Ball change position after every frame */
var dx = 2;
var dy = -2;

/* A function defining how to draw the ball */
function draw() {
  // Clear canvas before each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
};

/* Draws a ball on the canvas */
function drawBall() {
  // Draw a circle at x, y
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

/* Set a 10ms draw interval */
setInterval(draw, 10);
