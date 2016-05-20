var CONST = require("./constants.js");

var Tetromino = require("./tetromino.js")
var PreviewBoard = require("./preview-board.js");
var PeriodicTable = require("./periodic-table.js");
var TetrisBoard = require("./tetris-board.js");
var BrowserView = require("./browser-view.js");

var Controller = function(shape) {
  this.level = 0;
  this.gameMode = "Marathon";
  this.elements = CONST.generateRandomElements();
  this.limiter = {
    shapeIndex: null,
    count: 0
  }

  this.previewBoard = new PreviewBoard();
  this.tableBoard = new PeriodicTable();
  this.gameBoard = new TetrisBoard({
    createNextTetromino: this.createNextTetromino.bind(this),
    showGameOver: this.showGameOver.bind(this)
  });

  this.gameView = new BrowserView({
    gameBoard: this.gameBoard,
    cycleDropBlock: this.cycleDropBlock,
  });
  this.highScore = this.loadHighScore();

  this.gameView.drawBoard(this.gameBoard.board, "gridContext");
  this.gameView.drawBoard(this.previewBoard.board, "previewContext");
  this.gameView.drawBoard(this.tableBoard.board, "tableContext");
  this.gameBoard.gameState = 'gameover';

  this.gameView.tableOverlay.addEventListener('mousedown', function(event) {
    var mouseX = Math.floor((event.layerX - this.gameView.tableOverlay.offsetLeft) / (540 / 18));
    var mouseY = Math.floor((event.layerY - this.gameView.tableOverlay.offsetTop) / (270 / 9));
    var element = 0

    if(mouseX >= 0 && mouseY >= 0) {
      element = this.tableBoard.board[mouseY][mouseX];
    }

    if(element > 0) {
      this.gameView.updateElementDescrip(element);
    }
  }.bind(this));
  this.gameView.tableOverlay.addEventListener('mousemove', function(event) {
    var mouseX = Math.floor((event.layerX - this.gameView.tableOverlay.offsetLeft) / (540 / 18));
    var mouseY = Math.floor((event.layerY - this.gameView.tableOverlay.offsetTop) / (270 / 9));
    var element = 0;

    if(mouseX >= 0 && mouseY >= 0) {
      element = this.tableBoard.board[mouseY][mouseX];
    }
    this.gameView.drawElementOverlay(mouseX, mouseY, element);
  }.bind(this));

  addEventListener('keydown', function(event) {
    if(this.gameBoard.gameState == 'gameover') {
      var keyPressed = CONST.KEY_CODES_TO_ACTIONS[event.keyCode];
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

  document.getElementById('reset-high-score').addEventListener("click", function(event) {
    event.preventDefault();
    this.resetHighScore();
  }.bind(this));

  addEventListener('keydown', this.handleKeyDown.bind(this));
  addEventListener('keyup', this.handleKeyUp.bind(this));
  this.gameView.controlButtons.forEach(function(button) {
    button.addEventListener("mousedown", this.handleKeyDown.bind(this));
    button.addEventListener("mouseup", this.handleKeyUp.bind(this));
  }.bind(this));

  document.getElementById("show-directions").addEventListener("click", function(event) {
    event.preventDefault();
    this.gameView.isPaused = true;
    clearInterval(this.gameBoard.dropInterval);
    clearInterval(this.gameBoard.rotateInterval);
    clearInterval(this.gameBoard.slideInterval);

    this.gameView.updateDirectionsOverlay();
    this.gameView.showDirections();
  }.bind(this));

  document.getElementById("hide-directions").addEventListener("click", function(event) {
    event.preventDefault();
    this.gameView.fadeDirections();
  }.bind(this));

  addEventListener("animationend", function(event) {
    if(event.animationName == "fade") {
      this.gameView.hideDirections();
      this.gameView.isPaused = false;
      this.cycleDropBlock(CONST.DROP_DELAY[this.level]);
    }
  }.bind(this));

  window.addEventListener("resize", function(event) {
    this.gameView.updateDirectionsOverlay();
  }.bind(this));
}
Controller.prototype.saveHighScore = function() {
  window.localStorage.setItem("highScore", this.highScore);
};
Controller.prototype.loadHighScore = function() {
  var highScore = window.localStorage.getItem("highScore");
  if(highScore) {
    this.highScore = highScore;
  }
  else {
    this.highScore = 0;
  }
  this.gameView.updateHighScore(this.highScore);
};
Controller.prototype.resetHighScore = function() {
  this.highScore = 0;
  this.saveHighScore();
  this.gameView.updateHighScore(this.highScore);
};
Controller.prototype.startGame = function() {
  if(this.elements.length < 118) {
    this.elements = CONST.generateRandomElements();
  }
  var settings = this.gameView.getGameSettings();
  this.gameMode = settings.gameMode;
  if(this.gameMode == 'Fixed Level') {
    this.level = settings.level;
  }
  else {
    this.level = 0;
  }
  this.gameView.disableMenus(this.level, this.gameMode);

  if(this.gameBoard.tetromino) {
    this.gameBoard.tetromino.set({
      element: this.elements.pop(),
      shape: CONST.getRandomShape(this.gameMode, this.limiter)
    });
  }
  else {
    this.gameBoard.tetromino = new Tetromino({
      element: this.elements.pop(),
      shape: CONST.getRandomShape(this.gameMode, this.limiter)
    });
  }

  if(this.previewBoard.tetromino) {
    this.previewBoard.tetromino.set({
      element: this.elements.pop(),
      shape: CONST.getRandomShape(this.gameMode, this.limiter)
    });
  }
  else {
    this.previewBoard.tetromino = new Tetromino({
      element: this.elements.pop(),
      shape: CONST.getRandomShape(this.gameMode, this.limiter)
    });
  }

  this.gameBoard.score = 0;
  this.gameBoard.gameState = 'inProgress';

  var lastTime = null;
  var progress = true;

  var animate = function(time) {
    if(lastTime) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      progress = timeStep < 1000;
    }
    lastTime = time;

    if(progress) {
      this.gameView.drawBoard(this.gameBoard.board, "gridContext");
      this.gameView.drawBoard(this.previewBoard.board, "previewContext");
      this.gameView.drawBoard(this.tableBoard.board, "tableContext");
      this.gameView.updatePlayerScore(this.gameBoard.score);
      requestAnimationFrame(animate.bind(this));
    }
  }
  requestAnimationFrame(animate.bind(this));

  this.previewBoard.blit();
  this.tableBoard.showElement(this.gameBoard.tetromino.element);
  this.gameView.updateElementDescrip(this.previewBoard.tetromino.element);

  this.cycleDropBlock(CONST.DROP_DELAY[this.level]);
};
Controller.prototype.cycleDropBlock = function(dropDelay) {
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
    element: this.previewBoard.tetromino.element,
    shape: this.previewBoard.tetromino.shape
  });
  if(this.elements.length <= 0) {
    this.elements = CONST.generateRandomElements();
  }
  this.previewBoard.tetromino.set({
    element: this.elements.pop(),
    shape: CONST.getRandomShape(this.gameMode, this.limiter)
  })
  this.previewBoard.blit();
  this.tableBoard.showElement(this.gameBoard.tetromino.element);
  this.gameView.updateElementDescrip(this.previewBoard.tetromino.element);
  this.updateGameLevel();
};
Controller.prototype.handleKeyDown = function(event) {
  var action = this.gameView.keyDown.bind(this.gameView, event).call();
  if(action == "pause") {
    clearTimeout(this.gameBoard.dropInterval);
    clearInterval(this.gameBoard.rotateInterval);
    clearInterval(this.gameBoard.slideInterval);
  }
  else if(action == "unpause") {
    this.cycleDropBlock(CONST.DROP_DELAY[this.level]);
  }
  else if(action == "left" || action == "right") {
    clearInterval(this.gameBoard.slideInterval);
    this.gameBoard.slideBlock(this.gameView.pressed.slide);
    this.gameBoard.slideInterval = setInterval(this.gameBoard.slideBlock.bind(this.gameBoard, this.gameView.pressed.slide), CONST.SLIDE_DELAY);
  }
  else if(action == "clock" || action == "counter") {
    clearInterval(this.gameBoard.rotateInterval);
    this.gameBoard.rotateBlock(this.gameView.pressed.rotate);
    this.gameBoard.rotateInterval = setInterval(this.gameBoard.rotateBlock.bind(this.gameBoard, this.gameView.pressed.rotate), CONST.ROTATE_DELAY);
  }
  else if(action == "down") {
    clearInterval(this.gameBoard.dropInterval);
    this.cycleDropBlock(CONST.FAST_DROP);
  }
};
Controller.prototype.handleKeyUp = function(event) {
  var action = this.gameView.keyUp.bind(this.gameView, event).call();
  if(action == "left" || action == "right") {
    clearInterval(this.gameBoard.slideInterval);
  }
  else if(action == "counter" || action == "clock") {
    clearInterval(this.gameBoard.rotateInterval);
  }
  else if(action == "down") {
    clearInterval(this.gameBoard.dropInterval);
    this.cycleDropBlock(CONST.DROP_DELAY[this.level]);
  }
};
Controller.prototype.updateGameLevel = function() {
  this.level = Math.floor(this.gameBoard.score / 10);
  this.gameView.updateGameLevel(this.level);
};
Controller.prototype.showGameOver = function() {
  this.gameBoard.tetromino = null;
  this.previewBoard.tetromino = null;

  this.gameView.isPaused = true;
  this.previewBoard.board = CONST.generateEmptyBoard();
  this.gameBoard.clearForGameover();
  this.gameView.resetDisplay(this.level, this.gameMode);
  this.saveHighScore();
  this.gameView.updateHighScore(this.gameBoard.score);
};

module.exports = Controller;
