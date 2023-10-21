
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