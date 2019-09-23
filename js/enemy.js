// 32px*32px*4
// level 0 enemy 5 moving vertically; bullet moving vertically
// level 1 enemy 5 moving vertically; bullet chasing player
// level 2 enemy 10 moving vertically; bullet chasing player
// level 3 enemy 10 chasing player; bullet chasing player
function createEnemy(field, level,player) {
    var maxx = field.clientWidth - 32
    var x = randomRange(0, maxx)
    var y = -32
    var velX = 0
    var velY = 4
    var isVanish = false
    var mode = 0
    var img = new Image()
    img.src = "images/invader32x32x4.png"
    img.style.position = "absolute"
    img.style.left = x + 'px'
    img.style.top = y + 'px'
    img.style.clip = clipRect(0, 32, 32, 0)
    var chasePlayer = function () {
        if (player.getx() > x) {
            velX = 2
        } else if (player.getx() < x) {
            velX = -2
        } else {
            velX = 0
        }
    }
    var updatePosition = function () {
        if (level >= 3)
            chasePlayer()
        mode++
        mode %= 4
        // out the field
        if (y > field.clientHeight + 32) {
            isVanish = true
        } else {
            x += velX
            y += velY
            img.style.left = (x - 32 * mode) + 'px'
            img.style.top = y + 'px'
            img.style.clip = clipRect(0, 32 * (mode + 1), 32, 32 * mode)
        }
    }
    return {
        img: function () {
            return img
        },
        getx: function () {
            return x
        },
        gety: function () {
            return y
        },
        isVanish: function () {
            return isVanish
        },
        updatePosition: updatePosition
    }
}

// 9px*9px
function createEnemyBullet(enemy, field,level, player) {
    var maxX = field.clientWidth
    var maxY = field.clientHeight
    var x = enemy.getx() + 12
    var y = enemy.gety() + 36
    var velX = 0
    var velY = 6
    var isVanish = false
    var img = new Image()
    img.src = "images/enemy-bullet.png"
    img.style.position = "absolute"
    img.style.left = x + "px"
    img.style.top = y + "px"
    var chasePlayer = function () {
        if (player.getx() > x) {
            velX = 2
        } else if (player.getx() < x) {
            velX = -2
        } else {
            velX = 0
        }
    }
    var updatePosition = function () {
        if (level >= 1)
            chasePlayer()
        // bullet disappear from the field
        if (y > maxY || x < -9 || x > maxX) {
            isVanish = true
        } else {
            x += velX
            y += velY
            img.style.top = y + "px"
            img.style.left = x + "px"
        }
    }

    return {
        getImg: function () {
            return img
        },
        isVanish: function () {
            return isVanish
        },
        updatePosition: updatePosition,
        getx: function () {
            return x
        },
        gety: function () {
            return y
        }
    }
}