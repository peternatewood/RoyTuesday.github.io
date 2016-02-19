var BrowserView = function(args) {
  this.context = document.querySelector('canvas').getContext('2d');
  this.gameBoard = args.gameBoard;
  this.pressed = {
    slide: false,
    drop: false,
    rotate: false
  };

  addEventListener('keydown', this.keyDown.bind(this));
  addEventListener('keyup', this.keyUp.bind(this));
}
BrowserView.prototype.keyDown = function(event) {
  var pressedKey = KEY_CODES[event.keyCode];
  if(pressedKey == 'left' || pressedKey == 'right') {
    event.preventDefault();
    if(this.pressed.slide == false) {
      this.pressed.slide = pressedKey;
      this.handleInput.bind(this).call();
    }
  }
  if(pressedKey == 'down') {
    event.preventDefault();
    if(this.pressed.drop == false) {
      this.pressed.drop = true;
      this.handleInput.bind(this).call();
    }
  }
  if(pressedKey == 'up') {
    event.preventDefault();
    if(this.pressed.rotate == false) {
      this.pressed.rotate = true;
      this.handleInput.bind(this).call();
    }
  }
};
BrowserView.prototype.keyUp = function(event){
  var releasedKey = KEY_CODES[event.keyCode];
  if(releasedKey == 'left' || releasedKey == 'right') {
    event.preventDefault();
    this.pressed.slide = false;
  }
  if(releasedKey == 'down') {
    event.preventDefault();
    this.pressed.drop = false;
    this.gameBoard.cycleDropBlock();
  }
  if(releasedKey == 'up') {
    event.preventDefault();
    this.pressed.rotate = false;
  }
};
BrowserView.prototype.handleInput = function() {
  if(this.pressed.slide) {
    this.gameBoard.slideBlock(this.pressed.slide);
    setTimeout(this.handleInput.bind(this), INPUT_DELAY);
  }
  if(this.pressed.drop) {
    this.gameBoard.cycleDropBlock({quickly: true});
  }
  if(this.pressed.rotate) {
    this.gameBoard.rotateBlock('counter');
    setTimeout(this.handleInput.bind(this), INPUT_DELAY);
  }
};
BrowserView.prototype.drawBoard = function(board) {
  var context = this.context
  context.lineWidth = 4;
  context.font = BLOCK_FONT;

  board.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      context.fillStyle = CHEMICAL_ELEMENTS[col]['background-color'];
      context.strokeStyle = CHEMICAL_ELEMENTS[col]['border-color'];

      context.fillRect((cIndex * BLOCK_SPACING_WIDTH) + 5, (rIndex * BLOCK_SPACING_HEIGHT) + 5, BLOCK_WIDTH, BLOCK_HEIGHT);
      context.strokeRect((cIndex * BLOCK_SPACING_WIDTH) + 5, (rIndex * BLOCK_SPACING_HEIGHT) + 5, BLOCK_WIDTH, BLOCK_HEIGHT);
      context.fillStyle = CHEMICAL_ELEMENTS[col]['color'];
      context.fillText(CHEMICAL_ELEMENTS[col].symbol, (cIndex * BLOCK_SPACING_WIDTH) + (BLOCK_SPACING_WIDTH / 2) - 4, (rIndex * BLOCK_SPACING_HEIGHT) + (BLOCK_SPACING_HEIGHT / 2) + 4);
    });
  });
};
BrowserView.prototype.animate = function(board) {
  var lastTime = null;
  var progress = true;
  var self = this;

  var animate = function(time) {
    if(lastTime) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      progress = timeStep < 2000;
    }
    lastTime = time;
    self.drawBoard(board);
    if(progress) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
};
