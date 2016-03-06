var PreviewBoard = function() {
  this.board = generateEmptyBoard();
  this.tetromino = null;
}
PreviewBoard.prototype.blit = function() {
  this.board = generateEmptyBoard();

  var blockX, blockY;
  for(var block in this.tetromino.blocks) {
    blockX = this.tetromino.blocks[block].x - 4;
    blockY = this.tetromino.blocks[block].y;
    this.board[blockY][blockX] = this.tetromino.element;
  }
};

var generateEmptyBoard = function() {
  emptyBoard = new Array;
  for(var y = 0; y < 4; y++) {
    var row = new Array;
    for(var x = 0; x < 4; x++) {
      row.push(0);
    }
    emptyBoard.push(row);
  }
  return emptyBoard;
}
