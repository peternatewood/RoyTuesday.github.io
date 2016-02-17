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

  window.lineBlock = new Tetrinimo({element: 1, shape: TETRINIMO_SHAPES.line});
  window.gameBoard = new TetrisBoard({tetrinimo: lineBlock});
  window.gameView = new BrowserView({gameBoard: gameBoard});
  
  gameBoard.blit({tetrinimo: lineBlock});
  gameView.animate(gameBoard.board);
  gameBoard.cycleDropBlock();
});
