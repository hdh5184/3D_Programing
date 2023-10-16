const canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
ctx.strokeStyle = "red";

var coordX = canvas.width / 2
var coordY = canvas.height / 2
var degree, rotate
var targetX, targetY
var count = 500

function drawHeart(){
    ctx.beginPath()
    drawLine1(50)
    drawLine1(-50)
    drawLine2(1)
    drawLine2(-1)      
}

function drawLine1(setX){
    for(i = 0; i<=count; i++){
        degree = (i / count) * 180 + 180
        rotate = (degree * Math.PI) / 180
        targetX = Math.cos(rotate) * 50 + coordX + setX
        targetY = Math.sin(rotate) * 50 + coordY

        ctx.moveTo(coordX+setX, coordY)
        ctx.lineTo(targetX,targetY)
        ctx.stroke()
    }
}

function drawLine2(PM){
    for(i = 0; i<=count; i++){
        degree = (i / count) * 180
        rotate = (degree * Math.PI) / 180
        targetX = PM * (Math.cos(rotate)+1) * 50 + coordX
        targetY = Math.sin(rotate) * 50 + coordY

        ctx.moveTo(coordX, coordY+(150/count*i))
        ctx.lineTo(targetX,coordY+(150/count*i))
        ctx.stroke()
    }
}