/* Get the canvas and its context from the DOM */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

/* starting ball position */
var x = canvas.width/2;
var y = canvas.height - 30;
/* Ball change position after every frame */
var dx = 2;
var dy = -2;
/* Ball radius for collision detection */
var ballRadius = 10;
/* Set paddle height/width and starting position*/
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
/* Variables to hold key actions */
var rightPressed = false;
var leftPressed = false;

/* Set up bricks */
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(r=0; r<brickRowCount; r++) {
    bricks[c][r] = {x:0, y:0, status: 1};
  }
}

// Score
var score = 0;

/* A function defining how to draw the ball */
function draw() {
  // Clear canvas before each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();
  // collision detection
  if(y + dy < ballRadius){
    dy = -dy;
  } else if(y + dy > canvas.height - ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      if(y=y-paddleHeight){
        dy = -dy;
      }
    }
    else {
      alert("GAME OVER");
      document.location.reload();
    }
  }
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
    dx = -dx;
  }
  x += dx;
  y += dy;
  // paddle actions
  if(rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
};

/* Draws a ball on the canvas */
function drawBall() {
  // Draw a circle at x, y
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

/* Draws bricks on canvas */
function drawBricks() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status === 1){
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

/* Draws a paddle on the canvas*/
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

/* Draw score on the canvas */
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8 ,20);
}

/* Set listeners for key events*/
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true
  } else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  } else if(e.keyCode == 37) {
    leftPressed = false;
  }
}

/* Collision detection for bricks */
function collisionDetection(){
  for(c=0;c<brickColumnCount;c++){
    for(r=0;r<brickRowCount;r++){
      var b = bricks[c][r];
      if(b.status === 1){
        if(x > b.x && x< b.x+brickWidth && y > b.y && y < b.y+brickHeight){
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS");
            document.location.reload();
          }
        }
      }
    }
  }
}

/* Set a 10ms draw interval */
setInterval(draw, 10);
