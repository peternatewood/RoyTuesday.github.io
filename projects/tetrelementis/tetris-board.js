var CONST = require("./constants.js");

var Tetromino = require("./tetromino.js");

var TetrisBoard = function(args) {
  this.score = 0;
  this.board = new Array;
  this.randElements = CONST.generateRandomElements();
  this.tetromino = args.tetromino || null;
  this.createNextTetromino = args.createNextTetromino;
  this.showGameOver = args.showGameOver;
  this.gameState = 'gameover';

  this.dropInterval = new Number;

  for(var row = 0; row < 20; row++) {
    this.board[row] = new Array;
    for(var col = 0; col < 10; col++) {
      this.board[row][col] = 0;
    }
  };
}
TetrisBoard.prototype.blit = function(clear) {
  var element = this.tetromino.element;

  if(clear) {
    element = 0;
  }

  for(var block in this.tetromino.blocks) {
    var currentBlock = this.tetromino.blocks[block];
    this.board[currentBlock.y][currentBlock.x] = element;
  }
};
TetrisBoard.prototype.detectCollision = function() {
  for(var block in this.tetromino.blocks) {
    currentBlock = this.tetromino.blocks[block];
    if(currentBlock.y >= CONST.GRID_HEIGHT) {
      return 'floor';
    }
    else if(currentBlock.y < 0) {
      return 'ceiling';
    }
    else if(currentBlock.x < 0 || currentBlock.x >= CONST.GRID_WIDTH) {
      return 'wall';
    }
    else if(this.board[currentBlock.y][currentBlock.x] !== 0) {
      return 'block';
    }
  }
  return 'clear';
};
TetrisBoard.prototype.dropBlock = function() {
  this.blit(true);
  this.tetromino.drop();
  var collision = this.detectCollision();
  if(collision == 'floor' || collision == 'block') {
    this.tetromino.raise();
    this.blit();
    this.createNextTetromino();
    if(this.detectCollision() != 'clear') {
      clearInterval(this.dropInterval);
      this.blit();
      this.showGameOver();
      return;
    }
    this.handleFullLines();
  }
  this.blit();
};
TetrisBoard.prototype.slideBlock = function(direction) {
  this.blit(true);
  this.tetromino.slide(direction);
  var collision = this.detectCollision();
  if(collision == 'wall' || collision == 'block') {
    var reverseDirection = direction == 'left' ? 'right' : 'left';
    this.tetromino.slide(reverseDirection);
  }
  this.blit();
};
TetrisBoard.prototype.rotateBlock = function(direction) {
  this.blit(true);
  this.tetromino.rotate(direction);
  var collision = this.detectCollision();
  if(collision != 'clear') {
    var reverseDirection = direction == 'clock' ? 'counter' : 'clock';
    this.tetromino.rotate(reverseDirection);
  }
  this.blit();
};
TetrisBoard.prototype.handleFullLines = function() {
  var lines = 0;
  this.board.forEach(function(row, rIndex, board) {
    var filled = true;
    row.forEach(function(block) {
      if(block == 0) filled = false;
    });
    if(filled) {
      lines++;
      for(var i = rIndex; i > 0; i--) {
        board[i] = board[i - 1].map(function(col) {
          return col;
        });
      }
      board[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  });
  if(lines > 0) this.score += Math.pow(2, lines) / 2;
};
TetrisBoard.prototype.clearForGameover = function() {
  var randElement = Math.ceil(Math.random() * 118);
  var boardCoords = {x: 0, y: 0};

  var clearBoard = function(boardCoords) {
    if(boardCoords.y < 20) {
      this.board[boardCoords.y][boardCoords.x] = randElement;
      if(boardCoords.x >= 9) {
        boardCoords.y++;
        boardCoords.x = 0;
      }
      else {
        boardCoords.x++;
      }
      setTimeout(clearBoard.bind(this, boardCoords), CONST.CLEAR_DELAY);
    }
    else if(randElement > 0) {
      randElement = 0;
      boardCoords = {x: 0, y:0};
      setTimeout(clearBoard.bind(this, boardCoords), CONST.CLEAR_DELAY);
    }
    else {
      this.gameState = 'gameover';
    }
  }.bind(this);

  clearBoard(boardCoords);
};

module.exports = TetrisBoard;
