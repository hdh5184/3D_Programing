// 행렬 곱, 벡터 변환 수행, 하트를 그리는 함수 모음


//-----------------------하트 그리기-----------------------//


//하트 그리는 함수
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


//-----------------------행렬 곱 수행-----------------------//


//행렬 곱[MultyMatrix] = TMatrix * (RMatrix * SMatrix) 연산 함수
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


//---drawToolInspector 내 속성 변경(벡터 변환) 시 수행하는 함수 모음---//


// 이동 변환 함수
function hwTranslateMatrix(event, trans){
    TransX = parseFloat(inputTransX.value)
    TransY = parseFloat(inputTransY.value)
    
    // 마우스 휠 작동 방향에 따른 input 값 보완
    try {mouseWheelEvent(event, trans, "Trans")} catch (error) {}
    
    CompareRange("Trans")

    TMatrix[0][2] = TransX, TMatrix[1][2] = TransY
    hwMatrixMultiply()
    drawHeart()
}


// 크기(확대,축소) 변환 함수
function hwScaleMatrix(event, trans){
    ScaleX = parseFloat(inputScaleX.value)
    ScaleY = parseFloat(inputScaleY.value)
    
    // 마우스 휠 작동 방향에 따른 input 값 보완
    try {mouseWheelEvent(event, trans, "Scale")} catch (error) {}
    
    CompareRange("Scale")

    SMatrix[0][0] = ScaleX, SMatrix[1][1] = ScaleY
    hwMatrixMultiply()
    drawHeart()
}


// 회전 변환 함수
function hwRotationMatrix(event){
    degree = parseFloat(inputRotate.value)

    // 마우스 휠 작동 방향에 따른 input 값 보완
    try {if(event.deltaY < 0) degree += 1; else degree -= 1} catch (error) {}

    CompareRange("Rotate")

    radian = (degree * Math.PI) / 180
    getSin = Math.sin(radian), getCos = Math.cos(radian)

    RMatrix[0][0] = getCos, RMatrix[0][1] = getSin * -1
    RMatrix[1][0] = getSin, RMatrix[1][1] = getCos
    hwMatrixMultiply()
    drawHeart()
}


//----------------------- 이벤트 모음 및 기타 함수-----------------------//


// 이동, 크기, 회전 범위 검증, 최대값 및 최소값 내 범위로 설정하는 함수
function CompareRange(c){
    switch (c) {
        case "Trans": // -1000 ~ 1000
            if(TransX < -1000) TransX = -1000, inputTransX.value = -1000
            if(TransX > 1000) TransX = 1000, inputTransX.value = 1000
            if(TransY < -1000) TransY = -1000, inputTransY.value = -1000
            if(TransY > 1000) TransY = 1000, inputTransY.value = 1000
            break;
        case "Scale": // -40 ~ 40
            if(ScaleX < -40) ScaleX = -40, inputScaleX.value = -40
            if(ScaleX > 40) ScaleX = 40, inputScaleX.value = 40
            if(ScaleY < -40) ScaleY = -40, inputScaleY.value = -40
            if(ScaleY > 40) ScaleY = 40, inputScaleY.value = 40
            break;
        case "Rotate": // -32768 ~ 32767
            if(degree < -32768) degree = -32768, inputRotate.value = -32768
            if(degree > 32767) degree = 32767, inputRotate.value = 32767
            break;
        default:
            break;
    }
}


// 마우스 휠 작동 방향에 따른 input 값 보완하는 함수
function mouseWheelEvent(event, trans, type){
    switch (type) {
        case 'Trans':
            if(trans == 'X') if(event.deltaY < 0) TransX += 1; else TransX -= 1
            if(trans == 'Y') if(event.deltaY < 0) TransY += 1; else TransY -= 1
            break;
        case "Scale":
            if(trans == 'X') if(event.deltaY < 0) ScaleX += 1; else ScaleX -= 1
            if(trans == 'Y') if(event.deltaY < 0) ScaleY += 1; else ScaleY -= 1
            break;
        default:
            break;
    }
}


function buttonClickEvent(type, trans, PM){
    console.log("221")
    switch (type) {
        case "Trans":
            if(trans=='X') inputTransX.value = parseFloat(inputTransX.value) + PM
            if(trans=='Y') inputTransY.value = parseFloat(inputTransY.value) + PM
            hwTranslateMatrix()
            break;
        case "Scale":
            if(trans=='X') inputScaleX.value = parseFloat(inputScaleX.value) + PM
            if(trans=='Y') inputScaleY.value = parseFloat(inputScaleY.value) + PM
            hwScaleMatrix()
            break;
        case "Rotate":
            inputRotate.value = parseFloat(inputRotate.value) + PM
            hwRotationMatrix()
            break;
        default:
            break;
    }
}