/**
 * Created by Frank on 8/7/2016.
 */

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var clickLocations = [];
var boxSize = 20;
var n = 0;
var items = 0;
var maxItems = 2000;
var pause = false;
var bump = 100;
var bumpBase = 200;

var minHue = 1;
var maxHue = 360;
var minSaturation = 0;
var maxSaturation = 100;
var minLightness = 0;
var maxLightness = 100;
//unlike the others, alpha is floating point
var minAlpha = 0;
var maxAlpha = 1;

var currMinHue = 1;
var currMaxHue = 360;
var currMinSaturation = 0;
var currMaxSaturation = 100;
var currMinLightness = 0;
var currMaxLightness = 100;
var currMinAlpha = 0;
var currMaxAlpha = 1;




document.getElementById('canvas').onclick = function(e) {
    clickLocations.push({x:e.clientX, y:e.clientY});
    clearCanvas();
    redrawRandom();
    n = 0;
    items = 0;
}
function updateCounter() {
    document.getElementById('lblCounter').innerHTML = n.toString();
}
function updateNumItems() {
    document.getElementById('lblItems').innerHTML = items.toString();
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
    items = 1;

    clearCanvas();
    redrawRandom();
}
function redrawRandom() {
    n++;
    updateCounter();
    updateNumItems();
    redrawCanvas();
    if (pause) {
        return;
    }

    setTimeout(function() {
        function adjustColorRanges() {
            var which = randInt(0, 4);
            if (which == 0) {
                console.log('hue');
                currMinHue = rand(minHue, currMaxHue);
                currMaxHue = rand(currMinHue, maxHue);
            } else if (which == 1) {
                console.log('saturation');
                currMinSaturation = rand(minSaturation, currMaxSaturation);
                currMaxSaturation = rand(currMinSaturation, maxSaturation);
            } else if (which == 2) {
                console.log('brightness');
                currMinLightness = rand(minLightness, currMaxLightness);
                currMaxLightness = rand(currMinLightness, maxLightness);
            } else if (which == 3) {
                console.log('alpha');
                currMinAlpha = rand(minAlpha, currMaxAlpha);
                currMaxAlpha = rand(currMinAlpha, maxAlpha);
            }
        }

        if ((n % bump) == 0){
            bump = Math.floor(Math.random() * bumpBase) + 100;
            items++;
            items += Math.floor((items * Math.random()));
            adjustColorRanges();
        }
        if (items > maxItems){
            clearCanvas();
            n = 0;
            items = 0;
            reset();
        }
        randomCanvas(items);
        redrawRandom();
    }, (30));
}
function rand(min, max) {
    return min + Math.random() * (max - min);
}
function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}
function randomColor() {
    var h = rand(currMinHue, currMaxHue);
    var s = rand(currMinSaturation, currMaxSaturation);
    var l = rand(currMinLightness, currMaxLightness);
    var a = rand(currMinAlpha, currMaxAlpha);
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' +  a + ')';
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
        ctx.fillStyle = randomColor();
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
