var Controller = function(shape) {
  this.elements = generateRandomElements();

  this.gameBoard = new TetrisBoard({
    tetrinimo: new Tetrinimo({
      element: this.elements.pop(),
      shape: getRandomShape()
    }),
    createNextTetrinimo: this.createNextTetrinimo.bind(this),
    showGameOver: this.showGameOver
  });

  this.gameView = new BrowserView({
    gameBoard: this.gameBoard,
    cycleDropBlock: this.cycleDropBlock
  });

  this.gameView.previewBoard.tetrinimo = new Tetrinimo({
    element: this.elements.pop(),
    shape: getRandomShape()
  });
}
Controller.prototype.startGame = function() {
  this.gameView.animateGame();
  this.gameView.previewBoard.blit();
  this.gameView.tableBoard.showElement(this.gameBoard.tetrinimo.element);
  this.gameView.updateElementDescrip();

  this.cycleDropBlock();
};
Controller.prototype.cycleDropBlock = function (args) {
  var dropDelay = args ? FAST_DROP : DROP_DELAY;
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
  console.log('game over!');
}

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
