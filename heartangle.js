const canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
ctx.strokeStyle = "red"; ctx.beginPath()

var coordX = canvas.width / 2,  coordY = canvas.height / 2
var targetX, targetY

var sin, cos1, cos2, cos3, cos4
var getSin, getCos
var lenX, lenY

let MultyMatrix = []
let SMatrix = [[1, 0, 0], [0, 1, 0],[0, 0, 1]]
let RMatrix = [[1, 0, 0], [0, 1, 0],[0, 0, 1]]
let TMatrix = [[1, 0, 0], [0, 1, 0],[0, 0, 1]]

var count = 1000

var ScaleX = 10, ScaleY = 10
var degree, radian
var transX = 0, transY = 0

degree = 0
radian = (degree * Math.PI) / 180
getSin = Math.sin(radian)
getCos = Math.cos(radian)

SMatrix[0][0] = ScaleX, SMatrix[1][1] = ScaleY
RMatrix[0][0] = getCos, RMatrix[0][1] = getSin * -1
RMatrix[1][0] = getSin, RMatrix[1][1] = getCos
TMatrix[0][2] = transX, TMatrix[1][2] = transY
hwMatrixMultiply()

//console.log(SMatrix, RMatrix, TMatrix, MultyMatrix)

function drawHeart(){
    coordX += MultyMatrix[0][2]
    coordY += MultyMatrix[1][2]
    
    for (i = 0; i < count; i++) {
        degree = (i / count) * 360
        radian = (degree * Math.PI) / 180
    
        sin = Math.sin(radian)
        cos1 = Math.cos(radian)
        cos2 = Math.cos(radian * 2)  
        cos3 = Math.cos(radian * 3)
        cos4 = Math.cos(radian * 4)
    
        lenX = (16 * sin ** 3)
        lenY = (13 * cos1 - 5 * cos2 - 2 * cos3 - cos4) * -1
        
        targetX = MultyMatrix[0][0] * lenX + MultyMatrix[0][1] * lenY
        targetY = MultyMatrix[1][0] * lenX + MultyMatrix[1][1] * lenY
    
        ctx.moveTo(coordX , coordY)
        ctx.lineTo(targetX + coordX, targetY + coordY)
        ctx.stroke()
    }
}

function hwMatrixMultiply(){
    MultyMatrix = []
    var tempA = [], tempB = []

    for (let i = 0; i < RMatrix.length; i++) {
        var tempA = []
        for (let j = 0; j < SMatrix[0].length; j++) {
            let elem = 0;
            for (let k = 0; k < SMatrix.length; k++) {
                elem += RMatrix[i][k] * SMatrix[k][j]
            }
            tempA.push(elem)
        }
        tempB.push(tempA)
    }

    for (let i = 0; i < TMatrix.length; i++) {
        var tempA = []
        for (let j = 0; j < tempB[0].length; j++) {
            let elem = 0;
            for (let k = 0; k < tempB.length; k++) {
                elem += TMatrix[i][k] * tempB[k][j]
            }
            tempA.push(elem)
        }
        MultyMatrix.push(tempA)
    }
}