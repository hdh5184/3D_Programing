// 행렬 곱, 벡터 변환 수행, 하트를 그리는 함수 모음


//-----------------------하트 그리기-----------------------//


//하트 그리는 함수
function drawHeart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "red", ctx.beginPath()

    coordX = canvas.width / 2 + MultyMatrix[0][2]
    coordY = canvas.height / 2 + MultyMatrix[1][2]
    
    var localX1 = coordX, localX2 = coordX, localY1 = coordY, localY2 = coordY

    for (i = 0; i < count; i++) {
        var deg = (i / count) * 360
        radian = (deg * Math.PI) / 180
    
        sin = Math.sin(radian)
        cos1 = Math.cos(radian)
        cos2 = Math.cos(radian * 2)  
        cos3 = Math.cos(radian * 3)
        cos4 = Math.cos(radian * 4)
    
        lenX = (16 * sin ** 3)
        lenY = (((13 * cos1 - 5 * cos2 - 2 * cos3 - 1 * cos4) * -1) - 2.56 )* 1.105
        
        targetX = MultyMatrix[0][0] * lenX + MultyMatrix[0][1] * lenY + coordX
        targetY = MultyMatrix[1][0] * lenX + MultyMatrix[1][1] * lenY + coordY
    
        ctx.moveTo(coordX, coordY)
        ctx.lineTo(targetX, targetY)
        ctx.stroke()

    }
    degree = this.degree
    var point1 = {
        x : (Math.cos((degree * Math.PI) / 180) * ScaleX - Math.sin((degree * Math.PI) / 180) * ScaleX) * 16 + coordX,
        y : (Math.sin((degree * Math.PI) / 180) * ScaleY + Math.cos((degree * Math.PI) / 180) * ScaleY) * 16 + coordY}

    degree += 90
    var point2 = {
        x : (Math.cos((degree * Math.PI) / 180) * ScaleX - Math.sin((degree * Math.PI) / 180) * ScaleX) * 16 + coordX,
        y : (Math.sin((degree * Math.PI) / 180) * ScaleY + Math.cos((degree * Math.PI) / 180) * ScaleY) * 16 + coordY}

    degree += 90    
    var point3 = {
        x : (Math.cos((degree * Math.PI) / 180) * ScaleX - Math.sin((degree * Math.PI) / 180) * ScaleX) * 16 + coordX,
        y : (Math.sin((degree * Math.PI) / 180) * ScaleY + Math.cos((degree * Math.PI) / 180) * ScaleY) * 16 + coordY}

    degree += 90
    var point4 = {
        x : (Math.cos((degree * Math.PI) / 180) * ScaleX - Math.sin((degree * Math.PI) / 180) * ScaleX) * 16 + coordX,
        y : (Math.sin((degree * Math.PI) / 180) * ScaleY + Math.cos((degree * Math.PI) / 180) * ScaleY) * 16 + coordY}


    console.log(cos, sin)

    console.log(point1, point2, point3, point4)
    
    ctx.strokeStyle = "black", ctx.beginPath()
    ctx.moveTo(point1.x, point1.y), ctx.stroke()
    ctx.lineTo(point2.x, point2.y), ctx.stroke()
    ctx.lineTo(point3.x, point3.y), ctx.stroke()
    ctx.lineTo(point4.x, point4.y), ctx.stroke()
    ctx.lineTo(point1.x, point1.y), ctx.stroke()

    

    for (let i = 0; i < 100; i++) {
        var degree = (i / 100) * 360
        radian = (degree * Math.PI) / 180
    
        var sin = Math.sin(radian)
        var cos = Math.cos(radian)
        
        targetX = (cos - sin) * 50 + 100
        targetY = (sin + cos) * 50 + 100
    
        ctx.moveTo(100, 100)
        ctx.lineTo(targetX, targetY)
        ctx.stroke()
    }

    // console.log(cos, sin)

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
    console.log()
    TransX = parseFloat(inputTransX.value)
    TransY = parseFloat(inputTransY.value)

    try {console.log(event.deltaY);
        mouseWheelEvent(event, trans, "Trans");
    }
    catch (error) {
        CompareRange("Trans");
        UndoSet("Trans");
        //console.log("222")
    }
    finally {CompareRange("Trans")}

    CompareRange("Trans")

    TMatrix[0][2] = TransX, TMatrix[1][2] = TransY * -1
    hwMatrixMultiply()
    drawHeart()
}


// 크기(확대,축소) 변환 함수
function hwScaleMatrix(event, trans){
    ScaleX = parseFloat(inputScaleX.value)
    ScaleY = parseFloat(inputScaleY.value)

    try {console.log(event.deltaY); mouseWheelEvent(event, trans, "Scale")}
    catch (error) {CompareRange("Scale"); UndoSet("Scale")}
    finally {CompareRange("Scale")}

    CompareRange("Scale")

    SMatrix[0][0] = ScaleX, SMatrix[1][1] = ScaleY
    hwMatrixMultiply()
    drawHeart()
}


