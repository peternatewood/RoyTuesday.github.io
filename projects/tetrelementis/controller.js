var Controller = function(shape) {
  this.elements = generateRandomElements();
  this.limiter = {
    shapeIndex: null,
    count: 0
  }

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
      var keyPressed = KEY_CODES_TO_ACTIONS[event.keyCode];
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

  if(this.gameBoard.tetromino) {
    this.gameBoard.tetromino.set({
      element: this.elements.pop(),
      shape: getRandomShape(this.gameView.gameMode, this.limiter)
    });
  }
  else {
    this.gameBoard.tetromino = new Tetromino({
      element: this.elements.pop(),
      shape: getRandomShape(this.gameView.gameMode, this.limiter)
    });
  }

  if(this.gameView.previewBoard.tetromino) {
    this.gameView.previewBoard.tetromino.set({
      element: this.elements.pop(),
      shape: getRandomShape(this.gameView.gameMode, this.limiter)
    });
  }
  else {
    this.gameView.previewBoard.tetromino = new Tetromino({
      element: this.elements.pop(),
      shape: getRandomShape(this.gameView.gameMode, this.limiter)
    });
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
  this.gameBoard.tetromino.set({
    element: this.gameView.previewBoard.tetromino.element,
    shape: this.gameView.previewBoard.tetromino.shape
  });
  if(this.elements.length <= 0) {
    this.elements = generateRandomElements();
  }
  this.gameView.previewBoard.tetromino.set({
    element: this.elements.pop(),
    shape: getRandomShape(this.gameView.gameMode, this.limiter)
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
var getRandomShape = function(gameMode, limiter) {
  var length = TETROMINO_SHAPES[gameMode].length;
  var shapes = new Object;
  TETROMINO_SHAPES[gameMode].forEach(function(shape, index) {
    if(limiter.shapeIndex == index && limiter.count == REPEAT_TETROMINO_LIMIT) {
      limiter.shapeIndex = null;
      limiter.count = 0;
    }
    else {
      shapes[index] = shape;
    }
  });

  var randNum = Math.floor(Math.random() * length);

  if(shapes[randNum] === undefined) {
    randNum += randNum > (length / 2) ? -1 : 1;
  }

  if(limiter.shapeIndex == randNum) {
    limiter.count++;
  }
  else {
    limiter.shapeIndex = randNum;
    limiter.count = 1;
  }

  return shapes[randNum];
}
