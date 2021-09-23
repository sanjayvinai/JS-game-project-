// import ball from "./ball";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;
const POSITION_LEFT = 10;
const POSITION_RIGHT = GAME_WIDTH - 10;

let score1 = 0;
let score2 = 0;

function updateScores(score1, score2){
  let first = document.getElementById('player1');
  first.innerHTML = `score: ${score1}`;

  let second = document.getElementById('player2');
  second.innerHTML = `score: ${score2}`;;
}

const ball = {
  x: GAME_HEIGHT/2,
  Y: GAME_WIDTH/2,
  size: 15,
  dx: 5,
  dy: 4,
};
 function draw(){
   ctx.beginPath();
   ctx.arc(ball.x, ball.Y, ball.size, 0, Math.PI * 2);
   ctx.fillStyle = 'red';
   ctx.fill();
}

// draw();

function windowCollision(){
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
    if(ball.x + ball.size >= canvas.width)
      score1++;
    if(ball.x - ball.size <= 0)
      score2++;
  }

  if (ball.Y + ball.size > canvas.height || ball.Y - ball.size < 0) {
    ball.dy *= -1;
  }
}

const rectl = {
  x: 10,
  y: canvas.height/2 - 25,
  width: 10,
  height: 80,
  dy: 0,
  speed: 8
}

const rectr = {
  x: GAME_WIDTH - 20,
  y: canvas.height/2 - 25,
  width: 10,
  height: 80,
  dy: 0,
  speed: 8
}

function drawrectangle(rect){
  ctx.fillStyle = 'gray';
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  draw();
  drawrectangle(rectl);
  drawrectangle(rectr);
  rectCollision();    

  ball.x += ball.dx;
  ball.Y += ball.dy;
  updateScores(score1, score2);
  windowCollision();

  requestAnimationFrame(update);
}

function rectCollision(){
  if(ball.x - ball.size <= rectl.x + rectl.width && ball.Y >= rectl.y && ball.Y <= rectl.y + rectl.height){
    ball.dx *= -1;
  }
  if(ball.x + ball.size >= rectr.x && ball.Y >= rectr.y && ball.Y <= rectr.y + rectr.height){
    ball.dx *= -1;
  }
  
}
// update();

function moveUp(rect) {
  if(rect.y <= 0){
    rect.y = 0;
    return;
  }
  rect.dy = rect.speed;
  rect.y -= rect.dy;
}

function moveDown(rect) {
  if(rect.y + rect.height >= GAME_HEIGHT){
    rect.y = GAME_HEIGHT - rect.height;
    return;
  }
  rect.dy = rect.speed;
  rect.y += rect.dy;
}

function keyDown(e) {
  if (e.key === 'ArrowUp' || e.key === 'Up') {
    moveUp(rectl);
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
    moveDown(rectl);
  } else if (e.key === 's') {
    moveDown(rectr);
  } else if (e.key === 'w') {
    moveUp(rectr);
  }
}

function keyUp(e) {
  if (
    e.key == 'Up' ||
    e.key == 'ArrowUp' ||
    e.key == 'Down' ||
    e.key == 'ArrowDown'
  ) {
    rectl.dy = 0;
  }
}


update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);