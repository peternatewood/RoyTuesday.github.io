var TetrisBoard = function(args) {
  this.score = 0;
  this.board = new Array;
  this.randElements = generateRandomElements();
  this.tetrinimo = args.tetrinimo || new Tetrinimo({
    element: 1,
    shape: TETRINIMO_SHAPES.line
  });
  this.createNextTetrinimo = args.createNextTetrinimo;
  this.showGameOver = args.showGameOver;

  this.dropInterval = new Number;

  for(var row = 0; row < 20; row++) {
    this.board[row] = new Array;
    for(var col = 0; col < 10; col++) {
      this.board[row][col] = 0;
    }
  };
}
TetrisBoard.prototype.blit = function(clear) {
  var element = this.tetrinimo.element;

  if(clear) {
    element = 0;
  }

  for(var block in this.tetrinimo.blocks) {
    var currentBlock = this.tetrinimo.blocks[block];
    this.board[currentBlock.y][currentBlock.x] = element;
  }
};
TetrisBoard.prototype.detectCollision = function() {
  for(var block in this.tetrinimo.blocks) {
    currentBlock = this.tetrinimo.blocks[block];
    if(currentBlock.y >= GRID_HEIGHT) {
      return 'floor';
    }
    else if(currentBlock.y < 0) {
      return 'ceiling';
    }
    else if(currentBlock.x < 0 || currentBlock.x >= GRID_WIDTH) {
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
  this.tetrinimo.drop();
  var collision = this.detectCollision();
  if(collision == 'floor' || collision == 'block') {
    this.tetrinimo.raise();
    this.blit();
    this.tetrinimo = null;
    this.createNextTetrinimo();
    if(this.isOutOfSpace()) {
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
  this.tetrinimo.slide(direction);
  var collision = this.detectCollision();
  if(collision == 'wall' || collision == 'block') {
    var reverseDirection = direction == 'left' ? 'right' : 'left';
    this.tetrinimo.slide(reverseDirection);
  }
  this.blit();
};
TetrisBoard.prototype.rotateBlock = function(direction) {
  this.blit(true);
  this.tetrinimo.rotate(direction);
  var collision = this.detectCollision();
  if(collision != 'clear') {
    var reverseDirection = direction == 'clock' ? 'counter' : 'clock';
    this.tetrinimo.rotate(reverseDirection);
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
TetrisBoard.prototype.isOutOfSpace = function() {
  if(this.detectCollision() == 'clear') {
    return false;
  }
  return true;
};
