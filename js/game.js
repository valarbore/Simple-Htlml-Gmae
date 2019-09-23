var intervalId
var bulletInterval
var enemyInterval
var enemyBulletInterval
// enemy 10 point
// level 0 0-50
// level 1 50-150
// level 2 150-300
// level 3 300-???
function createGame() {
    var field = document.getElementById("game")
    var player = createPlayer(field)
    field.appendChild(player.img)
    // parameters for different levels
    var isGameOver = false
    var bestScore = 0
    var bestScoreDom = document.getElementById("bestScore")
    var score = 0
    var scoreDom = document.getElementById("score")
    var level = 0
    var levelDom = document.getElementById("level")
    var levelParam = {
        enemyNum: 5,
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
        // set bestScore from localStorage
        console.log(localStorage)
        var best = localStorage.getItem("bestScore");
        console.log(best)
        if (best)
            bestScore = parseInt(best)
        else bestScore = 0
        bestScoreDom.innerText = "BestScore: " + bestScore
        score = 0
        scoreDom.innerText = "Score: " + score
        scoreDom.style.color = 'white'
        // set game difficulty level
        level = 0
        levelDom.innerText = "Level: " + level
        levelParam = {
            enemyNum: 5,
            enemyInterval: 1000
        }
        // set isGameOver to false
        isGameOver = false
    }
    var clearTimer = function () {
        clearInterval(intervalId)
        clearInterval(bulletInterval)
        clearInterval(enemyInterval)
        clearInterval(enemyBulletInterval)
    }
    var timerInit = function () {
        // interval for game state update
        intervalId = setInterval(function () {
            if (isGameOver) {
                if (explodes.length == 0)
                    clearTimer()
                //game over
                document.getElementById("gameOver").style.display = "block"
                if (score > bestScore)
                    localStorage.setItem("bestScore", score)
            } else {
                // update player's state
                player.updatePosition()
                // update player's bullets state
                updatePlayerBullet()
                // update enemy's state
                updateEnemy()
                // update enemyBullet state
                updateEnemyBullet()
            }
            // update explode
            updateExplode()
        }, 30)
        // interval for player launching bullets
        setBulletInterval()
        // interval for enemy emerge
        setEnemyInterval(levelParam.enemyInterval)
        // interval for enemy bullet
        setEnemyBulletInterval()
    }
    // update player's bullets' state
    var updatePlayerBullet = function () {
        var temp = new Array()
        bullets.forEach(function (value, index) {
            if (value.isVanish()) {
                temp.push(index)
            } else {
                if (checkKillEnemy(value)) {
                    temp.push(index)
                } else {
                    value.updatePosition()
                }
            }
        })
        // delete the vanished bullets
        temp.forEach(function (value) {
            field.removeChild(bullets[value].getImg())
            bullets.splice(value, 1)
        })
    }
    // check whether the bullet kill the enemy
    var checkKillEnemy = function (bullet) {
        var diedEnemy = new Array()
        // check bullet collide with enemy
        enemies.forEach(function (value1, index1) {
            if (!value1.isVanish()) {
                var disX = bullet.getx() - value1.getx()
                var disY = bullet.gety() - value1.gety()
                // detect collision
                if (disX > -3 && disX < 35 && disY > -30 && disY < 62) {
                    // record to delete enemy
                    diedEnemy.push(index1)
                }
            }
        })
        // delete died enemy and create an explode
        diedEnemy.forEach(function (value1) {
            var tempEnemy = enemies[value1]
            // create an explode
            createExplodeAtPosition(tempEnemy.getx() + 16, tempEnemy.gety() + 16)
            //add score
            addScore()
            // delete died enemy
            field.removeChild(enemies[value1].img())
            enemies.splice(value1, 1)
        })
        if (diedEnemy.length > 0) return true
        return false
    }
    // add score
    // enemy 10 point
    // level 0 0-50
    // level 1 50-150
    // level 2 150-300
    // level 3 300-???
    var addScore = function () {
        score += 10
        scoreDom.innerText = "Score: " + score
        // set game difficulty level
        if (score <= 50) {
            level = 0
        } else if (score > 50 && score <= 150) {
            level = 1
        } else if (score > 150 && score <= 300) {
            level = 2
            levelParam.enemyNum = 10
            levelParam.enemyInterval = 500
            clearInterval(enemyInterval)
            setEnemyInterval(levelParam.enemyInterval)
        } else {
            level = 3
        }
        levelDom.innerText = "Level: " + level
        // update bestScore
        if (score > bestScore) {
            scoreDom.style.color = 'red'
            // todo bestScore
        }
    }
    // update living enemy state
    var updateEnemy = function () {
        var temp = new Array()
        enemies.forEach(function (value, index) {
            if (value.isVanish()) {
                temp.push(index)
            } else {
                if (checkEnemyCollideWithPlayer(value)) {
                    temp.push(index)
                } else {
                    value.updatePosition()
                }
            }
        })
        // delete enemy
        temp.forEach(function (value) {
            field.removeChild(enemies[value].img())
            enemies.splice(value, 1)
        })
    }
    // check collision with player
    var checkEnemyCollideWithPlayer = function (enemy) {
        if (!enemy.isVanish() && !isGameOver) {
            var disX = enemy.getx() - player.getx()
            var disY = enemy.gety() - player.gety()
            if (disX >= -30 && disX <= 30 && disY <= 30 && disY >= -20) {
                // create explodes
                createExplodeAtPosition(enemy.getx() + 16, enemy.gety() + 16)
                createExplodeAtPosition(player.getx() + 14, enemy.gety() + 10)
                isGameOver = true
                player.die()
                return true
            }
        }
        return false
    }
    // update enemy bullet
    var updateEnemyBullet = function () {
        var temp = new Array()
        enemyBullets.forEach(function (value, index) {
            if (value.isVanish()) {
                temp.push(index)
            } else {
                // check collision with player
                if (checkBulletCollideWithPlayer(value)) {
                    temp.push(index)
                } else {
                    value.updatePosition()
                }
            }
        })
        // delete enemy
        temp.forEach(function (value) {
            field.removeChild(enemyBullets[value].getImg())
            enemyBullets.splice(value, 1)
        })
    }
    var checkBulletCollideWithPlayer = function (bullet) {
        if (!bullet.isVanish() && !isGameOver) {
            var disX = bullet.getx() - player.getx()
            var disY = bullet.gety() - player.gety()
            if (disX >= -9 && disX <= 28 && disY <= 21 && disY >= -9) {
                // create explodes
                createExplodeAtPosition(player.getx() + 14, player.gety() + 10)
                isGameOver = true
                player.die()
                return true
            }
        }
        return false
    }
    // update explode state
    var updateExplode = function () {
        var temp = new Array()
        explodes.forEach(function (value, index) {
            if (value.isFinished()) {
                temp.push(index)
            } else {
                value.updateState()
            }
        })
        temp.forEach(function (value) {
            field.removeChild(explodes[value].img)
            explodes.splice(value, 1)
        })
    }
    // interval for player launching bullets
    var setBulletInterval = function () {
        bulletInterval = setInterval(function () {
            var bullet = createBullet(player)
            bullets.push(bullet)
            field.appendChild(bullet.getImg())
        }, 300)
    }
    // interval for enemy emerge
    var setEnemyInterval = function (time) {
        enemyInterval = setInterval(function () {
            var num = levelParam.enemyNum - enemies.length
            if (num > 0) {
                var enemy = createEnemy(field, level, player)
                field.appendChild(enemy.img())
                enemies.push(enemy)
            }
        }, time)
    }
    // interval for enemy bullet
    var setEnemyBulletInterval = function () {
        enemyBulletInterval = setInterval(function () {
            enemies.forEach(function (value) {
                if (!value.isVanish()) {
                    var bullet = createEnemyBullet(value, field, level, player)
                    enemyBullets.push(bullet)
                    field.appendChild(bullet.getImg())
                }
            })
        }, 1500)
    }
    var createExplodeAtPosition = function (x, y) {
        var explode = createExplode(x, y)
        field.appendChild(explode.img)
        explodes.push(explode)
    }
    var bindEvent = function () {
        bindKeyEvent()
        bindPlayAgain()
    }
    var bindPlayAgain = function () {
        var playAgain = document.getElementById("playAgain")
        playAgain.onclick = function (ev) {
            document.getElementById("gameOver").style.display = "none"
            clearField()
            init()
        }
    }
    var clearField = function () {
        bullets.forEach(function (value) {
            field.removeChild(value.getImg())
        })
        bullets = new Array()
        enemies.forEach(function (value) {
            field.removeChild(value.img())
        })
        enemies = new Array()
        enemyBullets.forEach(function (value) {
            field.removeChild(value.getImg())
        })
        enemyBullets = new Array()
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