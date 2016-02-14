var CHEMICAL_ELEMENTS = {
  0: {'background-color': '#F1EEFA',
      'border-color': '#AAA',
      'color': '#F1EEFA',
      'name': 'n/a',
      'symbol': ''},

  1: {'background-color': '#dde',
      'border-color': '#888',
      'color': 'black',
      'name': 'hydrogen',
      'symbol': 'H'},

  2: {'background-color': '#edd',
      'border-color': '#888',
      'color': 'black',
      'name': 'helium',
      'symbol': 'He'},
};

var BLOCK_FONT = "12px Verdana";
var DROP_DELAY = 300;
var SLIDE_DELAY = 200;

var GRID_HEIGHT = 20;
var GRID_WIDTH = 10;

var BLOCK_WIDTH, BLOCK_HEIGHT;
var BLOCK_SPACING_WIDTH, BLOCK_SPACING_HEIGHT;

var TETRINIMO_TEMPLATES = {
  jBlock: ['xx',
           'x ',
           'x '],
  lBlock: ['xx',
           ' x',
           ' x'],
  square: ['xx',
           'xx'],
  sBlock: ['x ',
           'xx',
           ' x'],
  zBlock: [' x',
           'xx',
           'x '],
  line:   ['x',
           'x',
           'x',
           'x'],
  tBlock: ['xxx',
           ' x ']
};
var processTetrinimos = function() {
  var tetraShape = new Object;
  for(var shape in TETRINIMO_TEMPLATES) {
    if( TETRINIMO_TEMPLATES.hasOwnProperty(shape)) {
      tetraShape[shape] = new Array;
      var currentShape = TETRINIMO_TEMPLATES[shape];
      for(var row in currentShape) {
        for(var col in currentShape[row]) {
          if(currentShape[row][col] == 'x') {
            tetraShape[shape].push({x: parseInt(col, 10),
                                    y: parseInt(row, 10)});
          }
        }
      }
    }
  }
  return tetraShape
}
var tetrinimoShapes = processTetrinimos();

var TetrisBoard = function(args) {
  this.board = new Array;
  this.tetrinimo = args.tetrinimo;

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
    clearInterval(this.intervalID);
  }
  this.blit();
};
TetrisBoard.prototype.slideBlock = function(direction) {
  this.blit(true);
  this.tetrinimo.slide(direction);
  this.blit();
};

var Tetrinimo = function(args) {
  this.element = args.element;
  this.blocks = args.blocks;
  this.row = 0;
  this.col = 5;

  for(var block in this.blocks) {
    this.blocks[block].y += this.row;
    this.blocks[block].x += this.col;
  }
}
Tetrinimo.prototype.raise = function() {
  this.row--;
  for(var block in this.blocks) {
    this.blocks[block].y--;
  }
};
Tetrinimo.prototype.drop = function() {
  this.row++;
  for(var block in this.blocks) {
    this.blocks[block].y++;
  }
};
var directToInt = {
  'left': -1,
  'right': 1
};
Tetrinimo.prototype.slide = function(direction) {
  this.blocks.forEach(function(block) {
    block.x += directToInt[direction];
  });
};

var keyCodes = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  8: 'backspace'
}

var View = function(args) {
  this.context = document.querySelector('canvas').getContext('2d');
  this.debug = "debug string";
  this.gameBoard = args.gameBoard;
  this.intervalIDs = new Object;

  var self = this;
  addEventListener('keydown', function(event) {
    var pressedKey = keyCodes[event.keyCode];
    console.log('pressedKey', pressedKey);
    if(pressedKey == 'left' || pressedKey == 'right') {
      event.preventDefault();
      self.intervalIDs[pressedKey] = setInterval(console.log('direction', pressedKey), SLIDE_DELAY);
    }
  });

  addEventListener('keyup', function(event) {
    var releasedKey = keyCodes[event.keyCode];
    console.log("releasedKey", releasedKey);
    if(releasedKey == 'left' || releasedKey == 'right') {
      event.preventDefault();
      clearInterval(self.intervalIDs[releasedKey]);
    }
  });
}
View.prototype.drawBoard = function(board) {
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
View.prototype.animate = function(board) {
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

var ready = function(fn) {
  if(document.readyState != 'loading') {
    fn();
  }
  else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function() {
  var canvas = document.querySelector('canvas');
  BLOCK_SPACING_HEIGHT = canvas.getAttribute('height') / 20;
  BLOCK_SPACING_WIDTH = canvas.getAttribute('width') / 10;
  BLOCK_HEIGHT = BLOCK_SPACING_HEIGHT - 10;
  BLOCK_WIDTH = BLOCK_SPACING_WIDTH - 10;

  window.lineBlock = new Tetrinimo({element: 1, blocks: tetrinimoShapes.line});
  window.gameBoard = new TetrisBoard({tetrinimo: lineBlock});
  window.gameView = new View({gameBoard: gameBoard});
  
  gameBoard.blit({tetrinimo: lineBlock});
  gameView.animate(gameBoard.board);
  
  gameBoard.intervalID = setInterval(function() {
    gameBoard.dropBlock(lineBlock);
  }, DROP_DELAY);
});
