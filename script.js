const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function updateAndDrawWeb() {
  if (spiderMan.isShootingWeb) {
      // Extend the web until it reaches its maximum length
      if (spiderMan.webLength < spiderMan.maxWebLength) {
          spiderMan.webLength += spiderMan.webRetractSpeed;
      }
      else{ 
        spiderMan.isShootingWeb = false;
        spiderMan.isRetractingWeb = true;
      }
  }
  if (spiderMan.isRetractingWeb) {
    // Start retracting the web
      spiderMan.webLength -= spiderMan.webRetractSpeed;

      // Stop shooting web when it's fully retracted
      if (spiderMan.webLength <= 0) {
          spiderMan.isRetractingWeb = false;
      }
  }

  // Draw the web
  ctx.beginPath();
  ctx.moveTo(spiderMan.x + spiderMan.width / 2, spiderMan.y); // Start from Spider-Man's position
  ctx.lineTo(spiderMan.x + spiderMan.width / 2, spiderMan.y - spiderMan.webLength); // Draw line upwards
  ctx.strokeStyle = 'black'; // Color of the web
  ctx.stroke();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBuildings();
  updateAndDrawWeb();
  updateSpiderMan();
  drawSpiderMan();
}

function updateSpiderMan() {
  if (spiderMan.isJumping) {
      spiderMan.y += spiderMan.velocityY;
      spiderMan.velocityY += spiderMan.gravity; // Gravity pulls him down

      // Check if Spider-Man has landed
      if (spiderMan.y > canvas.height - spiderMan.height) {
          spiderMan.y = canvas.height - spiderMan.height; // Adjust to ground level
          spiderMan.isJumping = false; // Stop jumping
      }
  }

  drawSpiderMan();
}

let spiderMan = {
  x: 500,        // Initial horizontal position
  y: canvas.height-50,        // Initial vertical position
  width: 50,     // Width of the Spider-Man sprite
  height: 50,    // Height of the Spider-Man sprite
  color: 'red',  // This can be a placeholder if you're using an image
  isJumping: false, // To track whether Spider-Man is currently jumping
  jumpSpeed: 20,
  gravity: 2,
  velocityY: 0,
  isShootingWeb: false,
  isRetractingWeb: false,
  webLength: 0,
  maxWebLength: 150, // This can be adjusted
  webRetractSpeed: 5, // Speed of web retraction
};

let spiderManImage = new Image();
spiderManImage.src = 'images/spider-man.png';

let buildingImage = new Image();
buildingImage.src = 'images/building.png';

function drawSpiderMan() {
  ctx.drawImage(spiderManImage, spiderMan.x, spiderMan.y, spiderMan.width, spiderMan.height);
}

let buildings = [];

function createBuildings() {
  // Create buildings at different locations
  for (let i = 0; i < 3; i++) {
    buildings.push({
      x: i * 600 + 200,
      y: canvas.height - 300, // Adjust height as needed
      width: 100,
      height: 300
    });
  }
}

function drawBuildings() {
  buildings.forEach(building => {
    ctx.drawImage(buildingImage, building.x, building.y, building.width, building.height);
  });
}

createBuildings();

function jump() {
  if (!spiderMan.isJumping) {
      spiderMan.isJumping = true;
      spiderMan.velocityY = -spiderMan.jumpSpeed; // Negative for upward movement
  }
}

function shootWeb() {
  if (!spiderMan.isShootingWeb) {
      spiderMan.isShootingWeb = true;
      spiderMan.webLength = 0;
  }
}
  
function handleKeyDown(e) {
  const moveSpeed = 10;  // Adjust the speed as necessary
  const jumpHeight = 20; // Adjust the height of the jump

  switch(e.key) {
      case 'ArrowLeft':
          // Move Spider-Man to the left
          spiderMan.x -= moveSpeed;
          break;
      case 'ArrowRight':
          // Move Spider-Man to the right
          spiderMan.x += moveSpeed;
          break;
      case 'ArrowUp':
          jump();
          break;
      case 'ArrowDown':
          // Optional: Crouch or descend faster while swinging
          break;
      case 'w': // Example key for shooting web
          shootWeb(); // Function to handle web-slinging
          break;
  }
}

window.addEventListener('keydown', handleKeyDown);

gameLoop();