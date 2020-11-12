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


function drawTable(){
    ctx.fillStyle = "coral";
    ctx.fillRect(0,0,windowWd, windowHg);
}

    
function drawHole(){
    let randomX = Math.floor(Math.random() * windowWd) + 10;
    let randomY = Math.floor(Math.random() * windowHg) + 10;
    console.log(randomX, randomY)
    ctx.fillStyle = 'black';
    ctx.fillRect(randomX-hole.r, randomY-hole.r, hole.r*2, hole.r*2);
}
drawTable();
drawHole();
