const inputTransX = document.getElementById("inputTransX");
const inputTransY = document.getElementById("inputTransY");
const inputScaleX = document.getElementById("inputScaleX");
const inputScaleY = document.getElementById("inputScaleY");
const inputRotate = document.getElementById("inputRotate");

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

var ScaleX = 5, ScaleY = 5
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