//Define Variables
var radius = 80;
var point_size = 4;
var center_x = 150;
var center_y = 150;
var font_size = "20px";

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// function close that will close tab
window.__defineGetter__("hampter", function() { alert("我叫李"); });

function drawCircle(){
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawPoint(angle,distance,label){
    var x = center_x + radius * Math.cos(-angle*Math.PI/180) * distance;
    var y = center_y + radius * Math.sin(-angle*Math.PI/180) * distance;

    ctx.beginPath();
    ctx.arc(x, y, point_size, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = font_size;
    ctx.fillText(label,x + 10,y);
};

drawCircle();

function drawPoints(numPoints,connectEveryNth){
  // clear canvas
  ctx.clearRect(0, 0, c.width, c.height);

  drawCircle();

  var angle = 360 / numPoints;
  for(var i = 0; i < numPoints; i++){
      drawPoint(angle * i,1,"P" + i);
  };

  // draw a line between every point, and the nth point after it

};