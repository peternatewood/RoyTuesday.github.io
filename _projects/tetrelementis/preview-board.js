var CONST = require("./constants.js");

var PreviewBoard = function() {
  this.board = CONST.generateEmptyBoard();
  this.tetromino = null;
}
PreviewBoard.prototype.blit = function() {
  this.board = CONST.generateEmptyBoard();

  var blockX, blockY;
  for(var block in this.tetromino.blocks) {
    blockX = this.tetromino.blocks[block].x - 4;
    blockY = this.tetromino.blocks[block].y;
    this.board[blockY][blockX] = this.tetromino.element;
  }
};

module.exports = PreviewBoard;
