
var intervalId
var bulletInterval
function createGame() {
    var field = document.getElementById("game")
    var player = createPlayer(field)
    field.appendChild(player.img)
    var bullets = new Array()
    var init = function () {
        player.init()
        timerInit()
    }
    var bindEvent = function () {
        bindKeyEvent()
    }
    var timerInit = function () {
        // interval for game state update
        intervalId = setInterval(function () {
            player.updatePosition()
            // update player's bullets state
            var temp = new Array()
            bullets.forEach(function (value,index) {
                if(value.isVanish()){
                    temp.push(index)
                }else {
                    value.updatePosition()
                }
            })
            // delete the vanished bullets
            temp.forEach(function (value) {
                field.removeChild(bullets[value].getImg())
                bullets.splice(value,1)
            })
        },30)
        // interval for launching bullets
        bulletInterval = setInterval(function () {
            var bullet = createBullet(player,field)
            bullets.push(bullet)
            field.appendChild(bullet.getImg())
        },300)
    }
    var bindKeyEvent = function () {
        document.onkeydown = function (ev) {
            return player.bindControlKeydown(ev)
        }
        document.onkeyup = function (ev) {
            return player.bindControlKeyup(ev)
        }
    }
    return{
        init:init,
        bindEvent:bindEvent
    }
}


window.onload = function (ev) {
    var game = createGame()
    game.init()
    game.bindEvent()

    // var playerImg = new Image()
    // playerImg.src = "images/explode.png"
    // playerImg.style.position = "absolute"
    // playerImg.x = 0
    // playerImg.y = 400
    //
    // playerImg.style.left = "0px"
    // playerImg.style.top = "400px"
    // playerImg.style.clip = "rect(0px 128px 128px 0px)"
    // playerImg.explode = 1
    // console.log(playerImg.explode)
    // var i = playerImg.explode
    // i = i+1
    // playerImg.style.clip = "rect(0px "+ i*128+"px 128px "+(i-1)*128+"px)"
    // playerImg.style.left = -1*128+"px"
    // console.log(playerImg.style.clip)
    // // console.log(playerImg.style.left)
    // // setInterval(function () {
    // //     var x = parseInt(playerImg.style.left.split("px")[0])
    // //     x+=5
    // //     playerImg.style.left = x.toString()+"px"
    // // },100)
    // // setInterval(function () {
    // //     var x = parseInt(playerImg.style.left.split("px")[0])
    // //     x+=5
    // //     playerImg.style.left = x.toString()+"px"
    // // },100)
    // document.getElementById("field").appendChild(playerImg)

}