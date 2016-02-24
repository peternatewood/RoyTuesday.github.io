var PreviewBoard = function() {
  this.board = generateEmptyBoard();
  this.tetrinimo;
}
PreviewBoard.prototype.blit = function() {
  this.board = generateEmptyBoard();

  var blockX, blockY;
  for(var block in this.tetrinimo.blocks) {
    blockX = this.tetrinimo.blocks[block].x - 4;
    blockY = this.tetrinimo.blocks[block].y;
    this.board[blockY][blockX] = this.tetrinimo.element;
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
