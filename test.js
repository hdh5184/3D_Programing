function UndoSet(type){
    if(undoCheck) Undo.splice(historyNum + 1, Undo.length - historyNum); undoCheck = false

    switch (type) {
        case "Trans": 
            //console.log(Confirm), console.log(["Trans", TransX, TransY])
            if(Confirm[0] != "Trans" || Confirm[1] != TransX || Confirm[2] != TransY){
            Undo.push(Confirm)
            Confirm = ["Trans", TransX, TransY]
            historyNum += 1
            }
            break;
        case "Scale":
            //console.log(Confirm), console.log(["Scale", ScaleX, ScaleY])
            if(Confirm[0] != "Scale" || Confirm[1] != ScaleX || Confirm[2] != ScaleY){
            Undo.push(Confirm)
            Confirm = ["Scale", ScaleX, ScaleY]
            historyNum += 1
            }
            break;
        case "Rotate": 
            //console.log(Confirm), console.log(["Rotate", degree, ''])
            if(Confirm[0] != "Rotate" || Confirm[1] != degree){
            Undo.push(Confirm)
            Confirm = ["Rotate", degree, '']
            historyNum += 1;
            }
            break;
        default: break;
    }
    
    console.log(Undo, historyNum, Confirm[0], Confirm)
}

function undo(){
    if(historyNum == Undo.length - 1) Undo.push(Confirm)

    console.log(Undo[historyNum])
    console.log(Undo)
    if(historyNum < 0) return

    switch (Undo[historyNum][0]) {
        case "Trans":
            inputTransX.value = Undo[historyNum][1]
            inputTransY.value = Undo[historyNum][2]
            TMatrix[0][2] = Undo[historyNum][1], TMatrix[1][2] = Undo[historyNum][2] * -1
            hwMatrixMultiply(), drawHeart()
            break;
        case "Scale":
            inputScaleX.value = Undo[historyNum][1]
            inputScaleY.value = Undo[historyNum][2]
            SMatrix[0][0] = Undo[historyNum][1], SMatrix[1][1] = Undo[historyNum][2]
            hwMatrixMultiply(), drawHeart()
            break;
        case "Rotate":
            inputRotate.value = Undo[historyNum][1]

            radian = (Undo[historyNum][1] * Math.PI) / 180
            getSin = Math.sin(radian), getCos = Math.cos(radian)
        
            RMatrix[0][0] = getCos, RMatrix[0][1] = getSin * -1
            RMatrix[1][0] = getSin, RMatrix[1][1] = getCos
            hwMatrixMultiply(), drawHeart()
            break;
        default:
            break;
    }
    historyNum -= 1
    undoCheck = true
    console.log(historyNum)
}


function redo(){
    console.log(historyNum[0])
    console.log(Undo[historyNum+2])
    if(historyNum >= Undo.length - 2) return

    switch (Undo[historyNum+2][0]) {
        case "Trans":
            inputTransX.value = Undo[historyNum+2][1]
            inputTransY.value = Undo[historyNum+2][2]
            TMatrix[0][2] = Undo[historyNum+2][1], TMatrix[1][2] = Undo[historyNum+2][2] * -1
            hwMatrixMultiply(), drawHeart()
            break;
        case "Scale":
            inputScaleX.value = Undo[historyNum+2][1]
            inputScaleY.value = Undo[historyNum+2][2]
            SMatrix[0][0] = Undo[historyNum+2][1], SMatrix[1][1] = Undo[historyNum+2][2]
            hwMatrixMultiply(), drawHeart()
            break;
        case "Rotate":
            inputRotate.value = Undo[historyNum+2][1]

            radian = (Undo[historyNum+2][1] * Math.PI) / 180
            getSin = Math.sin(radian), getCos = Math.cos(radian)
        
            RMatrix[0][0] = getCos, RMatrix[0][1] = getSin * -1
            RMatrix[1][0] = getSin, RMatrix[1][1] = getCos
            hwMatrixMultiply(), drawHeart()
            break;
        default:
            break;
    }
    historyNum += 1
    undoCheck = true
}

degree = this.degree
var point1 = {
    x : (Math.cos((degree * Math.PI) / 180) * ScaleX - Math.sin((degree * Math.PI) / 180) * ScaleY) * 16 + coordX,
    y : (Math.sin((degree * Math.PI) / 180) * ScaleY + Math.cos((degree * Math.PI) / 180) * ScaleX) * 16 + coordY}

degree += 90
var point2 = {
    x : (Math.cos((degree * Math.PI) / 180) * ScaleX - Math.sin((degree * Math.PI) / 180) * ScaleY) * 16 + coordX,
    y : (Math.sin((degree * Math.PI) / 180) * ScaleY + Math.cos((degree * Math.PI) / 180) * ScaleX) * 16 + coordY}

degree += 90    
var point3 = {
    x : (Math.cos((degree * Math.PI) / 180) * ScaleX - Math.sin((degree * Math.PI) / 180) * ScaleY) * 16 + coordX,
    y : (Math.sin((degree * Math.PI) / 180) * ScaleY + Math.cos((degree * Math.PI) / 180) * ScaleX) * 16 + coordY}

degree += 90
var point4 = {
    x : (Math.cos((degree * Math.PI) / 180) * ScaleX - Math.sin((degree * Math.PI) / 180) * ScaleY) * 16 + coordX,
    y : (Math.sin((degree * Math.PI) / 180) * ScaleY + Math.cos((degree * Math.PI) / 180) * ScaleX) * 16 + coordY}

    var point1 = {
        x : (subCos * -ScaleX + subSin * ScaleY) * 16 + coordX,
        y : (subSin * ScaleY + subCos * -ScaleX) * 16 + coordY}
    var point2 = {
        x : (subCos * ScaleX - subSin * ScaleY) * 16 + coordX,
        y : (subSin * ScaleY + subCos * ScaleX) * 16 + coordY} 
    var point3 = {
        x : (subCos * ScaleX - subSin * -ScaleY) * 16 + coordX,
        y : (subSin * -ScaleY + subCos * ScaleX) * 16 + coordY}
    var point4 = {
        x : (subCos * -ScaleX - subSin * -ScaleY) * 16 + coordX,
        y : (subSin * -ScaleY + subCos * -ScaleX) * 16 + coordY}

        var point1 = {
            x : -ScaleX,
            y : ScaleY}
        var point2 = {
            x : ScaleX,
            y : ScaleY}
        var point3 = {
            x : ScaleX,
            y : -ScaleY}
        var point4 = {
            x : -ScaleX,
            y : -ScaleY}
    
        console.log(point1, point2, point3, point4)
        
        ctx.strokeStyle = "black", ctx.beginPath()
        ctx.moveTo(point1.x + coordX, point1.y + coordY), ctx.stroke()
        ctx.lineTo(point2.x + coordX, point2.y + coordY), ctx.stroke()
        ctx.lineTo(point3.x + coordX, point3.y + coordY), ctx.stroke()
        ctx.lineTo(point4.x + coordX, point4.y + coordY), ctx.stroke()
        ctx.lineTo(point1.x + coordX, point1.y + coordY), ctx.stroke()

