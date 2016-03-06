var Controller = function(shape) {
  this.elements = generateRandomElements();

  this.gameBoard = new TetrisBoard({
    createNextTetromino: this.createNextTetromino.bind(this),
    showGameOver: this.showGameOver.bind(this)
  });

  this.gameView = new BrowserView({
    gameBoard: this.gameBoard,
    cycleDropBlock: this.cycleDropBlock,
  });

  this.gameView.drawAllBoards();
  this.gameBoard.gameState = 'gameover';

  addEventListener('keydown', function(event) {
    if(this.gameBoard.gameState == 'gameover') {
      var keyPressed = KEY_CODES[event.keyCode];
      if(keyPressed == 'space') {
        event.preventDefault();
        this.startGame();
      }
    }
  }.bind(this));
  addEventListener('mousedown', function(event) {
    if(event.target.nodeName == 'BUTTON' && this.gameBoard.gameState == 'gameover') {
      var buttonPressed = event.target.dataset.key;
      if(buttonPressed == 'space') {
        this.startGame();
      }
    }
  }.bind(this));
}
Controller.prototype.startGame = function() {
  if(this.elements.length < 118) {
    this.elements = generateRandomElements();
  }

  this.gameView.disableMenus();

  if(this.gameBoard.tetromino === null) {
    this.gameBoard.tetromino = new Tetromino({
      element: this.elements.pop(),
      shape: getRandomShape(this.gameView.gameMode)
    });
  }

  if(this.gameView.previewBoard.tetromino === null) {
    this.gameView.previewBoard.tetromino = new Tetromino({
      element: this.elements.pop(),
      shape: getRandomShape(this.gameView.gameMode)
    })
  }

  this.gameBoard.score = 0;
  this.gameBoard.gameState = 'inProgress';

  this.gameView.animateGame();
  this.gameView.previewBoard.blit();
  this.gameView.tableBoard.showElement(this.gameBoard.tetromino.element);
  this.gameView.updateElementDescrip(this.gameView.previewBoard.tetromino.element);

  this.cycleDropBlock(DROP_DELAY[this.gameView.level]);
};
Controller.prototype.cycleDropBlock = function (dropDelay) {
  this.gameBoard.blit();
  if(this.gameBoard.dropInterval) {
    clearInterval(this.gameBoard.dropInterval);
  }
  this.gameBoard.dropInterval = setInterval(
    this.gameBoard.dropBlock.bind(this.gameBoard),
    dropDelay
  );
};
Controller.prototype.createNextTetromino = function() {
  this.gameBoard.tetromino = this.gameView.previewBoard.tetromino;
  if(this.elements.length <= 0) {
    this.elements = generateRandomElements();
  }
  this.gameView.previewBoard.tetromino = new Tetromino({
    element: this.elements.pop(),
    shape: getRandomShape(this.gameView.gameMode)
  })
  this.gameView.previewBoard.blit();
  this.gameView.tableBoard.showElement(this.gameBoard.tetromino.element);
  this.gameView.updateElementDescrip(this.gameView.previewBoard.tetromino.element);
};
Controller.prototype.showGameOver = function() {
  this.gameBoard.tetromino = null;
  this.gameView.previewBoard.tetromino = null;

  this.gameView.isPaused = true;
  this.gameView.previewBoard.board = generateEmptyBoard();
  this.gameBoard.clearForGameover();
  this.gameView.resetDisplay();
};

var generateRandomElements = function() {
  var randElements = new Array;
  var orderedElements = new Array;

  for(var prop in CHEMICAL_ELEMENTS) {
    if(CHEMICAL_ELEMENTS.hasOwnProperty(prop)) {
      if(prop != 0) orderedElements.push(prop);
    }
  }

  var length = new Number(orderedElements.length);

  for(var i = 0; i < length; i++) {
    var randIndex = Math.floor(Math.random() * orderedElements.length);
    randElements.push(orderedElements[randIndex]);
    orderedElements.splice(randIndex, 1);
  }

  return randElements;
}
var getRandomShape = function(gameMode) {
  var shapes = TETROMINO_SHAPES[gameMode];
  var length = 0;
  for(var prop in shapes) {
    if(shapes.hasOwnProperty(prop)) {
      length++;
    }
  }

  var counter = 0;
  var randNum = Math.floor(Math.random() * length);

  for(var prop in shapes) {
    if(shapes.hasOwnProperty(prop)) {
      if(counter == randNum) return shapes[prop];
      counter++;
    }
  }
}
