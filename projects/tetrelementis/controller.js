var Controller = function(shape) {
  this.elements = generateRandomElements();
  this.level = 0;

  this.gameBoard = new TetrisBoard({
    tetrinimo: new Tetrinimo({
      element: this.elements.pop(),
      shape: getRandomShape()
    }),
    createNextTetrinimo: this.createNextTetrinimo.bind(this),
    showGameOver: this.showGameOver.bind(this)
  });

  this.gameView = new BrowserView({
    gameBoard: this.gameBoard,
    cycleDropBlock: this.cycleDropBlock,
  });

  this.gameView.level = this.level;
  this.gameView.previewBoard.tetrinimo = new Tetrinimo({
    element: this.elements.pop(),
    shape: getRandomShape()
  });
  this.gameView.drawAllBoards();
  this.gameState = 'gameover';

  addEventListener('keydown', function(event) {
    if(this.gameState === 'gameover') {
      var keyPressed = KEY_CODES[event.keyCode];
      if(keyPressed == 'space') {
        event.preventDefault();
        this.startGame();
      }
    }
  }.bind(this));
  addEventListener('mousedown', function(event) {
    if(event.target.nodeName == 'BUTTON' && this.gameState === 'gameover') {
      var buttonPressed = event.target.dataset.key;
      if(buttonPressed == 'space') {
        this.startGame();
      }
    }
  }.bind(this));
}
Controller.prototype.startGame = function() {
  this.gameState = 'inProgress';
  this.gameView.animateGame();
  this.gameView.previewBoard.blit();
  this.gameView.tableBoard.showElement(this.gameBoard.tetrinimo.element);
  this.gameView.updateElementDescrip();

  this.cycleDropBlock();
};
Controller.prototype.cycleDropBlock = function (args) {
  var dropDelay = args ? FAST_DROP : DROP_DELAY[this.level];
  this.gameBoard.blit();
  if(this.gameBoard.dropInterval) {
    clearInterval(this.gameBoard.dropInterval);
  }
  this.gameBoard.dropInterval = setInterval(
    this.gameBoard.dropBlock.bind(this.gameBoard),
    dropDelay
  );
};
Controller.prototype.createNextTetrinimo = function() {
  this.gameBoard.tetrinimo = this.gameView.previewBoard.tetrinimo;
  if(this.elements.length <= 0) {
    this.elements = generateRandomElements();
  }
  this.gameView.previewBoard.tetrinimo = new Tetrinimo({
    element: this.elements.pop(),
    shape: getRandomShape()
  })
  this.gameView.previewBoard.blit();
  this.gameView.tableBoard.showElement(this.gameBoard.tetrinimo.element);
  this.gameView.updateElementDescrip();
};
Controller.prototype.showGameOver = function() {
  this.gameState = 'gameover';
  this.gameView.isPaused = true;
  this.gameBoard.clearForGameover();
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
var getRandomShape = function() {
  var counter = 0;
  var randNum = Math.floor(Math.random() * 7);

  for(var prop in TETRINIMO_SHAPES) {
    if(TETRINIMO_SHAPES.hasOwnProperty(prop)) {
      if(counter == randNum) return TETRINIMO_SHAPES[prop];
      counter++;
    }
  }
}
