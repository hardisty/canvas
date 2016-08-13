/**
 * Created by Frank on 8/7/2016.
 */

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var clickLocations = [];
var boxSize = 20;
var n = 0;
var draws = 0;
var pause = false;
var bump = 200;
var bumpBase = 200;
document.getElementById('canvas').onclick = function(e) {
    clickLocations.push({x:e.clientX, y:e.clientY});
    clearCanvas();
    redrawRandom();
    n = 0;
    draws = 0;
}
function updateCounter() {
    document.getElementById('lblCounter').innerHTML = n.toString();
}
function updateNumDraws() {
    document.getElementById('lblDraws').innerHTML = draws.toString();
}
function pauseIt(){
    console.log('pause');
    pause = true;
}
function unPause(){
    console.log('unpause');
    pause = false;
    redrawRandom();
}
function reset(){
    console.log('reset');
    pause = false;
    n = 0;
    draws = 1;

    clearCanvas();
    redrawRandom();
}
function redrawRandom() {
    console.log('n = ' + n++);
    console.log('nDraws = ' + draws);
    updateCounter();
    updateNumDraws();
    redrawCanvas();
    if (pause) {
        return;
    }

    setTimeout(function() {
        if ((n % bump) == 0){
            bump = Math.floor(Math.random() * bumpBase) + 100;
            draws++;
            draws += Math.floor(draws * (draws * Math.random()));
        }
        if (draws > 8000){
            clearCanvas();
            n = 0;
            draws = 0;
            reset();
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
