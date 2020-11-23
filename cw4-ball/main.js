const coords = [];
var playable = false

window.addEventListener('DOMContentLoaded', (event) => {
    playable=true;
    const canv = document.querySelector('canvas');
    const ctx = canv.getContext('2d');

    const windowWd = window.innerWidth;
    const windowHg = window.innerHeight;

    const getRandomX = () => Math.floor(Math.random() * windowWd);
    const getRandomY = () => Math.floor(Math.random() * windowHg);
    const colors = ['red', 'red', 'red', 'red', 'red', 'red', 'green'];

    colors.forEach((color) => {
        coords.push({
            x: getRandomX(),
            y: getRandomY(),
            color,
        });
    });

    canv.width = windowWd;
    canv.height = windowHg;

    var maxX = canv.clientWidth;
    var maxY = canv.clientHeight;

    const hole = {
        x: 0,
        y: 0,
        r: 25,
    }

    const ball = {
        x: 0,
        y: 0,
        r: 4,
        speedX: 0,
        speedY: 0
    }

    ball.x = windowWd / 2 - ball.r;
    ball.y = windowHg / 2 - ball.r;


    function drawTable() {
        ctx.fillStyle = "coral";
        ctx.fillRect(0, 0, windowWd, windowHg);
    }

    function drawHole(color = "green", x, y) {

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(x, y, hole.r * 2, 0, 2 * Math.PI)
        ctx.fill();
        ctx.closePath();
    }

    function drawBall(e) {
        playable=true;
        ctx.fillStyle = "black"
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r * 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.y <= 0 + ball.r || ball.y >= windowHg - ball.r * 2) {
            ball.speedY = -ball.speedY;
        }
        if (ball.x <= 0 + ball.r || ball.x >= windowWd - ball.r * 2) {
            ball.speedX = -ball.speedX;
        }
    }

    window.addEventListener("mousemove", function (e) {
        console.log(e.clientX, e.clientY)
    })

    function checkWin() {

        coords.forEach(({
            x,
            y,
            color
        }) => {
            if (color === "green" && ball.x - ball.r >= x - hole.r && ball.x + ball.r <= x + hole.r && ball.y >= y - hole.r && ball.y + ball.r <= y + hole.r) {
                alert("YOU WIN")
                playable=false;
                ball.speedX = 0;
                ball.speedY = 0;
                ball.x = 0;
                document.querySelector('.timer').innerHTML = "00:00:00";

            } else if (color === "red" && ball.x >= x && ball.y >= y && ball.y <= y + hole.r * 2 && ball.x <= x + hole.r * 2) {
                alert("YOU LOSE")
                playable=false
                ball.speedX = 0;
                ball.speedY = 0;
                ball.x = 0;
                ball.y = 0;
                document.querySelector('.timer').innerHTML = "00:00:00";

            }

        })
    }

    function handleOrientation(event) {
        // console.log("handleOrientation -> event", event);
        var x = event.gamma; // In degree in the range [-180,180]
        var y = event.beta; // In degree in the range [-90,90]
        let xMove = x * 0.1;
        let yMove = y * 0.1;
        console.log(x, y)
        console.log(xMove, yMove)

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x > 90) {
            x = 90
        }
        if (x < -90) {
            x = -90
        }

        // To make computation easier we shift the range of
        // x and y to [0,180]
        x += 90;
        y += 90;

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball

        ball.speedX = xMove;
        ball.speedY = yMove;



    }

    function startTimer() {
        console.log("clock")
        const timer = document.querySelector('.timer').innerHTML;
        const arr = timer.split(":");
        let hours = arr[0];
        let minutes = arr[1];
        let seconds = arr[2];

        if (seconds == 59) {
            if (minutes == 59) {
                hours++;
                minutes = 0;
                if (hours < 10) hours = "0" + hours;
            } else {
                minutes++
            }
            if (minutes < 10) minutes = "0" + minutes;
            seconds = 0;
        } else {
            seconds++;
            if (seconds < 10) seconds = "0" + seconds;
        }
        document.querySelector('.timer').innerHTML = hours + ":" + minutes + ":" + seconds;
        setTimeout(startTimer, 1000);
    }


    window.addEventListener("deviceorientation", handleOrientation, true);

startTimer();

    function game() {
        drawTable();
        coords.forEach(({
            x,
            y,
            color
        }) => {
            drawHole(color, x, y);
        })
        checkWin();
        drawBall();
    }

      setInterval(game, 1000 / 60) //60fps

  
});  
