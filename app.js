var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

/* Draw a filled red rectangle at the specified vertices*/
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

/* Draw an with center 240, 160 with begin angle of 20deg and end angle of
*  0deg, of arc length 2pi (full cicle) and in the ccw direction (true) or cw (false) */
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

/* A new rectangle with only stroke defined */
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
