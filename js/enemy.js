// 32px*32px*4
function createEnemy(field,player) {
    var maxx = field.clientWidth-32
    var x = randomRange(0,maxx)
    var y = -32
    var velX = 0
    var velY = 4
    var isVanish = false
    var mode = 0
    var img = new Image()
    img.src = "images/invader32x32x4.png"
    img.style.position = "absolute"
    img.style.left = x+'px'
    img.style.top = y+'px'
    img.style.clip = clipRect(0,32,32,0)

    var updatePosition = function () {
        mode++
        mode%=4
        var nextX = x + velX
        var nextY = y + velY
        // out the field
        if(nextY>field.clientHeight+32){
            isVanish = true
        }else {
            img.style.left = (nextX-32*mode)+'px'
            img.style.top = nextY+'px'
            img.style.clip = clipRect(0,32*(mode+1),32,32*mode)
            x = nextX
            y = nextY
        }
    }
    return{
        img:function () {
            return img
        },
        getx:function () {
            return x
        },
        gety:function () {
            return y
        },
        isVanish:function () {
            return isVanish
        },
        updatePosition:updatePosition
    }
}