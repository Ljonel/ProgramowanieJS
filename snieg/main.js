    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");

    const wd = window.innerWidth;
    const hg= window.innerHeight;

    canvas.width = wd;
    canvas.height = hg;

    let flakesCount = 1000; //ilosc platkow
    const limit = 2;        //wielkosc platkow
    const flakes = [];
    
    for(let i = 0; i<flakesCount; i++){
        flakes.push({
            x: Math.random()*wd,
            y: Math.random()*hg,
            r: Math.random()*limit,
            d: Math.random() + 1
        })
    }

    function drawFlakes(){
        ctx.clearRect(0,0,wd,hg);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for(let i=0; i<flakesCount; i++){
            let currentFlake = flakes[i];
            ctx.moveTo(currentFlake.x, currentFlake.y);
            ctx.arc(currentFlake.x, currentFlake.y, currentFlake.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
        requestAnimationFrame(drawFlakes);
    }


    let angle = 0;

    function moveFlakes(){
        console.log(angle);
        //angle += 0.002;
        for(let i = 0; i<flakesCount; i++){
            let currentFlake = flakes[i];
            currentFlake.x += Math.sin(angle);
            currentFlake.y += currentFlake.d,2;
            //currentFlake.y += Math.pow(currentFlake.d,2);

            if(currentFlake.y > hg){
                flakes[i] = {x: Math.random()*wd, y: 0, r: currentFlake.r, d: currentFlake.d};
            }
        }
    }

window.requestAnimationFrame(drawFlakes);

