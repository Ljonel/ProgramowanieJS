const coords = [];

window.addEventListener('DOMContentLoaded', (event) => {
    const canv = document.querySelector('canvas');
    const ctx = canv.getContext('2d');

    const windowWd = window.innerWidth;
    const windowHg = window.innerHeight;

    const getRandomX = () => Math.floor(Math.random() * windowWd) + 10;
    const getRandomY = () => Math.floor(Math.random() * windowHg) + 10;
    const colors = ['red', 'red', 'red','red', 'red', 'red', 'green'];

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
        r: 20,
    }

    const ball = {
        x: 0,
        y: 0,
        r: 10,
        speedX: 1,
        speedY: 1
    }

    ball.x = windowWd / 2 - ball.r;
    ball.y = windowHg / 2 - ball.r;

    // let randomX = Math.floor(Math.random() * windowWd) + 10;
    // let randomY = Math.floor(Math.random() * windowHg) + 10;


    function drawTable() {
        ctx.fillStyle = "coral";
        ctx.fillRect(0, 0, windowWd, windowHg);
    }


    function drawHole(color = "green", x,y) {
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(x, y, hole.r * 2, 0, 2 * Math.PI)
        ctx.fill();
        // ctx.closePath();
    }

    function drawBall(e) {
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

    function handleOrientation(event){
        console.log("handleOrientation -> event", event);
        var x = event.beta;  // In degree in the range [-180,180]
        var y = event.gamma; // In degree in the range [-90,90]

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x >  90) { x =  90};
        if (x < -90) { x = -90};

        // To make computation easier we shift the range of
        // x and y to [0,180]
        x += 90;
        y += 90;

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        console.log("handleOrientation -> (maxY * y / 180 - 10)", (maxY * y / 180 - 10));
        console.log("handleOrientation -> (maxX * x / 180 - 10)", (maxX * x / 180 - 10));
        ball.x = (maxY * y / 180 - 10);
        ball.y = (maxX * x / 180 - 10);
    }

    window.addEventListener("deviceorientation", handleOrientation, true);


    coords.forEach(({ x, y, color }) => {
        drawHole(color, x, y);
    })

    function game() {
        drawTable();
        coords.forEach(({ x, y, color }) => {
            drawHole(color, x, y);
        })
        drawBall();
    }

    setInterval(game, 1000 / 60) //60fps
});
