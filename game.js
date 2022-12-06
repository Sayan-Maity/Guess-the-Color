var numSquares = 6;
var colors = [];
var pickedColor;
var correctMessages = ['Correct!', 'Nice!', 'Good!', 'Great!'];
var wrongMessages = ['Try Again'];
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('color-display');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var newGameButton = document.getElementById('new-game');
var mode = document.querySelectorAll('.mode');
var wholeBody = document.querySelector('body');

// HTML body background
var theme = 'white';

// Starts the game
initialize();

// Initializing game function that bundles all tasks together
function initialize() {
  setupModeButtons();
  setupSquares();
  reset();
}

// Setup difficulty level buttons
function setupModeButtons() {
  // Loop over modes and add event listeners
  for (var i = mode.length - 1; i >= 0; i--) {
    mode[i].addEventListener('click', function() {
      for (var i = mode.length - 1; i >= 0; i--) {
        mode[i].classList.remove('selected');
      }
      this.classList.add('selected');
      switch (this.textContent) {
        case 'Easy':
          numSquares = 3;
          break;
        case 'Normal':
          numSquares = 6;
          break;
        case 'Hard':
          numSquares = 9;
      }
      reset();
    });
  }
  // Set default difficulty to normal
  mode[1].classList.add('selected');
}

// Setup color squares, assign colors and add event listeners
function setupSquares() {
  for (var i = squares.length - 1; i >= 0; i--) {
    squares[i].addEventListener('click', function() {
      var clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent =
          correctMessages[Math.floor(Math.random() * correctMessages.length)];
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
        newGameButton.textContent = 'Play Again?';
      } else {
        this.style.backgroundColor = theme;
        messageDisplay.textContent =
          wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
      }
    });
  }
}

// Reset the whole game
function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  messageDisplay.textContent = '';
  newGameButton.textContent = 'New Colors';
  h1.style.backgroundColor = theme;
}

// Change background color of all squares to picked one
function changeColors(x) {
  for (var i = colors.length - 1; i >= 0; i--) {
    squares[i].style.backgroundColor = x;
  }
}

// Pick a winning color
function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Generates random colors based on difficulty
function generateRandomColors(numSquares) {
  let arr = [];
  for (var i = numSquares - 1; i >= 0; i--) {
    arr.push(randomColor());
  }
  return arr;
}

// Builds random RGB color string
function randomColor() {
  let r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// On space or enter reset game
wholeBody.addEventListener('keydown', event => {
  if (event.keyCode === 13 || event.keyCode === 32) {
    reset();
  }
});

// Set up new game button
newGameButton.addEventListener('click', reset);
