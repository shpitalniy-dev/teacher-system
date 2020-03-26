let canvas = null;
let ctx = null;
let pi = Math.PI;
let timer = null;
let collectionBalls = [];
let temp = true;

export const init = (canv) => {
    canvas = canv;
    ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 600, 150);
};

function Ball (x, y, color, size, signX, signY, speed){
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.signX = signX;
    this.signY = signY;
    this.speed = speed;
}


const drawBall = () => {
    clearTimeout(timer);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 600, 150);
    collectionBalls.forEach((item) => {
        ctx.beginPath();
        ctx.fillStyle = item.color;

        if(item.x + item.size >= 600){
            item.signX = '-';
        }if(item.y + item.size >= 150){
            item.signY = '-';
        }if(item.y - item.size <= 0){
            item.signY = '+';
        }if(item.x - item.size <= 0){
            item.signX = '+';
        }

        if(item.signX === '+'){
            item.x = item.x + item.speed;
        }if(item.signX === '-'){
            item.x = item.x - item.speed;
        }if(item.signY === '+'){
            item.y = item.y + item.speed;
        }if(item.signY === '-'){
            item.y = item.y - item.speed;
        }

        ctx.arc(item.x, item.y, item.size, 0, pi * 2);
        ctx.fill();
    });
    timer = setTimeout(() => {
        drawBall(collectionBalls);
    }, 1);
};

export const makeBall = (e) => {
    temp = true;
    let x = e.offsetX;
    let y = e.offsetY;
    collectionBalls.forEach((item, index) => {
        if ((Math.pow((x - item.x), 2) + Math.pow((y - item.y), 2)) <= Math.pow(item.size, 2)) {
            temp = false;
            collectionBalls.splice(index, 1);
        }
    });
    if(collectionBalls.length < 5 && temp) {
        let size = Math.round(10 - 0.5 + Math.random() * (50 - 10 + 1));
        let color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        let firstSign = Math.floor(Math.random() * 2);
        let secondSign = Math.floor(Math.random() * (2));
        let signX = firstSign === 1 ? '+' : '-';
        let signY = secondSign === 1 ? '+' : '-';
        let speed = Math.floor(Math.random() * (2 - 1)) + 1;
        let ball = new Ball(x, y, color, size, signX, signY, speed);
        collectionBalls.push(ball);
        drawBall();
    }
};
