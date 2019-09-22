function randomRange(min,max) {
    return Math.ceil(Math.random()*(max-min)+min)
}

function clipRect(top,right,bottom,left) {
    return "rect("+top+'px, '+right+'px, '+bottom+'px, '+left+'px)'
}