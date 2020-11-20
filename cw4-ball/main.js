const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');

const windowWd = window.innerWidth;
const windowHg = window.innerHeight;

canv.width = windowWd;
canv.height = windowHg;

const hole = {
    x: 0,
    y: 0,
    r: 20
}

const ball = {
    x: 0,
    y: 0,
    r: 10,
    speedX: 1,
    speedY: 1
}

ball.x = windowWd/2 - ball.r;
ball.y = windowHg/2 - ball.r;

let randomX = Math.floor(Math.random() * windowWd) + 10;
let randomY = Math.floor(Math.random() * windowHg) + 10;

function drawTable(){
    ctx.fillStyle = "coral";
    ctx.fillRect(0,0,windowWd, windowHg);
}


function drawHole(){
    console.log(randomX, randomY)
    ctx.fillStyle = 'black';
    ctx.fillRect(randomX-hole.r, randomY-hole.r, hole.r*2, hole.r*2);
}

function drawBall(){
    
    ctx.fillStyle = 'red';
    // ctx.fillRect(windowWd/2 - ball.r, windowHg/2-ball.r,ball.r*2, ball.r*2)
    ctx.fillRect(ball.x, ball.y, ball.r*2, ball.r*2 );

    ball.x += ball.speedX;
    ball.y += ball.speedY;
}


function game(){
    drawTable();
drawHole();

    drawBall();
}

setInterval(game,1000/60) //60fps
