var Tetrinimo = function(args) {
  this.element = args.element;
  var shape = args.shape;

  this.blocks = shape.map(function(block) {
    return {x: new Number(block.x), y: new Number(block.y)};
  });

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
Tetrinimo.prototype.rotate = function(direction) {
  var modX, modY;
  var center = this.blocks[0];

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
