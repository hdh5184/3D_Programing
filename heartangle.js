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

    heartArea()
}


function heartArea(){


    degree = this.degree
    subSin = Math.sin((degree * Math.PI) / 180), subCos = Math.cos((degree * Math.PI) / 180)
    //console.log(subSin, subCos)

    point[0] = {
        x : (subCos * -ScaleX - subSin * ScaleY) * 16 + coordX,
        y : (subSin * -ScaleX + subCos * ScaleY) * 16 + coordY}
    point[1] = {
        x : (subCos * ScaleX - subSin * ScaleY) * 16 + coordX,
        y : (subSin * ScaleX + subCos * ScaleY) * 16 + coordY}
    point[2] = {
        x : (subCos * ScaleX - subSin * -ScaleY) * 16 + coordX,
        y : (subSin * ScaleX + subCos * -ScaleY) * 16 + coordY}
    point[3] = {
        x : (subCos * -ScaleX - subSin * -ScaleY) * 16 + coordX,
        y : (subSin * -ScaleX + subCos * -ScaleY) * 16 + coordY}

    heartAreaData.x = point[3].x, heartAreaData.y = point[3].y
    heartAreaData.width = ScaleX * 16 * 2
    heartAreaData.height = ScaleY * 16 * 2
    //console.log(point[3], heartAreaData)
    console.log(heartAreaData)
    
    ctx.strokeStyle = "gray", ctx.beginPath()
    ctx.moveTo(point[3].x, point[3].y), ctx.stroke()
    for (let i = 0; i < point.length; i++) {
        ctx.lineTo(point[i].x, point[i].y), ctx.stroke()
    }

    ctx.beginPath(), ctx.fillStyle = "white"
    for (let i = 0; i < point.length; i++) {
        ctx.arc(point[i].x, point[i].y, 5, 0, 2 * Math.PI)
    ctx.stroke(), ctx.fill(), ctx.beginPath()
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
    console.log(Undo, historyNum)
    console.log(heartAreaData)
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
            if(trans == 'X') if(event.deltaY < 0) TransX = parseInt(TransX += 1); else TransX = parseInt(TransX -= 1)
            if(trans == 'Y') if(event.deltaY < 0) TransY = parseInt(TransY += 1); else TransY = parseInt(TransY -= 1)
            break;
        case "Scale":
            if(trans == 'X') if(event.deltaY < 0) ScaleX = parseInt(ScaleX += 1); else ScaleX = parseInt(ScaleX -= 1)
            if(trans == 'Y') if(event.deltaY < 0) ScaleY = parseInt(ScaleY += 1); else ScaleY = parseInt(ScaleY -= 1)
            break;
        default:
            break;
    }
    console.log(ScaleX)
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

canvas.addEventListener("mousedown", function(event){
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for (let i = 0; i < point.length; i++) {
        console.log(point[i])
        if (
            (mouseX >= point[i].x - heartAreaData.resizeHandleRadius &&
            mouseX <= point[i].x + heartAreaData.resizeHandleRadius) &&
            (mouseY >= point[i].y - heartAreaData.resizeHandleRadius &&
            mouseY <= point[i].y + heartAreaData.resizeHandleRadius)
          ) {
            heartAreaData.isDragging = true;
            switch(i){
                case 0 :
                    heartAreaData.clickedResizeHandle.x = "Left"
                    heartAreaData.clickedResizeHandle.y = "Bottom"; break;
                case 1 :
                    heartAreaData.clickedResizeHandle.x = "Right"
                    heartAreaData.clickedResizeHandle.y = "Bottom"; break;
                case 2 :
                    heartAreaData.clickedResizeHandle.x = "Right"
                    heartAreaData.clickedResizeHandle.y = "Top"; break;
                case 3 :
                    heartAreaData.clickedResizeHandle.x = "Left"
                    heartAreaData.clickedResizeHandle.y = "Top"; break;
            }
            console.log(heartAreaData.clickedResizeHandle)
            ConfirmInspector("Scale")
            break
          } else {
            heartAreaData.isDragging = false;
            heartAreaData.clickedResizeHandle = {x : "", y : ""};
          }
    }

    if (mouseX >= heartAreaData.x && mouseX <= heartAreaData.x + heartAreaData.width &&
        mouseY >= heartAreaData.y && mouseY <= heartAreaData.y + heartAreaData.height) {
        heartAreaData.isDragging = true;
        heartAreaData.dragOffsetX = mouseX - heartAreaData.x;
        heartAreaData.dragOffsetY = mouseY - heartAreaData.y;
    }

    Undo.splice(historyNum + 1, Undo.length - historyNum);
    Undo.push([TransX, TransY, ScaleX, ScaleY, degree])
    historyNum++;
    console.log(historyNum)
})

canvas.addEventListener("mousemove", function(event) {
    if (heartAreaData.isDragging) {
        var mouseX = event.clientX - canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas.getBoundingClientRect().top;
  
        if (heartAreaData.clickedResizeHandle.x == "Left") {
            heartAreaData.width = heartAreaData.x + heartAreaData.width - mouseX;
            heartAreaData.x = mouseX
        }
        else if (heartAreaData.clickedResizeHandle.x == "Right") {
            heartAreaData.width = canvas.width - (canvas.width - mouseX + heartAreaData.x)
            heartAreaData.x = mouseX - heartAreaData.width;
        }
        else{
            heartAreaData.x = mouseX - heartAreaData.dragOffsetX;
        }
        ScaleX = heartAreaData.width / 2 / 16
        var subTransX = heartAreaData.width / 2 + heartAreaData.x - coordX

        if (heartAreaData.clickedResizeHandle.y == "Top") {
            heartAreaData.height = heartAreaData.y + heartAreaData.height - mouseY;
            heartAreaData.y = mouseY
        }
        else if (heartAreaData.clickedResizeHandle.y == "Bottom") {
            heartAreaData.height = canvas.height - (canvas.height - mouseY + heartAreaData.y);
            heartAreaData.y = mouseY - heartAreaData.height;
        }
        else{
            heartAreaData.y = mouseY - heartAreaData.dragOffsetY;
        }
        ScaleY = heartAreaData.height / 2 / 16
        var subTransY = heartAreaData.height / 2 + heartAreaData.y - coordY

      TransX += subTransX, TransY -= subTransY
      console.log(heartAreaData.x, heartAreaData.y)
      TMatrix[0][2] = TransX, TMatrix[1][2] = -TransY
      SMatrix[0][0] = ScaleX, SMatrix[1][1] = ScaleY

      inputTransX.value = TMatrix[0][2], inputTransY.value = TMatrix[1][2]
      inputScaleX.value = SMatrix[0][0], inputScaleY.value = SMatrix[1][1]

      hwMatrixMultiply()
      drawHeart()
    }
  });

canvas.addEventListener("mouseup", function() {
    heartAreaData.isDragging = false;

    var temp = [TransX, TransY, ScaleX, ScaleY, degree]
    var compare = false
    for (let i = 0; i < Undo[historyNum].length; i++) {
        if(Undo[historyNum][i] == temp[i]) compare = true
        else {compare = false; break}
    }
    if(compare){
        Undo.pop(), historyNum--
    }
    //console.log(Undo)
    console.log(heartAreaData)
});