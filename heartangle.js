// 행렬 곱, 벡터 변환 수행, 하트를 그리는 함수 모음

//하트 그리기
function drawHeart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height), ctx.beginPath()
    coordX = canvas.width / 2 + MultyMatrix[0][2]
    coordY = canvas.height / 2 + MultyMatrix[1][2]
    
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
        
        targetX = MultyMatrix[0][0] * lenX + MultyMatrix[0][1] * lenY + coordX
        targetY = MultyMatrix[1][0] * lenX + MultyMatrix[1][1] * lenY + coordY
    
        ctx.moveTo(coordX , coordY)
        ctx.lineTo(targetX, targetY)
        ctx.stroke()
    }
}


//행렬 곱[MultyMatrix] = TMatrix * (RMatrix * SMatrix)
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


// drawToolInspector 내 속성 변경(벡터 변환) 시 수행하는 메서드 모음
// 행렬 곱 수행 후 하트 그리기

// 이동 변환
function hwTranslateMatrix(){
    TMatrix[0][2] = parseInt(inputTransX.value)
    TMatrix[1][2] = parseInt(inputTransY.value)
    hwMatrixMultiply()
    drawHeart()
}


// 확대,축소 변환
function hwScaleMatrix(){
    SMatrix[0][0] = parseInt(inputScaleX.value)
    SMatrix[1][1] = parseInt(inputScaleY.value)
    hwMatrixMultiply()
    drawHeart()
}


// 회전 변환
function hwRotationMatrix(){
    degree = parseInt(inputRotate.value)
    radian = (degree * Math.PI) / 180
    getSin = Math.sin(radian), getCos = Math.cos(radian)

    RMatrix[0][0] = getCos, RMatrix[0][1] = getSin * -1
    RMatrix[1][0] = getSin, RMatrix[1][1] = getCos
    hwMatrixMultiply()
    drawHeart()
}