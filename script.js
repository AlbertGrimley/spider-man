const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
const scoreBoard = document.getElementById('scoreBoard');

function updateScore() {
  scoreBoard.innerText = 'Score: ' + score;
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpiderMan();
    // Other game logic
  }  

let spiderMan = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    color: 'red'
  };
  
function drawSpiderMan() {
    ctx.fillStyle = spiderMan.color;
    ctx.fillRect(spiderMan.x, spiderMan.y, spiderMan.width, spiderMan.height);
}
  
function handleKeyDown(e) {
    switch(e.key) {
        case 'ArrowLeft':
        spiderMan.x -= 10;
        break;
        case 'ArrowRight':
        spiderMan.x += 10;
        break;
        case 'ArrowUp':
        spiderMan.y -= 10;
        break;
        case 'ArrowDown':
        spiderMan.y += 10;
        break;
    }
}
  
window.addEventListener('keydown', handleKeyDown);
  
gameLoop();
