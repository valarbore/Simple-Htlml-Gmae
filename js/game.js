var intervalId
var bulletInterval
var enemyInterval

function createGame() {
    var field = document.getElementById("game")
    var player = createPlayer(field)
    field.appendChild(player.img)
    // parameters for different levels
    var levelParam = {
        enemyNum: 5,
        isEnemyChasing: false,
        isBulletChasing: false,
        enemyInterval: 1000

    }
    // store player's bullets
    var bullets = new Array()
    // store enemies
    var enemies = new Array()
    // store enemies bullet
    var enemyBullets = new Array()
    // store explodes
    var explodes = new Array()

    var init = function () {
        parameterInit()
        player.init()
        timerInit()
    }
    var parameterInit = function () {
        levelParam = {
            enemyNum: 5,
            isEnemyChasing: false,
            isBulletChasing: false,
            enemyInterval: 1000
        }
    }

    var timerInit = function () {
        // interval for game state update
        intervalId = setInterval(function () {
            // update player's state
            player.updatePosition()
            // update player's bullets state
            updatePlayerBullet()
            // update enemy's state
            updateEnemy()
            // update explode
            updateExplode()
        }, 30)
        // interval for player launching bullets
        bulletInterval = setInterval(function () {
            var bullet = createBullet(player, field)
            bullets.push(bullet)
            field.appendChild(bullet.getImg())
        }, 300)
        // interval for enemy emerge
        setEnemyInterval(levelParam.enemyInterval)
    }
    // update player's bullets' state
    var updatePlayerBullet = function () {
        var temp = new Array()
        bullets.forEach(function (value, index) {
            if (value.isVanish()) {
                temp.push(index)
            } else {
                var diedEnemy = new Array()
                // check bullet collide with enemy
                enemies.forEach(function (value1,index1) {
                    if (!value1.isVanish()) {
                        var disX = value.getx() - value1.getx()
                        var disY = value.gety() - value1.gety()
                        // detect collision
                        if (disX > -3 && disX < 35 && disY > -30 && disY < 62) {
                            // record to delete bullet
                            temp.push(index)
                            // record to delete enemy
                            diedEnemy.push(index1)
                        }
                    }
                })
                // delete died enemy and create an explode
                diedEnemy.forEach(function (value1) {
                    var tempEnemy = enemies[value1]
                    // create an explode
                    var explode = createExplode(tempEnemy.getx() + 16, tempEnemy.gety() - 16)
                    field.appendChild(explode.img)
                    explodes.push(explode)
                    // delete died enemy
                    field.removeChild(enemies[value1].img())
                    enemies.splice(value1,1)
                })
                value.updatePosition()
            }
        })
        // delete the vanished bullets
        temp.forEach(function (value) {
            field.removeChild(bullets[value].getImg())
            bullets.splice(value, 1)
        })
    }
    // update living enemy state
    var updateEnemy = function () {
        var temp = new Array()
        enemies.forEach(function (value, index) {
           if (value.isVanish()) {
                temp.push(index)
            } else {
                value.updatePosition()
            }
        })
        // delete enemy
        temp.forEach(function (value) {
            field.removeChild(enemies[value].img())
            enemies.splice(value, 1)
        })
    }
    // update explode state
    var updateExplode = function () {
        var temp = new Array()
        explodes.forEach(function (value, index) {
            if(value.isFinished()){
                temp.push(index)
            }else {
                value.updateState()
            }
        })
        temp.forEach(function (value) {
            field.removeChild(explodes[value].img)
            explodes.splice(value,1)
        })
    }
    // interval for enemy emerge
    var setEnemyInterval = function (time) {
        enemyInterval = setInterval(function () {
            var num = levelParam.enemyNum - enemies.length
            if (num > 0) {
                var enemy = createEnemy(field, player)
                field.appendChild(enemy.img())
                enemies.push(enemy)
            }
        }, time)
    }
    var bindEvent = function () {
        bindKeyEvent()
    }
    var bindKeyEvent = function () {
        // bind key event to control the player
        document.onkeydown = function (ev) {
            return player.bindControlKeydown(ev)
        }
        document.onkeyup = function (ev) {
            return player.bindControlKeyup(ev)
        }
    }
    return {
        init: init,
        bindEvent: bindEvent
    }
}


window.onload = function (ev) {
    var game = createGame()
    game.init()
    game.bindEvent()

}