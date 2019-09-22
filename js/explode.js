// 128*2048px
function createExplode(centerx, centery) {
    var x = centerx - 64
    var y = centery - 64
    var mode = 0
    var isFinished = false
    var img = new Image()
    img.src = "images/explode.png"
    img.style.position = 'absolute'
    img.style.left = x+'px'
    img.style.top = y+'px'
    img.style.clip = clipRect(0,128,128,0)
    var updateState=function () {
        mode++
        if(mode==16){
            isFinished = true
            return
        }
        img.style.left = (x-128*mode)+'px'
        img.style.clip = clipRect(0,128*(mode+1),128,128*mode)
    }
    return{
        img:img,
        updateState:updateState,
        isFinished:function () {
            return isFinished
        }
    }

}