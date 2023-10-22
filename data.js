// 하트 그리기를 수행하는 데 필요한 데이터 모음

// drawToolInspector 속성 값을 받아올 각 Input 박스 연결
const inputTransX = document.getElementById("inputTransX"); // 이동 X
const inputTransY = document.getElementById("inputTransY"); // 이동 Y
const inputScaleX = document.getElementById("inputScaleX"); // 크기 X
const inputScaleY = document.getElementById("inputScaleY"); // 크기 Y
const inputRotate = document.getElementById("inputRotate"); // 회전(단위각)


// 하트를 그릴 캔버스 설정
const canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
ctx.strokeStyle = "red"; ctx.lineWidth = 1; ctx.beginPath()


// 하트 중심 초기 설정 (캔버스 X : 300, Y : 300 위치를 중심으로 함)
var coordX = canvas.width / 2,  coordY = canvas.height / 2 // 하트의 중심 (이동 변환 시 위치 변환)


// 하트 그리기 작업에 필요한 변수 선언
var count = 1000                // 선 그리기 반봇 횟수
var sin, cos1, cos2, cos3, cos4 // 하트 모양을 만드는 데 필요한 sin, cos 모음
var lenX, lenY                  // 하트를 그릴 각 좌표의 길이
var targetX, targetY            // 하트 중심으로부터 선을 그릴 위치 지정


// 속성 초기 설정
var ScaleX = 5, ScaleY = 5  // 크기
var TransX = 0, TransY = 0  // 이동
var degree = 0, radian = (degree * Math.PI) / 180       // 각도 및 라디안 설정
var getSin = Math.sin(radian), getCos = Math.cos(radian)// sin, cos 값


// 행렬 모음
let TMatrix = [[1, 0, TransX], [0, 1, TransY],[0, 0, 1]]// 이동 변환 행렬
let SMatrix = [[ScaleX, 0, 0], [0, ScaleY, 0],[0, 0, 1]]// 크기 변환 행렬
let RMatrix = [[getCos, getSin * -1, 0], [getSin, getCos, 0],[0, 0, 1]]//회전 변환 행렬


// 행렬 곱 수행
let MultyMatrix = []    // 행렬 곱 행렬
hwMatrixMultiply()      // 행렬 곱 수행