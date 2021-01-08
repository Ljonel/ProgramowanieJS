const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const wd = window.innerWidth;
const hg = window.innerHeight;
canvas.width = wd;
canvas.height= hg;
let startTime = Date.now();
// console.log(Date.now())
//console.log(wd, hg)

class Canvas{
    constructor(){
        this.canvas = canvas;
        this.context = ctx;
    }
}

class Ball{
    constructor(x, y, d = 20){               //position X, position Y, diameter
        this.x = x;
        this.y = y;
        this.d = d;
        this.canvas = new Canvas();
    }

    drawBall(){
        this.canvas.context.beginPath();
        this.canvas.context.arc(this.x, this.y, this.d, 0, Math.PI*2);
        this.canvas.context.fillStyle = 'black';
        this.canvas.context.fill();
    }
    actuallOrientation(a,b){
        this.x = a;                         //set actuall ball coordinates 
        this.y = b;
    }
    getActuallOrientation(){
        return{
            a: this.x,
            b: this.y,
        }
    }
    ballStop(){
        return{
            a: this.x = 0,
            b: this.y = 0,
        }
    }
}

class Device{
    constructor(a,b){                       //it means alpha and beta
        this.a = a;
        this.b = b;
    }
    actuallOrientation(x,y){
        this.a = x;
        this.b = y;
    }
    getActuallOrientation(){
        return{
            x: this.a,
            y: this.b,
        };
    }
}

class Hole{
    constructor(x, y, color,d=30 ){
        this.x = x;
        this.y= y;
        this.d =d;
        this.color = color;
        this.canvas = new Canvas();

    }
   drawHole(){
       this.canvas.context.beginPath();
       this.canvas.context.arc(this.x, this.y, this.d, 0, Math.PI*2)
       this.canvas.context.fillStyle = this.color;
       this.canvas.context.fill();
   }
}


const gameCanvas = new Canvas();
const device = new Device(0,0);
window.addEventListener('deviceorientation', (e)=> {
    let alpha = e.alpha;
    let beta = e.beta;
    if (alpha > 90) {
        alpha = 90
    }

    device.actuallOrientation(alpha, beta);
})
const ball = new Ball(wd/2, hg/2);


const coords = [];
let wins = 0;
const getRandomX = () => Math.floor(Math.random() * (wd-80)) + 40;            //random X for hole
const getRandomY = () => Math.floor(Math.random() * (hg-80)) + 40;            //random Y for hole
const colors = ['#e65454', '#e65454', '#e65454', '#e65454', '#e65454', '#e65454', 'green'];

colors.forEach((color) => {
    const h = new Hole(getRandomX(),getRandomY(),color);            //creating random holes
    coords.push(h);                                                 //pushing them to []
    console.log(h.x, h.y)
});

console.log(coords)

function updateGame(){
    ball.canvas.context.clearRect(0,0,gameCanvas.canvas.width, gameCanvas.canvas.height);   //refreshing only ball position
    const phone = device.getActuallOrientation();
    const ballOrient = ball.getActuallOrientation();
    const ballD = ball.d;

    ballOrient.a += phone.x/20;                                     //movement
    ballOrient.b += phone.y/20;
    
    if(ballOrient.a - ballD <= 0 || ballOrient.a + ballD >= canvas.width){
            ballOrient.a -= phone.x/20;
    }
    if(ballOrient.b -ballD<= 0 || ballOrient.b + ballD >= canvas.height){
            ballOrient.b -= phone.y/20;
    }
 
    ball.actuallOrientation(ballOrient.a, ballOrient.b);
    ball.drawBall();
    coords.forEach((element) => {
       element.drawHole();                          //Draw holes on screen
    });
    checkColisions(ballOrient.a, ballOrient.b, ballD)
    window.requestAnimationFrame(updateGame);               //bez tego nie zacznie sie ruszac
 
}

function checkColisions(ballx,bally,balld){
    coords.forEach((hole) => {
            if(hole.color === "green" && ballx + balld >= hole.x && ballx + balld <= hole.x + hole.d && bally >= hole.y - hole.d && bally + ball.d <= hole.y + hole.d ){
                const time = Math.round((Date.now()-startTime)/1000);
                document.querySelector(".wins").innerHTML = "YOU WIN AFTER "+time;
                setTimeout((function() {
                    window.location.reload();
                  }), 2000);
                  ball.ballStop();
            }     
            if(hole.color === "#e65454" && ballx +balld >= hole.x && ballx + balld <= hole.x + hole.d && bally >= hole.y - hole.d && bally + ball.d <= hole.y + hole.d ){
                const time = Math.round((Date.now()-startTime)/1000) + "s";
                document.querySelector(".wins").innerHTML = "YOU LOSE AFTER " + time;
                setTimeout((function() {
                    window.location.reload();
                  }), 1000);
                  ball.ballStop();
            }           
     });
}


window.requestAnimationFrame(updateGame);
