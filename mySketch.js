let numbers = [];
let cols;
let rows;
let size = 20; // Reduced size to decrease spacing
let r = size / 2;
let k = 20;
let angleOffset = 0;
let lastSecond = -1; // To keep track of the last updated second

function setup() {
  createCanvas(1200, 800);
  cols = width / size;
  rows = height / size;

  // Initialize positions of numbers
  for (let i = 0; i < cols; i++) {
    numbers[i] = [];
    for (let j = 0; j < rows; j++) {
      let x = size / 2 + i * size;
      let y = size / 2 + j * size;
      let d = dist(x, y, width / 2, height / 2);
      let angle = d / k;
      numbers[i][j] = floor(map(angle, 0, TWO_PI, 1, 12));
    }
  }
}

function draw() {
  // Second background
  background(245, 116, 91, 55); // Background with alpha for trailing effect

  // Set text size and alignment
  textSize(12);
  textAlign(CENTER, CENTER);

  // Get current second
  let s = second();

  // Update numbers based on the current second, only if the second has changed
  if (s !== lastSecond) {
    lastSecond = s;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        numbers[i][j] = (numbers[i][j] % 12) + 1;
      }
    }
  }

  // Update angles for animation
  angleOffset += 0.0008; // Adjust the speed of rotation

  // Display numbers with trailing effect
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let angle = atan2(j - rows / 2, i - cols / 2) + angleOffset;
      let x = width / 2 + cos(angle) * (i * size);
      let y = height / 2 + sin(angle) * (j * size);

      // Draw numbers with trailing effect
      fill(255, 0, 0, 100); // Red color with 100/255 opacity
      text(numbers[i][j], x, y);
    }
  }

  // Display current second
  fill(255, 0, 0);
  textAlign(LEFT, CENTER); // Align text to left for better readability
  text('Current second: ' + s, 15, 50); // Moved slightly to the right by increasing x-coordinate
}

