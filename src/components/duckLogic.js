// Duck state
let duckX = 50; // x position as percentage
let facingLeft = true; // which way duck is facing
let lastDirectionChange = Date.now(); // when duck last changed direction
let movingDirection = -1; // -1 for left, 1 for right
let currentFrame = 1; // track which sprite frame we're showing
let energyLevel = 1; // energy level from 1-5

function initializeDuck() {
  const duck = document.getElementById("duck");
  duck.style.backgroundImage = `url('./assets/duck_move_1.png')`;
}

function updateEnergyLevel(windowCount) {
  // Example mapping:
  // 0-2 windows: energy 1
  // 3-5 windows: energy 2
  // 6-8 windows: energy 3
  // 9-11 windows: energy 4
  // 12+ windows: energy 5
  energyLevel = Math.min(5, windowCount);

  // Update the display
  const display = document.getElementById("energy-display");
  if (display) {
    display.textContent = `energy level: ${energyLevel}`;
  }
}

function moveDuck(duck) {
  if (decidesToMove()) {
    currentFrame = currentFrame == 1 ? 2 : 1;
    duck.style.backgroundImage = `url('./assets/duck_move_${currentFrame}.png')`;

    // Movement speed also increases with energy
    const speedMultiplier = 0.5 + energyLevel * 0.5;

    if (canChangeDirection() && Math.random() < 0.1) {
      movingDirection = -movingDirection;
      facingLeft = !facingLeft;
      lastDirectionChange = Date.now();
    }

    duckX += movingDirection * speedMultiplier;

    // Handle boundary conditions
    if (duckX <= 0 || duckX >= 100) {
      movingDirection = -movingDirection;
      facingLeft = !facingLeft;
      lastDirectionChange = Date.now();
    }

    // Update position and direction
    duck.style.left = `${duckX}%`;

    // Always update both transform and flip class together
    if (facingLeft) {
      duck.style.transform = "translate(-50%, -90%) rotateY(0deg)";
    } else {
      duck.style.transform = "translate(-50%, -90%) rotateY(180deg)";
    }
    duck.classList.toggle("flip", facingLeft);
  }
}

function decidesToMove() {
  // Base probability increases with energy level
  // Energy 1: 15% chance
  // Energy 2: 30% chance
  // Energy 3: 45% chance
  // Energy 4: 60% chance
  // Energy 5: 75% chance
  const baseChance = 0.15 + (energyLevel - 1) * 0.15;
  return Math.random() <= baseChance;
}

function canChangeDirection() {
  return Date.now() - lastDirectionChange >= 3000;
}

module.exports = {
  initializeDuck,
  moveDuck,
  updateEnergyLevel,
};
