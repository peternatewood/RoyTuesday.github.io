var BrowserView = function(args) {
  var gridCanvas = document.querySelector('canvas#tetris-grid');
  var previewCanvas = document.querySelector('canvas#tetris-preview');
  var tableCanvas = document.querySelector('canvas#tetris-table');

  BLOCK_SPACING_HEIGHT = gridCanvas.getAttribute('height') / 20;
  BLOCK_SPACING_WIDTH = gridCanvas.getAttribute('width') / 10;
  BLOCK_HEIGHT = BLOCK_SPACING_HEIGHT - 10;
  BLOCK_WIDTH = BLOCK_SPACING_WIDTH - 10;

  this.elementDescrip = document.querySelector('#element-description');
  this.playerScore = document.getElementById('player-score');

  this.gridContext = gridCanvas.getContext('2d');
  this.previewContext = previewCanvas.getContext('2d');
  this.tableContext = tableCanvas.getContext('2d');

  this.gameBoard = args.gameBoard;
  this.previewBoard = new PreviewBoard();
  this.tableBoard = new PeriodicTable();

  this.cycleDropBlock = args.cycleDropBlock;
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
    clearTimeout(this.dropTimeout);
    this.cycleDropBlock();
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
    clearTimeout(this.dropTimeout);
    this.cycleDropBlock({quickly: true});
  }
  if(this.pressed.rotate) {
    this.gameBoard.rotateBlock('counter');
    setTimeout(this.handleInput.bind(this), INPUT_DELAY);
  }
};
BrowserView.prototype.drawBoard = function(board, context) {
  var gridContext = context;
  gridContext.lineWidth = 4;

  board.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      gridContext.fillStyle = CHEMICAL_ELEMENTS[col]['background-color'];
      gridContext.strokeStyle = CHEMICAL_ELEMENTS[col]['border-color'];

      var xPos = (cIndex * BLOCK_SPACING_WIDTH) + 5;
      var yPos = (rIndex * BLOCK_SPACING_HEIGHT) + 5;
      var textX = (cIndex * BLOCK_SPACING_WIDTH) + (BLOCK_SPACING_WIDTH / 2);
      var textY = (rIndex * BLOCK_SPACING_HEIGHT) + (BLOCK_SPACING_HEIGHT / 2) + 4;

      var textLen = CHEMICAL_ELEMENTS[col].symbol.length;
      if(textLen == 1) {
        gridContext.font = FONT_SIZE + BLOCK_FONT;
        textX -= 3;
      }
      else if(textLen == 2) {
        gridContext.font = FONT_SIZE + BLOCK_FONT;
        textX -= 7;
      }
      else if(textLen == 3) {
        gridContext.font = (FONT_SIZE - 2) + BLOCK_FONT;
        textX -= 7;
      }

      gridContext.fillRect(xPos, yPos, BLOCK_WIDTH, BLOCK_HEIGHT);
      gridContext.strokeRect(xPos, yPos, BLOCK_WIDTH, BLOCK_HEIGHT);
      gridContext.fillStyle = CHEMICAL_ELEMENTS[col]['color'];
      gridContext.fillText(CHEMICAL_ELEMENTS[col].symbol, textX, textY);
    });
  });
};
BrowserView.prototype.animateGame = function() {
  var lastTime = null;
  var progress = true;

  var animate = function(time) {
    if(lastTime) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      progress = timeStep < 2000;
    }
    lastTime = time;
    this.drawBoard(this.gameBoard.board, this.gridContext);
    this.drawBoard(this.previewBoard.board, this.previewContext);
    this.drawBoard(this.tableBoard.board, this.tableContext);

    this.updatePlayerScore(this.gameBoard.score);
    if(progress) {
      requestAnimationFrame(animate.bind(this));
    }
  }
  requestAnimationFrame(animate.bind(this));
};
BrowserView.prototype.updateElementDescrip = function() {
  var element = this.previewBoard.tetrinimo.element;
  this.elementDescrip.innerHTML = '<h2>' + CHEMICAL_ELEMENTS[element].name
  + ' [' + CHEMICAL_ELEMENTS[element].symbol + "]</h2>"
  + '<p>Atomic Number: ' + element + '</p>'
  + '<p>' + CHEMICAL_ELEMENTS[element].descrip + '</p>';
}
BrowserView.prototype.updatePlayerScore = function(score) {
  this.playerScore.innerHTML = score;
}
