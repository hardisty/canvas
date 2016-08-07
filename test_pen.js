/**
 * Created by Frank on 8/7/2016.
 */

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var clickLocations = [];
document.getElementById('canvas').onclick = function(e) {
    clickLocations.push({x:e.clientX, y:e.clientY});
    redrawCanvas();
};
function redrawCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    clickLocations.forEach(function(point){
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(point.x, point.y, 20, 20);
    });

}
