//Define Variables
var radius = 80*2;
var center_x = 175;
var center_y = 175;
var font_size = "20px";

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// hello antoine
window.__defineGetter__("hampter", function() {
  alert("我叫李");
  window.close(); 
});

// get sliders, and slider labels
var numPointsSlider = document.getElementById("points");
var numPointsLabel = document.getElementById("points-label");
var nthPointsSlider = document.getElementById("nth");
var nthPointsLabel = document.getElementById("nth-label");
var biggerSliderButton = document.getElementById("bigger");
var smallerSliderButton = document.getElementById("smaller");

function drawCircle(){
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawPoint(angle,distance,label,point_size){
    var x = center_x + radius * Math.cos(-angle*Math.PI/180) * distance;
    var y = center_y + radius * Math.sin(-angle*Math.PI/180) * distance;

    ctx.beginPath();
    ctx.arc(x, y, point_size, 0, 2 * Math.PI);
    ctx.fill();

    // ctx.font = font_size;
    // ctx.fillText(label,x + 10,y);
};

function drawLine(point1,point2){
    ctx.beginPath();
    ctx.moveTo(point1.x,point1.y);
    ctx.lineTo(point2.x,point2.y);
    ctx.stroke();
};

function createStargon(numPoints,connectEveryNth){
  numPoints = parseInt(numPoints);
  connectEveryNth = parseInt(connectEveryNth);

  // clear canvas
  ctx.clearRect(0, 0, c.width, c.height);

  drawCircle();

  // make circle size slightly smaller as number of points increases
  var circleSize = 4/(numPoints * 0.01) > 8 ? 8 : 4/(numPoints * 0.01);

  var angle = 360 / numPoints;
  for(var i = 0; i < numPoints; i++){
      drawPoint(angle * i,1,"P" + i,circleSize);
  };

  // for each point, draw a line nth next point
  for(var i = 0; i < numPoints; i++){
      var point1 = {x:center_x + radius * Math.cos(-angle*i*Math.PI/180) * 1,y:center_y + radius * Math.sin(-angle*i*Math.PI/180) * 1};
      var point2 = {x:center_x + radius * Math.cos(-angle*(i+connectEveryNth)*Math.PI/180) * 1,y:center_y + radius * Math.sin(-angle*(i+connectEveryNth)*Math.PI/180) * 1};
      drawLine(point1,point2);
  };
};

createStargon(numPointsSlider.value,nthPointsSlider.value);

// set labels to current values
numPointsLabel.innerHTML = numPointsSlider.value;
nthPointsLabel.innerHTML = nthPointsSlider.value;

// on slider change, update the number of points && the number of points to connect
numPointsSlider.oninput = function() {
  numPointsLabel.innerHTML = this.value;
  createStargon(this.value,nthPointsSlider.value);
};

nthPointsSlider.oninput = function() {
  nthPointsLabel.innerHTML = this.value;
  createStargon(numPointsSlider.value,this.value);
};

biggerSliderButton.onclick = function() {
  // add 10 to max of both sliders
  numPointsSlider.max = parseInt(numPointsSlider.max) + 10;
  nthPointsSlider.max = parseInt(nthPointsSlider.max) + 10;
};