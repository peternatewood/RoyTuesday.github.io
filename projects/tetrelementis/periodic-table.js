var PeriodicTable = function() {
  this.board = new Array;

  this.elements = new Object;
  for(var row = 0; row < 9; row++) {
    var tableRow = new Array;
    for(var col = 0; col < 18; col++) {
      if(PERIODIC_TABLE[row][col] != 0) {
        this.elements[PERIODIC_TABLE[row][col]] = {
          x: col,
          y: row,
          show: false
        }
      }
      tableRow.push(0);
    }
    this.board.push(tableRow);
  }
}
PeriodicTable.prototype.showElement = function(atomicNum) {
  this.elements[atomicNum].show = true;
  this.board[this.elements[atomicNum].y][this.elements[atomicNum].x] = atomicNum;
}
