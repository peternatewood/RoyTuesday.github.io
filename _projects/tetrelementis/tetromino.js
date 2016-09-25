var Tetromino = function(args) {
  this.element;
  this.blocks;
  this.shape;

  this.set(args);
}
Tetromino.prototype.set = function(args) {
  this.element = args.element;
  this.shape = args.shape;

  this.blocks = this.shape.map(function(block) {
    return {x: new Number(block.x), y: new Number(block.y)};
  });

  this.row = 0;
  this.col = 4;

  for(var block in this.blocks) {
    this.blocks[block].y += this.row;
    this.blocks[block].x += this.col;
  }

  var width = 0;
  var height = 0;
  this.shape.forEach(function(block) {
    if(block.x > width) width = block.x;
    if(block.y > height) height = block.y;
  });

  this.center = {
    x: Math.floor(width / 2) + this.col,
    y: Math.floor(height / 2) + this.row
  }
};
Tetromino.prototype.raise = function() {
  this.row--;
  for(var block in this.blocks) {
    this.blocks[block].y--;
  }
  this.center.y--;
};
Tetromino.prototype.drop = function() {
  this.row++;
  for(var block in this.blocks) {
    this.blocks[block].y++;
  }
  this.center.y++;
};
var directToInt = {
  'left': -1,
  'right': 1
};
Tetromino.prototype.slide = function(direction) {
  this.blocks.forEach(function(block) {
    block.x += directToInt[direction];
  });
  this.center.x += directToInt[direction];
};
Tetromino.prototype.rotate = function(direction) {
  var modX, modY;
  var center = this.center;

  this.blocks.forEach(function(block) {
    modX = block.y - center.y;
    modY = block.x - center.x;
    if(direction == 'counter') {
      if(modY !== 0) modY *= -1;
    }
    else {
      if(modX !== 0) modX *= -1;
    }

    block.x = center.x + modX;
    block.y = center.y + modY;
  });
};

module.exports = Tetromino;