// 회전 변환 함수
function hwRotationMatrix(event){
    degree = parseFloat(inputRotate.value)

    try {if(event.deltaY < 0) degree += 1; else degree -= 1}
    catch (error) {CompareRange("Rotate"); UndoSet("Rotate");}
    finally {CompareRange("Rotate")}
    
    console.log(degree)
    radian = (degree * Math.PI) / 180
    getSin = Math.sin(radian), getCos = Math.cos(radian)

    RMatrix[0][0] = getCos, RMatrix[0][1] = getSin * -1
    RMatrix[1][0] = getSin, RMatrix[1][1] = getCos
    hwMatrixMultiply()
    drawHeart()
}


//----------------------------기타 함수----------------------------//


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


function ConfirmInspector(type){
    switch (type) {
        case "Trans":
            Confirm = ["Trans", parseFloat(inputTransX.value), parseFloat(inputTransY.value)];
            break;
        case "Scale":
            Confirm = ["Scale", parseFloat(inputScaleX.value), parseFloat(inputScaleY.value)];
            break;
        case "Rotate":
            Confirm = ["Rotate", parseFloat(inputRotate.value), ''];
            break;
        default: break;
    }
    console.log(Confirm)
}

function UndoSet(type){
    if(undoCheck) Undo.splice(historyNum + 1, Undo.length - historyNum); undoCheck = false

    switch (type) {
        case "Trans": 
            //console.log(Confirm), console.log(["Trans", TransX, TransY])
            if(Confirm[0] != "Trans" || Confirm[1] != TransX || Confirm[2] != TransY){
            Undo.push([Confirm[1], Confirm[2], ScaleX, ScaleY, degree])
            Confirm = ["Trans", TransX, TransY]
            historyNum += 1
            }
            break;
        case "Scale":
            //console.log(Confirm), console.log(["Scale", ScaleX, ScaleY])
            if(Confirm[0] != "Scale" || Confirm[1] != ScaleX || Confirm[2] != ScaleY){
            Undo.push([TransX, TransY, Confirm[1], Confirm[2], degree])
            Confirm = ["Scale", ScaleX, ScaleY]
            historyNum += 1
            }
            break;
        case "Rotate": 
            //console.log(Confirm), console.log(["Rotate", degree, ''])
            console.log(degree)
            if(Confirm[0] != "Rotate" || Confirm[1] != degree){
            Undo.push([TransX, TransY, ScaleX, ScaleY, Confirm[1]])
            Confirm = ["Rotate", degree, '']
            historyNum += 1;
            }
            break;
        default: break;
    }
    
    console.log(Undo)
}

function undo(){
    if(historyNum == Undo.length - 1)
    Undo.push([TransX, TransY, ScaleX, ScaleY, degree])

    console.log(Undo[historyNum])
    console.log(Undo)
    if(historyNum < 0) return

    inputTransX.value = TransX = Undo[historyNum][0]
    inputTransY.value = TransY = Undo[historyNum][1]
    inputScaleX.value = ScaleX = Undo[historyNum][2]
    inputScaleY.value = ScaleY = Undo[historyNum][3]
    inputRotate.value = degree = Undo[historyNum][4]

    //console.log(TransX, TransY, ScaleX, ScaleY, degree)

    TMatrix[0][2] = TransX, TMatrix[1][2] = TransY * -1
    SMatrix[0][0] = ScaleX, SMatrix[1][1] = ScaleY
    radian = (degree * Math.PI) / 180
    getSin = Math.sin(radian), getCos = Math.cos(radian)
    RMatrix[0][0] = getCos, RMatrix[0][1] = getSin * -1
    RMatrix[1][0] = getSin, RMatrix[1][1] = getCos

    hwMatrixMultiply(), drawHeart()

    historyNum -= 1
    undoCheck = true
    console.log(historyNum)
}


function redo(){
    console.log(historyNum[0])
    console.log(Undo[historyNum+2])
    if(historyNum >= Undo.length - 2) return

    inputTransX.value = TransX = Undo[historyNum+2][0]
    inputTransY.value = TransY = Undo[historyNum+2][1]
    inputScaleX.value = ScaleX = Undo[historyNum+2][2]
    inputScaleY.value = ScaleY = Undo[historyNum+2][3]
    inputRotate.value = degree = Undo[historyNum+2][4]

    //console.log(TransX, TransY, ScaleX, ScaleY, degree)

    TMatrix[0][2] = TransX, TMatrix[1][2] = TransY * -1
    SMatrix[0][0] = ScaleX, SMatrix[1][1] = ScaleY
    radian = (degree * Math.PI) / 180
    getSin = Math.sin(radian), getCos = Math.cos(radian)
    RMatrix[0][0] = getCos, RMatrix[0][1] = getSin * -1
    RMatrix[1][0] = getSin, RMatrix[1][1] = getCos

    hwMatrixMultiply(), drawHeart()

    historyNum += 1
    undoCheck = true
}

//----------------------------이벤트 모음----------------------------//


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

//Sapari는 숫자(e 포함)만 기입되는 'number' 타입의 input에 문자도 기입이 됨.
//replace 사용하여 숫자만 추출


canvas.addEventListener("mousedown", function(event){
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    console.log(mouseX, mouseY)
})