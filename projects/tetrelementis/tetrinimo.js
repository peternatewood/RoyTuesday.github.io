var Tetrinimo = function(args) {
  this.element = args.element;
  var shape = args.shape;

  this.blocks = shape.map(function(block) {
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
  shape.forEach(function(block) {
    if(block.x > width) width = block.x;
    if(block.y > height) height = block.y;
  })

  this.center = {
    x: Math.floor(width / 2) + this.col,
    y: Math.floor(height / 2) + this.row
  }
  console.log('width', width, 'height', height, 'center', this.center);
}
Tetrinimo.prototype.raise = function() {
  this.row--;
  for(var block in this.blocks) {
    this.blocks[block].y--;
  }
  this.center.y--;
};
Tetrinimo.prototype.drop = function() {
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
Tetrinimo.prototype.slide = function(direction) {
  this.blocks.forEach(function(block) {
    block.x += directToInt[direction];
  });
  this.center.x += directToInt[direction];
};
Tetrinimo.prototype.rotate = function(direction) {
  var modX, modY;
  console.log('this in rotate', this, 'center', this.center);
  var center = this.center;

  this.blocks.forEach(function(block) {
    console.log('block', block, 'center', center);
    modX = block.y - center.y;
    modY = block.x - center.x;
    if(direction == 'counter') {
      if(modY !== 0) modY *= -1;
    }
    else {
      if(modX !== 0) modX *= -1;
    }

    console.log('modX', modX, 'modY', modY);
    block.x = center.x + modX;
    block.y = center.y + modY;
  });
};
