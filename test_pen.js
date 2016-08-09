/**
 * Created by Frank on 8/7/2016.
 */

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var clickLocations = [];
var boxSize = 20;
var n = 0;
var draws = 0;
document.getElementById('canvas').onclick = function(e) {
    clickLocations.push({x:e.clientX, y:e.clientY});
    clearCanvas();
    redrawRandom();
    n = 0;
    draws = 0;
}

function redrawRandom() {
    console.log(n++);
    console.log(draws);
    redrawCanvas();
    if (draws > 10000){
        clearCanvas();
        n = 0;
        draws = 0;
    }
    setTimeout(function() {
        if ((n % 50) == 0){
            draws++;
            draws = draws + Math.random() * draws;
        }
        randomCanvas(draws);
        redrawRandom();
    }, (30));
}

function randomColor(brightness){
  function randomChannel(brightness){
    var r = 255-brightness;
    var n = 0|((Math.random() * r) + brightness);
    var s = n.toString(16);
    return (s.length==1) ? '0'+s : s;
  }
  return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
}

function clearCanvas(){
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redrawCanvas() {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    clickLocations.forEach(function(point){
        ctx.fillStyle = randomColor(0);
        //ctx.fillRect(point.x-(boxSize/2), point.y-(boxSize/2), boxSize, boxSize);
    });

}

function randomCanvas(nItems){
    var i, canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < nItems; i++){
        ctx.fillStyle = randomColor(0);
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, boxSize, boxSize);
    }

}
