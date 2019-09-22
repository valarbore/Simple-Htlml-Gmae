// player is 28px*21px
function createPlayer(field){
    var maxx = field.clientWidth-28
    var maxy = field.clientHeight-21
    var x = field.clientWidth/2-14
    var y = maxy
    var velX = 0,velY = 0
    var img = new Image()
    img.src = "images/player.png"
    img.style.position = "absolute"
    // initiate player status
    var init = function () {
        img.style.left = (field.clientWidth/2-14)+"px"
        img.style.top = maxy+"px"
    }
    // 5px every 30ms
    var velocity = 5
    // bind key event to user direction key to control the player
    var bindControlKeydown =function (ev) {
        switch (ev.keyCode) {
            case 37://left
                velX = -velocity
                break
            case 38://up
                velY = -velocity
                break
            case 39://right
                velX = velocity
                break
            case 40://down
                velY = velocity
                break
        }
    }
    var bindControlKeyup = function (ev) {
        switch (ev.keyCode) {
            case 37://left
                velX = 0
                break
            case 38://up
                velY = 0
                break
            case 39://right
                velX = 0
                break
            case 40://down
                velY = 0
                break
        }
    }
    // update player's position according to velX,velY
    var updatePosition = function () {
        var nextX = x+velX
        var nextY = y+velY
        if(nextX>maxx){
            img.style.left = maxx+'px'
            x = maxx
        }else if(nextX<0){
            img.style.left = '0px'
            x = 0
        }else {
            img.style.left = nextX+'px'
            x = nextX
        }
        if(nextY>maxy){
            img.style.top = maxy+'px'
            y = maxy
        }else if(nextY<0){
            img.style.top = '0px'
            y = 0
        }else {
            img.style.top = nextY+'px'
            y = nextY
        }
    }

    return{
        // use function to get x's real value after moving
        getx:function () {
            return x
        },
        gety:function () {
            return y
        },
        img:img,
        init:init,
        updatePosition:updatePosition,
        bindControlKeydown:bindControlKeydown,
        bindControlKeyup:bindControlKeyup
    }
}
// bullet is 6px*32px
function createBullet(player,field) {
    var velY = -10
    var x = player.getx()+11
    var y = player.gety()-32
    var isVanish = false
    var img = new Image()
    img.src = "images/bullet.png"
    img.style.position = "absolute"
    img.style.left = x+"px"
    img.style.top = y+"px"
    var updatePosition = function(){
        var nextY = y+velY
        if(nextY<=-32){
            isVanish = true
        }else {
            img.style.top = y+"px"
            y = nextY
        }
    }
    return{
        getImg:function () {
            return img
        },
        isVanish:function () {
            return isVanish
        },
        updatePosition:updatePosition,
        getx:function () {
            return x
        },
        gety:function () {
            return y
        }
    }
}